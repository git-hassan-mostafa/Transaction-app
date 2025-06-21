import ProductsDataAccess from "@/DAL/ProductsDataAccess";
import ProviderDataAccess from "@/DAL/ProviderDataAccess";
import Mapper from "@/Global/Helpers/MapService";
import i18n from "@/Global/I18n/I18n";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import { IResultType } from "@/Global/Types/IResultType";
import Product from "@/Models/Product";
import IProduct from "@/ViewModels/Products/IProduct";
import IProvider from "@/ViewModels/Providers/IProvider";

export default class ProductManager {
  constructor(
    private productDataAccess: ProductsDataAccess,
    private providerDataAccess: ProviderDataAccess,
    private mapper: Mapper
  ) {}

  async getAllProducts(): Promise<IProduct[]> {
    const productsDB = await this.productDataAccess.getAllProducts();
    if (!productsDB) return [];
    const products = this.mapper.mapToIProductAll(productsDB);
    return products;
  }

  async getProduct(id: number): Promise<IProduct | null> {
    const productDB = await this.productDataAccess.getProduct(id);
    if (!productDB) return null;
    const product = this.mapper.mapToIProduct(productDB);
    return product;
  }

  async addProduct(product: IProduct): Promise<IResultType<number>> {
    const newProduct: Product = this.mapper.mapToProduct(product);
    const result = await this.productDataAccess.addProduct(newProduct);
    if (!result || !result.lastInsertRowId)
      return {
        success: false,
        data: -1,
        message: i18n.t("error-adding-product"),
      };
    return {
      success: true,
      data: result.lastInsertRowId,
      message: i18n.t("product-added-successfully"),
    };
  }

  async updateProduct(product: IProduct): Promise<IResultType<number>> {
    const updatedProduct: Product = this.mapper.mapToProduct(product);
    const result = await this.productDataAccess.updateProduct(updatedProduct);
    if (!result || !result?.changes)
      return {
        success: false,
        data: 0,
        message: i18n.t("error-updating-product"),
      };
    return {
      success: true,
      data: result.changes,
      message: i18n.t("product-updated-successfully"),
    };
  }

  async deleteProduct(id: number): Promise<IResultType<number>> {
    const isProductUsed = await this.isProductUsed(id);
    if (isProductUsed) {
      return {
        success: false,
        data: 0,
        message: i18n.t("product-is-in-used-it-cannot-be-deleted"),
      };
    }
    const result = await this.productDataAccess.deleteProduct(id);
    if (!result || !result.changes)
      return {
        success: false,
        data: 0,
        message: i18n.t("error-deleting-product"),
      };
    return {
      success: true,
      data: result.changes,
      message: i18n.t("product-deleted-successfully"),
    };
  }

  async isProductUsed(id: number): Promise<boolean> {
    const isUsed = await this.productDataAccess.isProductUsed(id);
    return isUsed;
  }

  getDropDownProducts(products: IProduct[]): IDropDownItem[] {
    return products.map((i) => ({ value: i.productId, label: i.productName }));
  }

  async getAllProviders(): Promise<IProvider[]> {
    const providersDB = await this.providerDataAccess.getAllProviders();
    if (!providersDB) return [];
    const mappedProviders = this.mapper.mapToIProviderAll(providersDB);
    return mappedProviders;
  }
}

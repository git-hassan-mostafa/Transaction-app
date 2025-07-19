import ProductsDataAccess from "@/DataBase/DAL/ProductsDataAccess";
import ProviderDataAccess from "@/DataBase/DAL/ProviderDataAccess";
import Mapper from "@/Shared/Helpers/Mapper";
import i18n from "@/Shared/I18n/I18n";
import IDropDownItem from "@/Shared/Types/IDropDownItem";
import { IResultType } from "@/Shared/Types/IResultType";
import IProvider from "@/Models/Providers/IProvider";
import IProduct from "@/Models/Products/IProduct";
import { Product } from "@/DataBase/Supabase/Models/Product";

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

  async addProduct(product: IProduct): Promise<IResultType<IProduct>> {
    const newProduct: Product = this.mapper.mapToProduct(product);
    const result = await this.productDataAccess.addProduct(newProduct);
    if (!result)
      return {
        success: false,
        data: {} as IProduct,
        message: i18n.t("error-adding-product"),
      };
    return {
      success: true,
      data: this.mapper.mapToIProduct(result),
      message: i18n.t("product-added-successfully"),
    };
  }

  async updateProduct(product: IProduct): Promise<IResultType<IProduct>> {
    const updatedProduct: Product = this.mapper.mapToProduct(product);
    const result = await this.productDataAccess.updateProduct(updatedProduct);
    if (!result)
      return {
        success: false,
        data: {} as IProduct,
        message: i18n.t("error-updating-product"),
      };
    return {
      success: true,
      data: this.mapper.mapToIProduct(result),
      message: i18n.t("product-updated-successfully"),
    };
  }

  async deleteProduct(id: number): Promise<IResultType<boolean>> {
    const isProductUsed = await this.isProductUsed(id);
    if (isProductUsed) {
      return {
        success: false,
        data: false,
        message: i18n.t("product-is-in-used-it-cannot-be-deleted"),
      };
    }
    const result = await this.productDataAccess.deleteProduct(id);
    if (!result)
      return {
        success: false,
        data: result,
        message: i18n.t("error-deleting-product"),
      };
    return {
      success: true,
      data: result,
      message: i18n.t("product-deleted-successfully"),
    };
  }

  async isProductUsed(id: number): Promise<boolean> {
    const isUsed = await this.productDataAccess.isProductUsed(id);
    return isUsed;
  }

  getDropDownProducts(products: IProduct[]): IDropDownItem[] {
    return products.map((i) => ({ value: i.Id, label: i.Name }));
  }

  async getAllProviders(): Promise<IProvider[]> {
    const providersDB = await this.providerDataAccess.getAllProviders();
    if (!providersDB) return [];
    return this.mapper.mapToIProviderAll(providersDB);
  }
}

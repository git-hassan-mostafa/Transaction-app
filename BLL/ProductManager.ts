import ItemsDataAccess from "@/DAL/ItemsDataAccess";
import ProviderDataAccess from "@/DAL/ProviderDataAccess";
import Mapper from "@/Global/Helpers/MapService";
import i18n from "@/Global/I18n/I18n";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import { IResultType } from "@/Global/Types/IResultType";
import Item from "@/Models/Item";
import IProduct from "@/ViewModels/Products/IProduct";
import IProvider from "@/ViewModels/Providers/IProvider";

export default class ProductManager {
  constructor(
    private productDataAccess: ItemsDataAccess,
    private providerDataAccess: ProviderDataAccess,
    private mapper: Mapper
  ) {}

  async getAllProducts(): Promise<IProduct[]> {
    const productsDB = await this.productDataAccess.getAllItems();
    if (!productsDB) return [];
    const products = this.mapper.mapToIProductAll(productsDB);
    return products;
  }

  async getProduct(id: number): Promise<IProduct | null> {
    const itemDB = await this.productDataAccess.getItem(id);
    if (!itemDB) return null;
    const item = this.mapper.mapToIProduct(itemDB);
    return item;
  }

  async addProduct(product: IProduct): Promise<IResultType<number>> {
    const newProduct: Item = this.mapper.mapToProduct(product);
    const result = await this.productDataAccess.addItem(newProduct);
    if (!result || !result.changes)
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
    const updatedItem: Item = this.mapper.mapToProduct(product);
    const result = await this.productDataAccess.updateItem(updatedItem);
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
    const result = await this.productDataAccess.deleteItem(id);
    if (!result || !result.changes)
      return {
        success: false,
        data: 0,
        message: i18n.t("error-deleting-product"),
      };
    return {
      success: true,
      data: result.changes,
      message: i18n.t("error-deleting-product"),
    };
  }

  getDropDownItems(products: IProduct[]): IDropDownItem[] {
    return products.map((i) => ({ value: i.productId, label: i.productName }));
  }

  async getAllProviders(): Promise<IProvider[]> {
    const providersDB = await this.providerDataAccess.getAllProviders();
    if (!providersDB) return [];
    const mappedProviders = this.mapper.mapToIProviderAll(providersDB);
    return mappedProviders;
  }
}

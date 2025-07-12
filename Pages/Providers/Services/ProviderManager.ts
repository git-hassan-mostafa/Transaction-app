import ProviderDataAccess from "@/DataBase/DAL/ProviderDataAccess";
import Mapper from "@/Shared/Helpers/Mapper";
import i18n from "@/Shared/I18n/I18n";
import { IResultType } from "@/Shared/Types/IResultType";
import IProvider from "@/Models/Providers/IProvider";

export default class ProviderManager {
  constructor(
    private providerDataAccess: ProviderDataAccess,
    private mapper: Mapper
  ) {}

  async getAllProviders(): Promise<IProvider[]> {
    const providersDB = await this.providerDataAccess.getAllProviders();
    if (!providersDB) return [];
    return this.mapper.mapToIProviderAll(providersDB);
  }

  async getProvider(id: number): Promise<IProvider | null> {
    const providerDB = await this.providerDataAccess.getProvider(id);
    if (!providerDB) return null;
    return this.mapper.mapToIProvider(providerDB);
  }

  async addProvider(provider: IProvider): Promise<IResultType<IProvider>> {
    const providerDB = this.mapper.mapToProvider(provider);
    const result = await this.providerDataAccess.addProvider(providerDB);
    provider.BorrowedPrice = 0;
    provider.PayedPrice = 0;
    if (!result)
      return {
        success: false,
        message: i18n.t("error-adding-provider"),
        data: {} as IProvider,
      };
    provider.Id = result?.id;
    return {
      success: true,
      message: i18n.t("provider-added-successfully"),
      data: this.mapper.mapToIProvider(result),
    };
  }

  async updateProvider(provider: IProvider): Promise<IResultType<IProvider>> {
    const providerDB = this.mapper.mapToProvider(provider);
    const result = await this.providerDataAccess.updateProvider(providerDB);
    if (!result)
      return {
        success: false,
        message: i18n.t("error-updating-provider"),
        data: {} as IProvider,
      };
    return {
      success: true,
      message: i18n.t("provider-updated-successfully"),
      data: this.mapper.mapToIProvider(result),
    };
  }

  async deleteProvider(id: number): Promise<IResultType<boolean>> {
    const result = await this.providerDataAccess.deleteProvider(id);
    if (!result)
      return {
        success: false,
        message: i18n.t("error-deleting-provider"),
        data: result,
      };
    return {
      success: true,
      message: i18n.t("provider-deleted-successfully"),
      data: result,
    };
  }
}

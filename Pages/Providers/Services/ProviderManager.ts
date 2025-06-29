import ProviderDataAccess from "@/DataBase/DAL/ProviderDataAccess";
import Mapper from "@/Shared/Helpers/MapService";
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
    const providers = this.mapper.mapToIProviderAll(providersDB);
    return providers;
  }

  async getProvider(id: number): Promise<IProvider | null> {
    const providerDB = await this.providerDataAccess.getProvider(id);
    if (!providerDB) return null;
    const provider = this.mapper.mapToIProvider(providerDB);
    return provider;
  }

  async addProvider(provider: IProvider): Promise<IResultType<number>> {
    const newProvider = this.mapper.mapToProvider(provider);
    const result = await this.providerDataAccess.addProvider(newProvider);
    provider.providerBorrowedPrice = 0;
    provider.providerPayedPrice = 0;
    if (!result || !result.lastInsertRowId)
      return {
        success: false,
        message: i18n.t("error-adding-provider"),
        data: -1,
      };
    provider.providerId = result?.lastInsertRowId;
    return {
      success: true,
      message: i18n.t("provider-added-successfully"),
      data: result.lastInsertRowId,
    };
  }

  async updateProvider(provider: IProvider): Promise<IResultType<number>> {
    const updateProvider = this.mapper.mapToProvider(provider);
    const result = await this.providerDataAccess.updateProvider(updateProvider);
    if (!result || !result.changes)
      return {
        success: false,
        message: i18n.t("error-updating-provider"),
        data: 0,
      };
    return {
      success: true,
      message: i18n.t("provider-updated-successfully"),
      data: result.changes,
    };
  }

  async deleteProvider(id: number): Promise<IResultType<number>> {
    const result = await this.providerDataAccess.deleteProvider(id);
    if (!result || !result.changes)
      return {
        success: false,
        message: i18n.t("error-deleting-provider"),
        data: 0,
      };
    return {
      success: true,
      message: i18n.t("provider-deleted-successfully"),
      data: result.changes,
    };
  }
}

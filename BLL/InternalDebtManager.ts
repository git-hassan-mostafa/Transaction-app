import InternalDebtsItemsDataAccess from "@/DAL/InternalDebtsItemsDataAccess";
import InternalDebtsDataAccess from "@/DAL/InternalDebtsDataAccess";
import Mapper from "@/Global/Helpers/MapService";
import ICustomer from "@/ViewModels/Customers/ICustomer";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import IInnerDebtItem_IInnerDebt_IItem from "@/ViewModels/RelationModels/IInnerDebtItem_IInnerDebt_IItem";
import IInnerDebt from "@/ViewModels/InnerDebts/IInerDebts";
import { IResultType } from "@/Global/Types/IResultType";
import i18n from "@/Global/I18n/I18n";
import InnerDebtItem from "@/Models/InnerDebtItem";
import InnerDebtItem_InnerDebt_Item from "@/Models/RelationModels/InnerDebtItem_InnerDebt_Item";
import { ICustomer_IInnerDebt } from "@/ViewModels/RelationModels/ICustomer_IInnerDebt";
import CustomerDataAccess from "@/DAL/CustomersDataAccess";
import InnerDebt from "@/Models/InnerDebt";

export default class InternalDebtManager {
  constructor(
    private internalDebtsDataAccess: InternalDebtsDataAccess,
    private internalDebtsItemsDataAccess: InternalDebtsItemsDataAccess,
    private customerDataAccess: CustomerDataAccess,
    private mapper: Mapper
  ) {
    console.log("internal debt manager created");
  }

  async getAllInternalDebts(): Promise<ICustomer_IInnerDebt[]> {
    const innerDebtsDB = await this.internalDebtsDataAccess.getAllInnerDebts();
    if (!innerDebtsDB) return [];
    const innerDebts = this.mapper.mapToICustomer_IInnerDebtAll(innerDebtsDB);
    return innerDebts || [];
  }

  async getInternalDebt(id: number): Promise<IInnerDebt> {
    const innerDebtDB = await this.internalDebtsDataAccess.getInnerDebt(id);
    if (!innerDebtDB) return {} as IInnerDebt;
    const internalDebt = this.mapper.mapToIInnerDebt(innerDebtDB);
    return internalDebt;
  }

  async getAllInternalDebtsItems(): Promise<IInnerDebtItem_IInnerDebt_IItem[]> {
    const innerDebtsItemsDB =
      await this.internalDebtsItemsDataAccess.getAllInnerDebtItems();
    if (!innerDebtsItemsDB) return [];
    const items = (innerDebtsItemsDB as InnerDebtItem_InnerDebt_Item[]).map(
      (item) => {
        var i = this.mapper.mapTo_IInnerDebtItem_IInnerDebt_IItem(item);
        i.innerDebtItemTotalPrice =
          i.innerDebtItemQuantity * (Number(i?.productPrice) || 0);
        return i;
      }
    );
    return items;
  }

  async getInternalDebtsItems(
    innerDebtId: number
  ): Promise<IInnerDebtItem_IInnerDebt_IItem[]> {
    const innerDebtsItemsDB =
      await this.internalDebtsItemsDataAccess.getInnerDebtItems(innerDebtId);
    const items = (innerDebtsItemsDB as InnerDebtItem_InnerDebt_Item[]).map(
      (item) => {
        var i = this.mapper.mapTo_IInnerDebtItem_IInnerDebt_IItem(item);
        i.innerDebtItemTotalPrice =
          i.innerDebtItemQuantity * (Number(i?.productPrice) || 0);
        return i;
      }
    );
    return items;
  }

  getTotalPricesSum(innerDebtsItems: IInnerDebtItem_IInnerDebt_IItem[]) {
    return innerDebtsItems.reduce((sum, item) => {
      return sum + item.innerDebtItemTotalPrice;
    }, 0);
  }

  getPricePaidSum() {
    return 0;
  }

  async addInternalDebt(
    innerDebt: IInnerDebt,
    internalDebtsItems: IInnerDebtItem_IInnerDebt_IItem[]
  ): Promise<IResultType<ICustomer_IInnerDebt>> {
    const newInnerDebt = this.mapper.mapToInnerDebt(innerDebt);

    //check if inner debt already exists
    if (!innerDebt.innerDebtId) {
      const result = await this.internalDebtsDataAccess.addInnerDebt(
        newInnerDebt
      );
      if (!result || !result.lastInsertRowId)
        return {
          success: false,
          message: i18n.t("failed-to-add-internal-debt"),
          data: {} as ICustomer_IInnerDebt,
        };
      innerDebt.innerDebtId = result.lastInsertRowId;
      innerDebt.innerDebtDate = new Date().toISOString();
      const internalDebtsItemsDB: InnerDebtItem[] = internalDebtsItems.map(
        (item): InnerDebtItem => {
          return {
            InnerDebtItemQuantity: item.innerDebtItemQuantity,
            InnerDebtItem_ItemId: item.innerDebtItem_ItemId,
            InnerDebtItem_InnerDebtId: innerDebt.innerDebtId,
          };
        }
      );
      const itemsResult =
        await this.internalDebtsItemsDataAccess.addInnerDebtItems(
          internalDebtsItemsDB
        );
      if (!itemsResult) {
        await this.internalDebtsDataAccess.deleteInnerDebt(
          innerDebt.innerDebtId
        );
        return {
          success: false,
          message: i18n.t("failed-to-add-inner-debt-products"),
          data: {} as ICustomer_IInnerDebt,
        };
      }
      const customerDB = await this.customerDataAccess.getCustomer(
        innerDebt.innerDebt_CustomerId
      );
      if (!customerDB)
        return {
          success: false,
          data: {} as ICustomer_IInnerDebt,
          message: i18n.t("customer-not-found"),
        };
      const customer = this.mapper.mapToICustomer(customerDB);
      return {
        success: true,
        message: i18n.t("internal-debt-added-successfully"),
        data: {
          ...innerDebt,
          ...customer,
        },
      };
    }
    return { success: false, message: "", data: {} as ICustomer_IInnerDebt };
  }

  async addInternalDebtItem(
    newInnerDebtsItem: IInnerDebtItem_IInnerDebt_IItem
  ): Promise<IResultType<number>> {
    const innerDebtItemToAdd: Partial<InnerDebtItem> = {
      InnerDebtItemQuantity: newInnerDebtsItem.innerDebtItemQuantity,
      InnerDebtItem_InnerDebtId: newInnerDebtsItem.innerDebtItem_InnerDebtId,
      InnerDebtItem_ItemId: newInnerDebtsItem.innerDebtItem_ItemId,
    };
    const result = await this.internalDebtsItemsDataAccess.addInnerDebtItem(
      innerDebtItemToAdd
    );
    if (result && result.lastInsertRowId) {
      return {
        success: true,
        data: result.lastInsertRowId,
        message: "",
      };
    }
    return {
      success: false,
      data: -1,
      message: i18n.t("failed-adding-products"),
    };
  }

  async updateInternalDebt(
    internalDebt: IInnerDebt,
    internalDebtsItems: IInnerDebtItem_IInnerDebt_IItem[]
  ): Promise<IResultType<ICustomer_IInnerDebt>> {
    const internalDebtsItemsToAdd: InnerDebtItem[] = internalDebtsItems
      .filter((item) => item.isNew)
      .map((item): InnerDebtItem => {
        return {
          InnerDebtItemQuantity: item.innerDebtItemQuantity,
          InnerDebtItem_ItemId: item.innerDebtItem_ItemId,
          InnerDebtItem_InnerDebtId: internalDebt.innerDebtId,
        };
      });
    const existingInternalDebtItems = await this.getInternalDebtsItems(
      internalDebt.innerDebtId
    );
    const internalDebtsItemsToDelete = existingInternalDebtItems.filter(
      (item) =>
        !internalDebtsItems.some(
          (i) => i.innerDebtItemId === item.innerDebtItemId
        )
    );
    const IdsToDelete = internalDebtsItemsToDelete.map(
      (i) => i.innerDebtItemId
    );
    if (IdsToDelete.length !== 0) {
      const deleteResult = await this.deleteInternalDebtItems(IdsToDelete);
      if (!deleteResult.success) {
        return {
          success: false,
          data: {} as ICustomer_IInnerDebt,
          message: deleteResult.message,
        };
      }
    }
    if (internalDebtsItemsToAdd.length !== 0) {
      const itemsResult =
        await this.internalDebtsItemsDataAccess.addInnerDebtItems(
          internalDebtsItemsToAdd
        );
      if (!itemsResult || !itemsResult.lastInsertRowId) {
        return {
          success: false,
          data: {} as ICustomer_IInnerDebt,
          message: i18n.t("failed-adding-products"),
        };
      }
    }
    const internalDebtDB: InnerDebt = this.mapper.mapToInnerDebt(internalDebt);
    const result = await this.internalDebtsDataAccess.updateInnerDebt(
      internalDebtDB
    );
    if (!result || !result.changes) {
      return {
        success: false,
        data: {} as ICustomer_IInnerDebt,
        message: i18n.t("failed-updating-internal-debt"),
      };
    }
    const customerDB = await this.customerDataAccess.getCustomer(
      internalDebt.innerDebt_CustomerId
    );
    if (!customerDB)
      return {
        success: false,
        data: {} as ICustomer_IInnerDebt,
        message: i18n.t("customer-not-found"),
      };
    const customer = this.mapper.mapToICustomer(customerDB);
    const customerInnerDebt: ICustomer_IInnerDebt = {
      ...internalDebt,
      ...customer,
    };
    return {
      success: true,
      data: customerInnerDebt,
      message: i18n.t("internal-debt-updated-successfully"),
    };
  }

  async updateInnerDebtCustomer(
    internalDebt: IInnerDebt,
    customerId: number
  ): Promise<IResultType<ICustomer_IInnerDebt>> {
    const result = await this.internalDebtsDataAccess.updateInnerDebtCustomer(
      internalDebt.innerDebtId,
      customerId
    );
    if (!result || !result.changes)
      return { success: false, data: {} as ICustomer_IInnerDebt, message: "" };
    const customerDB = await this.customerDataAccess.getCustomer(customerId);
    if (!customerDB)
      return { success: false, data: {} as ICustomer_IInnerDebt, message: "" };
    const customer = this.mapper.mapToICustomer(customerDB);
    const customerInnerDebt: ICustomer_IInnerDebt = {
      ...internalDebt,
      ...customer,
    };
    return { success: true, data: customerInnerDebt, message: "" };
  }

  async deleteInternalDebt(id: number): Promise<IResultType<number>> {
    const result = await this.internalDebtsDataAccess.deleteInnerDebt(id);
    if (!result || !result?.changes)
      return {
        success: false,
        data: 0,
        message: i18n.t("error-deleting-internal-debt"),
      };
    return {
      success: true,
      data: 0,
      message: i18n.t("internal-debt-deleted-successfully"),
    };
  }

  async deleteInternalDebtItems(ids: number[]): Promise<IResultType<number>> {
    const result = await this.internalDebtsItemsDataAccess.deleteInnerDebtItems(
      ids
    );
    if (!result?.changes) {
      return {
        success: false,
        data: 0,
        message: i18n.t("failed-deleting-products"),
      };
    }
    return {
      success: true,
      data: 0,
      message: "",
    };
  }

  dropDownCutomers(customers: ICustomer[]) {
    const dropDownCustomers = [
      { label: "", value: undefined },
      ...(customers?.map((c) => {
        return { label: c.customerName, value: c.customerId };
      }) as IDropDownItem[]),
    ];
    return dropDownCustomers;
  }
}

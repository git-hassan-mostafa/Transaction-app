import InternalDebtsProductsDataAccess from "@/DataBase/DAL/InternalDebtsProductsDataAccess";
import InternalDebtsDataAccess from "@/DataBase/DAL/InternalDebtsDataAccess";
import Mapper from "@/Shared/Helpers/Mapper";
import IDropDownItem from "@/Shared/Types/IDropDownItem";
import { IResultType } from "@/Shared/Types/IResultType";
import i18n from "@/Shared/I18n/I18n";
import IInternalDebt from "@/Models/InternalDebts/IInternalDebts";
import ICustomer from "@/Models/Customers/ICustomer";
import { InternalDebt } from "@/DataBase/Supabase/Models/InternalDebt";
import IInternalDebtProduct from "@/Models/InternalDebts/IInternalDebtProduct";
import { InternalDebtProduct } from "@/DataBase/Supabase/Models/InternalDebtProduct";

export default class InternalDebtManager {
  constructor(
    private internalDebtsDataAccess: InternalDebtsDataAccess,
    private internalDebtsProductsDataAccess: InternalDebtsProductsDataAccess,
    private mapper: Mapper
  ) {}

  async getAllInternalDebts(): Promise<IInternalDebt[]> {
    const internalDebtsDB =
      await this.internalDebtsDataAccess.getAllInternalDebts();
    return this.mapper.mapToIInternalDebtAll(internalDebtsDB);
  }

  async getInternalDebt(id: number): Promise<IInternalDebt> {
    const internalDebtDB = await this.internalDebtsDataAccess.getInternalDebt(
      id
    );
    if (!internalDebtDB) return {} as IInternalDebt;
    const internalDebt = this.mapper.mapToIInternalDebt(internalDebtDB);
    return internalDebt;
  }

  getInternalDebtTotalPrice(internalDebt: IInternalDebt): number {
    return (internalDebt.InternalDebtProducts || []).reduce(
      (acc, item) => acc + (item.TotalPrice || 0),
      0
    );
  }

  async addInternalDebt(
    InternalDebt: IInternalDebt
  ): Promise<IResultType<IInternalDebt>> {
    const newInternalDebtDB = this.mapper.mapToInternalDebt(InternalDebt);

    const debtResult = await this.internalDebtsDataAccess.addInternalDebt(
      newInternalDebtDB
    );
    if (!debtResult)
      return {
        success: false,
        message: i18n.t("failed-to-add-internal-debt"),
        data: {} as IInternalDebt,
      };
    const newInternalDebtProductsDB = (
      InternalDebt.InternalDebtProducts || []
    ).map((p): Partial<InternalDebtProduct> => {
      return {
        quantity: p.Quantity,
        internaldebtid: debtResult.id,
        productid: p.ProductId,
      };
    });

    const productsResult =
      await this.internalDebtsProductsDataAccess.addInternalDebtProducts(
        newInternalDebtProductsDB
      );
    if (!productsResult) {
      await this.internalDebtsDataAccess.deleteInternalDebt(debtResult.id);
      return {
        success: false,
        message: i18n.t("failed-to-add-internal-debt"),
        data: {} as IInternalDebt,
      };
    }
    debtResult.internaldebtproducts = productsResult;
    return {
      success: true,
      message: i18n.t("internal-debt-added-successfully"),
      data: this.mapper.mapToIInternalDebt(debtResult),
    };
  }

  async updateInternalDebt(
    internalDebt: IInternalDebt
  ): Promise<IResultType<IInternalDebt>> {
    const internalDebtsProductsToAdd =
      internalDebt.InternalDebtProducts?.filter((item) => item.IsNew).map(
        (p): Partial<InternalDebtProduct> => {
          return {
            quantity: p.Quantity,
            internaldebtid: internalDebt.Id,
            productid: p.ProductId,
          };
        }
      ) || [];
    const existingInternalDebtProducts =
      await this.internalDebtsProductsDataAccess.getInternalDebtProducts(
        internalDebt.Id
      );

    const internalDebtsProductsToDelete = (
      existingInternalDebtProducts || []
    ).filter(
      (item) =>
        !(internalDebt.InternalDebtProducts || []).some((i) => i.Id === item.id)
    );
    const IdsToDelete = internalDebtsProductsToDelete.map((i) => i.id);
    if (IdsToDelete.length !== 0) {
      const deleteResult =
        await this.internalDebtsProductsDataAccess.deleteInternalDebtProducts(
          IdsToDelete
        );
      if (!deleteResult) {
        return {
          success: false,
          data: {} as IInternalDebt,
          message: i18n.t("failed-adding-products"),
        };
      }
    }
    if (internalDebtsProductsToAdd.length !== 0) {
      const productsResult =
        await this.internalDebtsProductsDataAccess.addInternalDebtProducts(
          internalDebtsProductsToAdd
        );
      if (!productsResult) {
        return {
          success: false,
          data: {} as IInternalDebt,
          message: i18n.t("failed-adding-products"),
        };
      }
    }
    const internalDebtDB: InternalDebt =
      this.mapper.mapToInternalDebt(internalDebt);
    const result = await this.internalDebtsDataAccess.updateInternalDebt(
      internalDebtDB
    );
    if (!result) {
      return {
        success: false,
        data: {} as IInternalDebt,
        message: i18n.t("failed-updating-internal-debt"),
      };
    }
    return {
      success: true,
      data: this.mapper.mapToIInternalDebt(result),
      message: i18n.t("internal-debt-updated-successfully"),
    };
  }

  async deleteInternalDebt(id: number): Promise<IResultType<boolean>> {
    const result = await this.internalDebtsDataAccess.deleteInternalDebt(id);
    if (!result)
      return {
        success: false,
        data: false,
        message: i18n.t("error-deleting-internal-debt"),
      };
    return {
      success: true,
      data: true,
      message: i18n.t("internal-debt-deleted-successfully"),
    };
  }

  dropDownCutomers(customers: ICustomer[]) {
    const dropDownCustomers = [
      ...(customers?.map((c) => {
        return { label: c.Name, value: c.Id };
      }) as IDropDownItem[]),
    ];
    return dropDownCustomers;
  }
}

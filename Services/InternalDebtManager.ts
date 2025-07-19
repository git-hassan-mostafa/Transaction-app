import InternalDebtsProductsDataAccess from "@/DataBase/DAL/InternalDebtsProductsDataAccess";
import InternalDebtsDataAccess from "@/DataBase/DAL/InternalDebtsDataAccess";
import Mapper from "@/Shared/Helpers/Mapper";
import IDropDownItem from "@/Shared/Types/IDropDownItem";
import { IResultType } from "@/Shared/Types/IResultType";
import i18n from "@/Shared/I18n/I18n";
import IInternalDebt from "@/Models/InternalDebts/IInternalDebts";
import ICustomer from "@/Models/Customers/ICustomer";
import { InternalDebt } from "@/DataBase/Supabase/Models/InternalDebt";
import { InternalDebtProduct } from "@/DataBase/Supabase/Models/InternalDebtProduct";
import { InternalDebtPayment } from "@/DataBase/Supabase/Models/InternalDebtPayemnt";
import InternalDebtsPaymentsDataAccess from "@/DataBase/DAL/InternalDebtsPaymentsDataAccess";

export default class InternalDebtManager {
  constructor(
    private internalDebtsDataAccess: InternalDebtsDataAccess,
    private internalDebtsProductsDataAccess: InternalDebtsProductsDataAccess,
    private internalDebtPaymentsDataAccess: InternalDebtsPaymentsDataAccess,
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

  getInternalDebtPaidPrice(internalDebt: IInternalDebt): number {
    return (internalDebt.InternalDebtPayments || []).reduce(
      (acc, item) => acc + (item.Amount || 0),
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
    const productsResult = await this.insertInternalDebtProducts(
      InternalDebt,
      debtResult.id
    );

    if (!productsResult) {
      await this.internalDebtsDataAccess.deleteInternalDebt(debtResult.id);
      return {
        success: false,
        message: i18n.t("failed-to-add-internal-debt"),
        data: {} as IInternalDebt,
      };
    }

    const paymentsResult = await this.insertInternalDebtPayments(
      InternalDebt,
      debtResult.id
    );

    if (!paymentsResult) {
      await this.internalDebtsDataAccess.deleteInternalDebt(debtResult.id);
      return {
        success: false,
        message: i18n.t("failed-to-add-internal-debt"),
        data: {} as IInternalDebt,
      };
    }
    debtResult.internaldebtproducts = productsResult;
    debtResult.internaldebtpayments = paymentsResult;
    return {
      success: true,
      message: i18n.t("internal-debt-added-successfully"),
      data: this.mapper.mapToIInternalDebt(debtResult),
    };
  }

  async updateInternalDebt(
    internalDebt: IInternalDebt
  ): Promise<IResultType<IInternalDebt>> {
    const productsResult = await this.syncInternalDebtProducts(internalDebt);
    if (!productsResult) {
      return {
        success: false,
        data: {} as IInternalDebt,
        message: i18n.t("failed-adding-products"),
      };
    }
    const paymentsResult = await this.syncInternalDebtPayments(internalDebt);
    if (!paymentsResult) {
      return {
        success: false,
        data: {} as IInternalDebt,
        message: i18n.t("failed-adding-payments"),
      };
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

  private async insertInternalDebtProducts(
    internalDebt: IInternalDebt,
    internalDebtId: number
  ) {
    const newInternalDebtProductsDB = (
      internalDebt.InternalDebtProducts || []
    ).map((p): Partial<InternalDebtProduct> => {
      return {
        quantity: p.Quantity,
        internaldebtid: internalDebtId,
        productid: p.ProductId,
      };
    });

    const productsResult =
      await this.internalDebtsProductsDataAccess.addInternalDebtProducts(
        newInternalDebtProductsDB
      );

    return productsResult;
  }

  private async syncInternalDebtProducts(
    internalDebt: IInternalDebt
  ): Promise<Boolean> {
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
        return false;
      }
    }
    if (internalDebtsProductsToAdd.length !== 0) {
      const productsResult =
        await this.internalDebtsProductsDataAccess.addInternalDebtProducts(
          internalDebtsProductsToAdd
        );
      if (!productsResult) {
        return false;
      }
    }
    return true;
  }

  private async insertInternalDebtPayments(
    internalDebt: IInternalDebt,
    internalDebtId: number
  ) {
    const newInternalDebtPaymentsDB = (
      internalDebt.InternalDebtPayments || []
    ).map((p): Partial<InternalDebtPayment> => {
      return {
        amount: p.Amount,
        internaldebtid: internalDebtId,
      };
    });

    const paymentsResult =
      await this.internalDebtPaymentsDataAccess.addInternalDebtPayments(
        newInternalDebtPaymentsDB
      );

    return paymentsResult;
  }

  private async syncInternalDebtPayments(
    internalDebt: IInternalDebt
  ): Promise<Boolean> {
    const internalDebtsPaymentsToAdd =
      internalDebt.InternalDebtPayments?.filter((item) => item.IsNew).map(
        (p): Partial<InternalDebtPayment> => {
          return {
            amount: p.Amount,
            internaldebtid: internalDebt.Id,
          };
        }
      ) || [];
    const existingInternalDebtPayments =
      await this.internalDebtPaymentsDataAccess.getInternalDebtPayments(
        internalDebt.Id
      );

    const internalDebtsPaymentsToDelete = (
      existingInternalDebtPayments || []
    ).filter(
      (item) =>
        !(internalDebt.InternalDebtPayments || []).some((i) => i.Id === item.id)
    );
    const IdsToDelete = internalDebtsPaymentsToDelete.map((i) => i.id);
    if (IdsToDelete.length !== 0) {
      const deleteResult =
        await this.internalDebtPaymentsDataAccess.deleteInternalDebtPayments(
          IdsToDelete
        );
      if (!deleteResult) {
        return false;
      }
    }
    if (internalDebtsPaymentsToAdd.length !== 0) {
      const productsResult =
        await this.internalDebtPaymentsDataAccess.addInternalDebtPayments(
          internalDebtsPaymentsToAdd
        );
      if (!productsResult) {
        return false;
      }
    }
    return true;
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

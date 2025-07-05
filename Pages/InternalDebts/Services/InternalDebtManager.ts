import InternalDebtsProductsDataAccess from "@/DataBase/DAL/InternalDebtsProductsDataAccess";
import InternalDebtsDataAccess from "@/DataBase/DAL/InternalDebtsDataAccess";
import Mapper from "@/Shared/Helpers/MapService";
import IDropDownItem from "@/Shared/Types/IDropDownItem";
import IInternalDebtProduct_IInternalDebt_IProduct from "@/Models/RelationModels/IInternalDebtProduct_IInternalDebt_IProduct";
import { IResultType } from "@/Shared/Types/IResultType";
import i18n from "@/Shared/I18n/I18n";
import InternalDebtProduct from "@/DataBase/Models/InternalDebtProduct";
import InternalDebtProduct_InternalDebt_Product from "@/DataBase/Models/RelationModels/InternalDebtProduct_InternalDebt_Product";
import { ICustomer_IInnternalDebt } from "@/Models/RelationModels/ICustomer_IInnternalDebt";
import CustomerDataAccess from "@/DataBase/DAL/CustomersDataAccess";
import InternalDebt from "@/DataBase/Models/InternalDebt";
import IInternalDebt from "@/Models/InternalDebts/IInternalDebts";
import ICustomer from "@/Models/Customers/ICustomer";

export default class InternalDebtManager {
  constructor(
    private internalDebtsDataAccess: InternalDebtsDataAccess,
    private internalDebtsProductsDataAccess: InternalDebtsProductsDataAccess,
    private customerDataAccess: CustomerDataAccess,
    private mapper: Mapper
  ) {}

  async getAllInternalDebts(): Promise<ICustomer_IInnternalDebt[]> {
    const internalDebtsDB =
      await this.internalDebtsDataAccess.getAllInternalDebts();
    if (!internalDebtsDB) return [];
    const internalDebts =
      this.mapper.mapToICustomer_IInternalDebtAll(internalDebtsDB);
    return internalDebts || [];
  }

  async getInternalDebt(id: number): Promise<IInternalDebt> {
    const internalDebtDB = await this.internalDebtsDataAccess.getInternalDebt(
      id
    );
    if (!internalDebtDB) return {} as IInternalDebt;
    const internalDebt = this.mapper.mapToIInternalDebt(internalDebtDB);
    return internalDebt;
  }

  async getAllInternalDebtsProducts(): Promise<
    IInternalDebtProduct_IInternalDebt_IProduct[]
  > {
    const internalDebtsProductsDB =
      await this.internalDebtsProductsDataAccess.getAllInternalDebtProducts();
    if (!internalDebtsProductsDB) return [];
    const products = (
      internalDebtsProductsDB as InternalDebtProduct_InternalDebt_Product[]
    ).map((item) => {
      var i =
        this.mapper.mapTo_IInternalDebtProduct_IInternalDebt_IProduct(item);
      i.internalDebtProductTotalPrice =
        i.internalDebtProductQuantity * (Number(i?.productPrice) || 0);
      return i;
    });
    return products;
  }

  async getInternalDebtsProducts(
    internalDebtId: number
  ): Promise<IInternalDebtProduct_IInternalDebt_IProduct[]> {
    const internalDebtsProductsDB =
      await this.internalDebtsProductsDataAccess.getInternalDebtProducts(
        internalDebtId
      );
    const products = (
      internalDebtsProductsDB as InternalDebtProduct_InternalDebt_Product[]
    ).map((item) => {
      var i =
        this.mapper.mapTo_IInternalDebtProduct_IInternalDebt_IProduct(item);
      i.internalDebtProductTotalPrice =
        i.internalDebtProductQuantity * (Number(i?.productPrice) || 0);
      return i;
    });
    return products;
  }

  getTotalPricesSum(
    internalDebtsProducts: IInternalDebtProduct_IInternalDebt_IProduct[]
  ) {
    return internalDebtsProducts.reduce((sum, item) => {
      return sum + item.internalDebtProductTotalPrice;
    }, 0);
  }

  getPricePaidSum() {
    return 0;
  }

  async addInternalDebt(
    InternalDebt: IInternalDebt,
    internalDebtsProducts: IInternalDebtProduct_IInternalDebt_IProduct[]
  ): Promise<IResultType<ICustomer_IInnternalDebt>> {
    const newInternalDebt = this.mapper.mapToInternalDebt(InternalDebt);

    //check if inner debt already exists
    if (!InternalDebt.internalDebtId) {
      const result = await this.internalDebtsDataAccess.addInternalDebt(
        newInternalDebt
      );
      if (!result || !result.lastInsertRowId)
        return {
          success: false,
          message: i18n.t("failed-to-add-internal-debt"),
          data: {} as ICustomer_IInnternalDebt,
        };
      InternalDebt.internalDebtId = result.lastInsertRowId;
      InternalDebt.internalDebtDate = new Date().toISOString();
      const internalDebtsProductsDB: InternalDebtProduct[] =
        internalDebtsProducts.map((item): InternalDebtProduct => {
          return {
            InternalDebtProductQuantity: item.internalDebtProductQuantity,
            InternalDebtProduct_ProductId: item.internalDebtProduct_ProductId,
            InternalDebtProduct_InternalDebtId: InternalDebt.internalDebtId,
          };
        });
      const productsResult =
        await this.internalDebtsProductsDataAccess.addInternalDebtProducts(
          internalDebtsProductsDB
        );
      if (!productsResult) {
        await this.internalDebtsDataAccess.deleteInternalDebt(
          InternalDebt.internalDebtId
        );
        return {
          success: false,
          message: i18n.t("failed-to-add-internal-debt-products"),
          data: {} as ICustomer_IInnternalDebt,
        };
      }
      const customerDB = await this.customerDataAccess.getCustomer(
        InternalDebt.internalDebt_CustomerId
      );
      if (!customerDB)
        return {
          success: false,
          data: {} as ICustomer_IInnternalDebt,
          message: i18n.t("customer-not-found"),
        };
      const customer = this.mapper.mapToICustomer(customerDB);
      return {
        success: true,
        message: i18n.t("internal-debt-added-successfully"),
        data: {
          ...InternalDebt,
          ...customer,
        },
      };
    }
    return {
      success: false,
      message: "",
      data: {} as ICustomer_IInnternalDebt,
    };
  }

  async addInternalDebtProduct(
    newInternalDebtsProduct: IInternalDebtProduct_IInternalDebt_IProduct
  ): Promise<IResultType<number>> {
    const internalDebtProductToAdd: Partial<InternalDebtProduct> = {
      InternalDebtProductQuantity:
        newInternalDebtsProduct.internalDebtProductQuantity,
      InternalDebtProduct_InternalDebtId:
        newInternalDebtsProduct.internalDebtProduct_InternalDebtId,
      InternalDebtProduct_ProductId:
        newInternalDebtsProduct.internalDebtProduct_ProductId,
    };
    const result =
      await this.internalDebtsProductsDataAccess.addInternalDebtProduct(
        internalDebtProductToAdd
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
    internalDebt: IInternalDebt,
    internalDebtsProducts: IInternalDebtProduct_IInternalDebt_IProduct[]
  ): Promise<IResultType<ICustomer_IInnternalDebt>> {
    const internalDebtsProductsToAdd: InternalDebtProduct[] =
      internalDebtsProducts
        .filter((item) => item.isNew)
        .map((item): InternalDebtProduct => {
          return {
            InternalDebtProductQuantity: item.internalDebtProductQuantity,
            InternalDebtProduct_ProductId: item.internalDebtProduct_ProductId,
            InternalDebtProduct_InternalDebtId: internalDebt.internalDebtId,
          };
        });
    const existingInternalDebtProducts = await this.getInternalDebtsProducts(
      internalDebt.internalDebtId
    );
    const internalDebtsProductsToDelete = existingInternalDebtProducts.filter(
      (item) =>
        !internalDebtsProducts.some(
          (i) => i.internalDebtProductId === item.internalDebtProductId
        )
    );
    const IdsToDelete = internalDebtsProductsToDelete.map(
      (i) => i.internalDebtProductId
    );
    if (IdsToDelete.length !== 0) {
      const deleteResult = await this.deleteInternalDebtProducts(IdsToDelete);
      if (!deleteResult.success) {
        return {
          success: false,
          data: {} as ICustomer_IInnternalDebt,
          message: deleteResult.message,
        };
      }
    }
    if (internalDebtsProductsToAdd.length !== 0) {
      const productsResult =
        await this.internalDebtsProductsDataAccess.addInternalDebtProducts(
          internalDebtsProductsToAdd
        );
      if (!productsResult || !productsResult.lastInsertRowId) {
        return {
          success: false,
          data: {} as ICustomer_IInnternalDebt,
          message: i18n.t("failed-adding-products"),
        };
      }
    }
    const internalDebtDB: InternalDebt =
      this.mapper.mapToInternalDebt(internalDebt);
    const result = await this.internalDebtsDataAccess.updateInternalDebt(
      internalDebtDB
    );
    if (!result || !result.changes) {
      return {
        success: false,
        data: {} as ICustomer_IInnternalDebt,
        message: i18n.t("failed-updating-internal-debt"),
      };
    }
    const customerDB = await this.customerDataAccess.getCustomer(
      internalDebt.internalDebt_CustomerId
    );
    if (!customerDB)
      return {
        success: false,
        data: {} as ICustomer_IInnternalDebt,
        message: i18n.t("customer-not-found"),
      };
    const customer = this.mapper.mapToICustomer(customerDB);
    const customerInternalDebt: ICustomer_IInnternalDebt = {
      ...internalDebt,
      ...customer,
    };
    return {
      success: true,
      data: customerInternalDebt,
      message: i18n.t("internal-debt-updated-successfully"),
    };
  }

  // not used ( to remove )
  async updateInternalDebtCustomer(
    internalDebt: IInternalDebt,
    customerId: number
  ): Promise<IResultType<ICustomer_IInnternalDebt>> {
    const result =
      await this.internalDebtsDataAccess.updateInternalDebtCustomer(
        internalDebt.internalDebtId,
        customerId
      );
    if (!result || !result.changes)
      return {
        success: false,
        data: {} as ICustomer_IInnternalDebt,
        message: "",
      };
    const customerDB = await this.customerDataAccess.getCustomer(customerId);
    if (!customerDB)
      return {
        success: false,
        data: {} as ICustomer_IInnternalDebt,
        message: "",
      };
    const customer = this.mapper.mapToICustomer(customerDB);
    const customerInternalDebt: ICustomer_IInnternalDebt = {
      ...internalDebt,
      ...customer,
    };
    return { success: true, data: customerInternalDebt, message: "" };
  }

  async deleteInternalDebt(id: number): Promise<IResultType<number>> {
    const result = await this.internalDebtsDataAccess.deleteInternalDebt(id);
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

  async deleteInternalDebtProducts(
    ids: number[]
  ): Promise<IResultType<number>> {
    const result =
      await this.internalDebtsProductsDataAccess.deleteInternalDebtProducts(
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
      ...(customers?.map((c) => {
        return { label: c.customerName, value: c.customerId };
      }) as IDropDownItem[]),
    ];
    return dropDownCustomers;
  }
}

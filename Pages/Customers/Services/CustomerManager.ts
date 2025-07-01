import CustomerDataAccess from "../../../DataBase/DAL/CustomersDataAccess";
import Mapper from "../../../Shared/Helpers/MapService";
import { ICustomer_IInternalDebt_IInternalDebtProduct_IProduct } from "../../../Models/RelationModels/ICustomer_IInternalDebt_IInternalDebtProduct_IProduct";
import Customer from "../../../DataBase/Models/Customer";
import i18n from "../../../Shared/I18n/I18n";
import { IResultType } from "@/Shared/Types/IResultType";
import ICustomer from "@/Models/Customers/ICustomer";

export default class CustomerManager {
  constructor(
    private customerDataAccess: CustomerDataAccess,
    private mapper: Mapper
  ) { }

  async getAllCustomers(): Promise<ICustomer[]> {
    const customersDB = await this.customerDataAccess.getAllCustomers();
    if (!customersDB) return [];
    const customers = this.mapper.mapToICustomerAll(customersDB);
    return customers;
  }

  async getAllCustomersCalculated(): Promise<ICustomer[]> {
    try {
      // Get all customers with their borrowed data in a single optimized query
      const customersWithBorrowed = await this.customerDataAccess.getAllCustomersWithBorrowed();
      if (!customersWithBorrowed) return [];

      // Group borrowed data by customer ID for O(1) lookup
      const borrowedByCustomerId = new Map<number, ICustomer_IInternalDebt_IInternalDebtProduct_IProduct[]>();

      customersWithBorrowed.forEach((item) => {
        const customerId = item.customerId;
        if (!borrowedByCustomerId.has(customerId)) {
          borrowedByCustomerId.set(customerId, []);
        }
        borrowedByCustomerId.get(customerId)!.push(item);
      });

      // Map customers with their borrowed prices
      const mappedCustomers = this.mapper.mapToICustomerAll(
        customersWithBorrowed.filter((item, index, self) =>
          self.findIndex(c => c.customerId === item.customerId) === index
        )
      );

      mappedCustomers.forEach((customer) => {
        const borrowed = borrowedByCustomerId.get(customer.customerId) || [];
        customer.customerBorrowedPrice = this.getBorrowedPrice(borrowed);
      });

      return mappedCustomers;
    } catch (error) {
      console.error("Error in getAllCustomersCalculated:", error);
      // Fallback to original method if optimized query fails
      return this.getAllCustomersCalculatedFallback();
    }
  }

  // Fallback method using original approach
  private async getAllCustomersCalculatedFallback(): Promise<ICustomer[]> {
    const customersDB = await this.customerDataAccess.getAllCustomers();
    if (!customersDB) return [];
    const borrowedList = await this.getAllCustomersBorrowedList();
    const mappedCustomers = this.mapper.mapToICustomerAll(customersDB);

    // Create a Map for O(1) lookup instead of O(n) filter
    const borrowedMap = new Map<number, ICustomer_IInternalDebt_IInternalDebtProduct_IProduct[]>();
    borrowedList.forEach((item) => {
      const customerId = item.customerId;
      if (!borrowedMap.has(customerId)) {
        borrowedMap.set(customerId, []);
      }
      borrowedMap.get(customerId)!.push(item);
    });

    mappedCustomers.forEach((c) => {
      const borrowed = borrowedMap.get(c.customerId) || [];
      c.customerBorrowedPrice = this.getBorrowedPrice(borrowed);
    });

    return mappedCustomers;
  }

  async getCustomer(id: number): Promise<ICustomer> {
    const customerDB = await this.customerDataAccess.getCustomer(id);
    if (!customerDB) return {} as ICustomer;
    const customer = this.mapper.mapToICustomer(customerDB);
    return customer;
  }

  async getCustomerBorrowList(
    id: number
  ): Promise<ICustomer_IInternalDebt_IInternalDebtProduct_IProduct[]> {
    const borrowListDB = await this.customerDataAccess.getCustomerBorrowList(
      id
    );
    const mappedBorrowList =
      borrowListDB?.map((b) => {
        const result =
          this.mapper.mapTo_IICustomer_IInerDebt_IInternalDebtProduct_IProduct(
            b
          );
        result.internalDebtProductTotalPrice =
          Number(result.productPrice) * result.internalDebtProductQuantity;
        return result;
      }) || [];
    return mappedBorrowList;
  }

  async getAllCustomersBorrowedList(): Promise<
    ICustomer_IInternalDebt_IInternalDebtProduct_IProduct[]
  > {
    const borrowListDB =
      await this.customerDataAccess.getAllCustomersBorrowList();
    const mappedBorrowList =
      borrowListDB?.map((b) => {
        const result =
          this.mapper.mapTo_IICustomer_IInerDebt_IInternalDebtProduct_IProduct(
            b
          );
        result.internalDebtProductTotalPrice =
          Number(result.productPrice) * result.internalDebtProductQuantity;
        return result;
      }) || [];
    return mappedBorrowList;
  }

  getBorrowedPrice(
    borrowedList: ICustomer_IInternalDebt_IInternalDebtProduct_IProduct[]
  ): number {
    const sum = borrowedList.reduce((sum, item) => {
      return sum + item.internalDebtProductTotalPrice;
    }, 0);
    return sum;
  }

  async addCustomer(customer: ICustomer): Promise<IResultType<number>> {
    const newCustomer: Customer = this.mapper.mapToCustomer(customer);
    const result = await this.customerDataAccess.addCustomer(newCustomer);
    if (!result || !result.lastInsertRowId) {
      return {
        success: false,
        data: -1,
        message: i18n.t("failed-to-add-customer"),
      };
    }
    customer.customerId = result?.lastInsertRowId || -1;
    customer.customerBorrowedPrice = 0;
    customer.customerPayedPrice = 0;
    return {
      success: true,
      data: result.lastInsertRowId,
      message: i18n.t("customer-added-successfully"),
    };
  }

  async updateCustomer(customer: ICustomer): Promise<IResultType<number>> {
    const updatedCustomer: Customer = this.mapper.mapToCustomer(customer);
    const result = await this.customerDataAccess.updateCustomer(
      updatedCustomer
    );
    if (!result || !result.changes)
      return {
        success: false,
        data: 0,
        message: i18n.t("error-updating-customer"),
      };
    return {
      success: true,
      data: result.changes,
      message: i18n.t("customer-updated-successfully"),
    };
  }

  async deleteCustomer(id: number): Promise<IResultType<number>> {
    const result = await this.customerDataAccess.deleteCustomer(id);
    if (!result || !result.changes)
      return {
        success: false,
        data: 0,
        message: i18n.t("error-deleting-customer"),
      };
    return {
      success: true,
      data: result.changes,
      message: i18n.t("customer-deleted-successfully"),
    };
  }
}

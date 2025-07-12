import CustomerDataAccess from "../../../DataBase/DAL/CustomersDataAccess";
import Mapper from "../../../Shared/Helpers/Mapper";
import i18n from "../../../Shared/I18n/I18n";
import { IResultType } from "@/Shared/Types/IResultType";
import ICustomer from "@/Models/Customers/ICustomer";
import { Customer } from "@/DataBase/Supabase/Models/Customer";

export default class CustomerManager {
  constructor(
    private customerDataAccess: CustomerDataAccess,
    private mapper: Mapper
  ) {}

  async getAllCustomers(withDebts: boolean = true): Promise<ICustomer[]> {
    try {
      const customersDB = await this.customerDataAccess.getAllCustomers(
        withDebts
      );
      if (!customersDB) return [];
      const customers = this.mapper.mapToICustomerAll(customersDB);
      return customers;
    } catch (error) {
      console.error("Error CustomerManager.getAllCustomers", error);
      return [];
    }
  }

  async getCustomer(id: number): Promise<ICustomer> {
    const customerDB = await this.customerDataAccess.getCustomer(id);
    if (!customerDB) return {} as ICustomer;
    const customer = this.mapper.mapToICustomer(customerDB);
    return customer;
  }

  async getTotalCustomersBorrowedPriceAsync(): Promise<number> {
    const allCustomers = await this.getAllCustomers();
    return allCustomers.reduce((sum, customer) => {
      return sum + customer.BorrowedPrice;
    }, 0);
  }

  async addCustomer(customer: ICustomer): Promise<IResultType<ICustomer>> {
    const newCustomer: Customer = this.mapper.mapToCustomer(customer);
    const result = await this.customerDataAccess.addCustomer(newCustomer);
    if (!result) {
      return {
        success: false,
        data: {} as ICustomer,
        message: i18n.t("failed-to-add-customer"),
      };
    }
    return {
      success: true,
      data: this.mapper.mapToICustomer(result),
      message: i18n.t("customer-added-successfully"),
    };
  }

  async updateCustomer(customer: ICustomer): Promise<IResultType<ICustomer>> {
    const updatedCustomer: Customer = this.mapper.mapToCustomer(customer);
    const result = await this.customerDataAccess.updateCustomer(
      updatedCustomer
    );
    if (!result)
      return {
        success: false,
        data: {} as ICustomer,
        message: i18n.t("error-updating-customer"),
      };
    return {
      success: true,
      data: this.mapper.mapToICustomer(result),
      message: i18n.t("customer-updated-successfully"),
    };
  }

  async deleteCustomer(id: number): Promise<IResultType<boolean>> {
    const result = await this.customerDataAccess.deleteCustomer(id);
    if (!result)
      return {
        success: false,
        data: result,
        message: i18n.t("error-deleting-customer"),
      };
    return {
      success: true,
      data: result,
      message: i18n.t("customer-deleted-successfully"),
    };
  }
}

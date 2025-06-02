import { SQLiteRunResult } from "expo-sqlite";
import CustomerDataAccess from "../DAL/CustomersDataAccess";
import Mapper from "../Global/Helpers/MapService";
import ICustomer from "../ViewModels/Customers/ICustomer";
import { ICustomer_IInerDebt_IInnerDebtItem_IItem } from "../ViewModels/RelationModels/ICustomer_IInerDebt_IInnerDebtItem_IItem";
import Customer from "../Models/Customer";
import { Alert } from "react-native";
import i18n from "../Global/I18n/I18n";
import { IResultType } from "@/Global/Types/IResultType";

export default class CustomerManager {
  constructor(
    private customerDataAccess: CustomerDataAccess,
    private mapper: Mapper
  ) {}

  async getAllCustomers(): Promise<ICustomer[]> {
    const customersDB = await this.customerDataAccess.getAllCustomers();
    if (!customersDB) return [];
    const customers = this.mapper.mapToICustomerAll(customersDB);
    return customers;
  }

  async getAllCustomersCalculated(): Promise<ICustomer[]> {
    const customersDB = await this.customerDataAccess.getAllCustomers();
    if (!customersDB) return [];
    const borrowedList = await this.getCustomersBorrowedList();
    const mappedCustomers = this.mapper.mapToICustomerAll(customersDB);
    mappedCustomers?.forEach((c) => {
      const borrowed = borrowedList.filter(
        (b) => b.customerId === c.customerId
      );
      if (borrowed) {
        c.customerBorrowedPrice = this.getCustomerBorrowedPrice(borrowed);
      } else {
        c.customerBorrowedPrice = 0;
      }
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
  ): Promise<ICustomer_IInerDebt_IInnerDebtItem_IItem[]> {
    const borrowListDB = await this.customerDataAccess.getCustomerBorrowList(
      id
    );
    const mappedBorrowList =
      borrowListDB?.map((b) => {
        const result =
          this.mapper.mapTo_IICustomer_IInerDebt_IInnerDebtItem_IItem(b);
        result.innerDebtItemTotalPrice =
          Number(result.productPrice) * result.innerDebtItemQuantity;
        return result;
      }) || [];
    return mappedBorrowList;
  }

  async getCustomersBorrowedList(): Promise<
    ICustomer_IInerDebt_IInnerDebtItem_IItem[]
  > {
    const borrowListDB = await this.customerDataAccess.getCustomersBorrowList();
    const mappedBorrowList =
      borrowListDB?.map((b) => {
        const result =
          this.mapper.mapTo_IICustomer_IInerDebt_IInnerDebtItem_IItem(b);
        result.innerDebtItemTotalPrice =
          Number(result.productPrice) * result.innerDebtItemQuantity;
        return result;
      }) || [];
    return mappedBorrowList;
  }

  getCustomerBorrowedPrice(
    borrowedList: ICustomer_IInerDebt_IInnerDebtItem_IItem[]
  ): number {
    console.log(borrowedList);
    const sum = borrowedList.reduce((sum, item) => {
      return sum + item.innerDebtItemTotalPrice;
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
    return {
      success: false,
      data: -1,
      message: i18n.t("customer-added-successfully"),
    };
  }

  async updateCustomer(customer: ICustomer): Promise<IResultType<number>> {
    this.validateCustomerFields(customer);
    const updatedCustomer: Customer = this.mapper.mapToCustomer(customer);
    const result = await this.customerDataAccess.updateCustomer(
      updatedCustomer
    );
    if (!result || !result.changes)
      return { success: false, data: 0, message: "" };
    return { success: true, data: result.changes, message: "" };
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

  validateCustomerFields(customer: ICustomer): void {
    customer.customerName = customer.customerName.trim();
    customer.customerPhoneNumber = customer.customerPhoneNumber.trim();
    customer.customerNotes = customer.customerNotes?.trim();
  }
}

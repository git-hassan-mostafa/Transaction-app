import { SQLiteRunResult } from "expo-sqlite";
import CustomerDataAccess from "../DAL/CustomersDataAccess";
import Mapper from "../Global/Helpers/MapService";
import ICustomer from "../ViewModels/Customers/ICustomer";
import { ICustomer_IInerDebt_IInnerDebtItem_IItem } from "../ViewModels/RelationModels/ICustomer_IInerDebt_IInnerDebtItem_IItem";
import Customer from "../Models/Customer";
import { Alert } from "react-native";
import i18n from "../Global/I18n/I18n";

export default class CustomerManager {
  constructor(
    private customerDataAccess: CustomerDataAccess,
    private mapper: Mapper
  ) {}

  async getAllCustomers() {
    const customersDB = await this.customerDataAccess.getAllCustomers();
    const customers = customersDB?.map((c) => {
      return this.mapper.mapToICustomer(c);
    }) as ICustomer[];

    return customers;
  }

  async getAllCustomersCalculated(): Promise<ICustomer[]> {
    const customers = await this.customerDataAccess.getAllCustomers();
    const borrowedList = await this.getCustomersBorrowedList();
    const mappedCustomers = customers?.map((c) =>
      this.mapper.mapToICustomer(c)
    );
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
    return mappedCustomers || [];
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
          Number(result.itemPrice) * result.innerDebtItemQuantity;
        return result;
      }) || [];
    return mappedBorrowList;
  }

  async getCustomersBorrowedList() {
    const borrowListDB = await this.customerDataAccess.getCustomersBorrowList();
    const mappedBorrowList =
      borrowListDB?.map((b) => {
        const result =
          this.mapper.mapTo_IICustomer_IInerDebt_IInnerDebtItem_IItem(b);
        result.innerDebtItemTotalPrice =
          Number(result.itemPrice) * result.innerDebtItemQuantity;
        return result;
      }) || [];
    return mappedBorrowList;
  }

  getCustomerBorrowedPrice(
    borrowedList: ICustomer_IInerDebt_IInnerDebtItem_IItem[]
  ) {
    const sum = borrowedList.reduce((sum, item) => {
      return sum + item.innerDebtItemTotalPrice;
    }, 0);
    return sum;
  }

  async addCustomer(customer: ICustomer) {
    const newCustomer: Customer = this.mapper.mapToCustomer(customer);
    const result = await this.customerDataAccess.addCustomer(newCustomer);
    if (!result || !result.lastInsertRowId) {
      Alert.alert(
        i18n.t("error"),
        i18n.t("failed-to-add-customer,please-try-again")
      );
      return null;
    }
    customer.customerId = result?.lastInsertRowId || -1;
    customer.customerBorrowedPrice = 0;
    return result;
  }

  async updateCustomer(customer: ICustomer): Promise<ICustomer> {
    this.validateCustomerFields(customer);
    const updatedCustomer: Customer = this.mapper.mapToCustomer(customer);
    await this.customerDataAccess.updateCustomer(updatedCustomer);
    return customer;
  }

  async deleteCustomer(id: number): Promise<SQLiteRunResult | null> {
    return this.customerDataAccess.deleteCustomer(id);
  }

  validateCustomerFields(customer: ICustomer) {
    customer.customerName = customer.customerName.trim();
    customer.customerPhoneNumber = customer.customerPhoneNumber.trim();
    customer.customerNotes = customer.customerNotes?.trim();
  }
}

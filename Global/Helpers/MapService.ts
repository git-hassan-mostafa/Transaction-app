import Customer from "../../Models/Customer";
import InnerDebt from "../../Models/InnerDebt";
import InnerDebtItem from "../../Models/InnerDebtItem";
import Item from "../../Models/Item";
import Person from "../../Models/Person";
import Provider from "../../Models/Provider";
import { Customer_InnerDebt } from "../../Models/RelationModels/Customer_InnerDebt";
import Customer_InnerDebt_InnerDebtItem_Item from "../../Models/RelationModels/Customer_InnerDebt_InnerDebtItem_Item";
import InnerDebtItem_InnerDebt_Item from "../../Models/RelationModels/InnerDebtItem_InnerDebt_Item";
import ICustomer from "../../ViewModels/Customers/ICustomer";
import IInnerDebt from "../../ViewModels/InnerDebts/IInerDebts";
import IInnerDebtItem from "../../ViewModels/InnerDebts/IInnerDebtItem";
import IProduct from "../../ViewModels/Products/IProduct";
import IPerson from "../../ViewModels/People/IPerson";
import IProvider from "../../ViewModels/Providers/IProvider";
import { ICustomer_IInerDebt_IInnerDebtItem_IItem } from "../../ViewModels/RelationModels/ICustomer_IInerDebt_IInnerDebtItem_IItem";
import { ICustomer_IInnerDebt } from "../../ViewModels/RelationModels/ICustomer_IInnerDebt";
import IInnerDebtItem_IInnerDebt_IItem from "../../ViewModels/RelationModels/IInnerDebtItem_IInnerDebt_IItem";

export default class Mapper {
  mapToCustomer(customer: ICustomer): Customer {
    return {
      CustomerId: customer.customerId as number,
      Name: customer?.customerName?.trim(),
      PhoneNumber: customer?.customerPhoneNumber?.trim(),
      Notes: customer?.customerNotes?.trim(),
    };
  }

  mapToCustomerAll(customers: ICustomer[]): Customer[] {
    return customers.map((c) => this.mapToCustomer(c));
  }

  mapToICustomer(customer: Customer): ICustomer {
    return {
      customerId: customer.CustomerId as number,
      customerName: customer.Name as string,
      customerBorrowedPrice: 0,
      customerPayedPrice: 0,
      customerPhoneNumber: customer.PhoneNumber as string,
      customerNotes: customer.Notes as string,
    };
  }

  mapToICustomerAll(customers: Customer[]): ICustomer[] {
    return customers.map((c) => this.mapToICustomer(c));
  }

  mapToProduct(item: IProduct): Item {
    return {
      ItemId: item.productId,
      Name: item.productName,
      Quantity: Number(item.productQuantity),
      Price: Number(item.productPrice),
      Item_ProviderId: item.product_ProviderId,
      Notes: item.productNotes,
    };
  }

  mapToProductAll(products: IProduct[]): Item[] {
    return products.map((p) => this.mapToProduct(p));
  }

  mapToIProduct(item: Item): IProduct {
    return {
      productId: item.ItemId as number,
      productName: item.Name as string,
      productQuantity: item.Quantity?.toString() as string,
      productPrice: item.Price?.toString() as string,
      product_ProviderId: item.Item_ProviderId as number,
      productNotes: item.Notes as string,
    };
  }

  mapToIProductAll(products: Item[]): IProduct[] {
    return products.map((p) => this.mapToIProduct(p));
  }

  mapToPerson(person: IPerson): Person {
    return {
      PersonId: person.id,
      Name: person.personName?.trim(),
      PhoneNumber: person.personPhoneNumber?.trim(),
    };
  }

  mapToPersonAll(people: IPerson[]): Person[] {
    return people.map((p) => this.mapToPerson(p));
  }

  mapToIPerson(person: Person): IPerson {
    return {
      id: person.PersonId as number,
      personName: person.Name as string,
      personPhoneNumber: person.PhoneNumber as string,
    };
  }

  mapToIPersonAll(people: Person[]): IPerson[] {
    return people.map((p) => this.mapToIPerson(p));
  }

  mapToProvider(provider: IProvider): Provider {
    return {
      ProviderId: provider.providerId as number,
      Name: provider.providerName as string,
      PhoneNumber: provider.providerPhoneNumber as string,
      Notes: provider.providerNotes as string,
    };
  }

  mapToProviderAll(providers: IProvider[]): Provider[] {
    return providers.map((provider) => this.mapToProvider(provider));
  }

  mapToIProvider(provider: Provider): IProvider {
    return {
      providerId: provider.ProviderId as number,
      providerName: provider.Name as string,
      providerBorrowedPrice: 0,
      providerPayedPrice: 0,
      providerPhoneNumber: provider.PhoneNumber as string,
      providerNotes: provider.Notes as string,
    };
  }

  mapToIProviderAll(providers: Provider[]): IProvider[] {
    return providers.map((provider) => this.mapToIProvider(provider));
  }

  mapToInnerDebt(innerDebt: IInnerDebt): InnerDebt {
    return {
      InnerDebtId: innerDebt.innerDebtId,
      Date: innerDebt.innerDebtDate || new Date().toISOString(),
      InnerDebt_PersonId: innerDebt.innerDebt_PersonId,
      InnerDebt_CustomerId: innerDebt.innerDebt_CustomerId,
      Notes: innerDebt.innerDebtNotes,
    };
  }

  mapToIInnerDebt(innerDebt: InnerDebt): IInnerDebt {
    return {
      innerDebtId: innerDebt.InnerDebtId as number,
      innerDebtTotalPrice: 0,
      innerDebtPricePaid: 0,
      innerDebtDate: innerDebt.Date as string,
      innerDebt_PersonId: innerDebt.InnerDebt_PersonId as number,
      innerDebt_CustomerId: innerDebt.InnerDebt_CustomerId as number,
      innerDebtNotes: innerDebt.Notes as string,
    };
  }

  mapToInnerDebtItem(innerDebtsItem: IInnerDebtItem): InnerDebtItem {
    return {
      InnerDebtItemId: innerDebtsItem.innerDebtItemId,
      InnerDebtItemQuantity: innerDebtsItem.innerDebtItemQuantity,
      InnerDebtItem_InnerDebtId: innerDebtsItem.innerDebtItem_InnerDebtId,
      InnerDebtItem_ItemId: innerDebtsItem.innerDebtItem_ItemId,
    };
  }

  mapToIInnerDebtItem(innerDebtsItem: InnerDebtItem): IInnerDebtItem {
    return {
      innerDebtItemId: innerDebtsItem.InnerDebtItemId as number,
      innerDebtItemQuantity: innerDebtsItem.InnerDebtItemQuantity as number,
      innerDebtItem_InnerDebtId:
        innerDebtsItem.InnerDebtItem_InnerDebtId as number,
      innerDebtItem_ItemId: innerDebtsItem.InnerDebtItem_ItemId as number,
      innerDebtItemTotalPrice: 0,
      innerDebtItemPricePaid: 0,
      isNew: false,
    };
  }

  mapTo_Customer_InnerDebt(
    ICustomer_IInnerDebt: ICustomer_IInnerDebt
  ): Customer_InnerDebt {
    return {
      ...this.mapToCustomer(ICustomer_IInnerDebt),
      ...this.mapToInnerDebt(ICustomer_IInnerDebt),
    };
  }

  mapTo_Customer_InnerDebtAll(
    iCustomer_IInnerDebts: ICustomer_IInnerDebt[]
  ): Customer_InnerDebt[] {
    return iCustomer_IInnerDebts.map((ic) => this.mapTo_Customer_InnerDebt(ic));
  }

  mapToICustomer_IInnerDebt(
    Customer_InnerDebt: Customer_InnerDebt
  ): ICustomer_IInnerDebt {
    return {
      ...this.mapToICustomer(Customer_InnerDebt),
      ...this.mapToIInnerDebt(Customer_InnerDebt),
    };
  }

  mapToICustomer_IInnerDebtAll(
    customer_InnerDebts: Customer_InnerDebt[]
  ): ICustomer_IInnerDebt[] {
    return customer_InnerDebts.map((c) => this.mapToICustomer_IInnerDebt(c));
  }

  mapTo_IInnerDebtItem_IInnerDebt_IItem(
    InnerDebtItem_InnerDebt_Item: InnerDebtItem_InnerDebt_Item
  ): IInnerDebtItem_IInnerDebt_IItem {
    return {
      ...this.mapToIInnerDebt(InnerDebtItem_InnerDebt_Item),
      ...this.mapToIProduct(InnerDebtItem_InnerDebt_Item),
      ...this.mapToIInnerDebtItem(InnerDebtItem_InnerDebt_Item),
    };
  }

  mapTo_IICustomer_IInerDebt_IInnerDebtItem_IItem(
    Customer_InnerDebt_InnerDebtItem_Item: Customer_InnerDebt_InnerDebtItem_Item
  ): ICustomer_IInerDebt_IInnerDebtItem_IItem {
    return {
      ...this.mapToICustomer(Customer_InnerDebt_InnerDebtItem_Item),
      ...this.mapToIInnerDebt(Customer_InnerDebt_InnerDebtItem_Item),
      ...this.mapToIInnerDebtItem(Customer_InnerDebt_InnerDebtItem_Item),
      ...this.mapToIProduct(Customer_InnerDebt_InnerDebtItem_Item),
    };
  }
}

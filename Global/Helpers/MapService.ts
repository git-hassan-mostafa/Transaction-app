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
import IItem from "../../ViewModels/Items/IItem";
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

  mapToItem(item: IItem): Item {
    return {
      ItemId: item.itemId,
      Name: item.itemName,
      Quantity: Number(item.itemQuantity),
      Price: Number(item.itemPrice),
      Item_ProviderId: item.item_ProviderId,
      Notes: item.itemNotes,
    };
  }

  mapToIItem(item: Item): IItem {
    return {
      itemId: item.ItemId as number,
      itemName: item.Name as string,
      itemQuantity: item.Quantity?.toString() as string,
      itemPrice: item.Price?.toString() as string,
      item_ProviderId: item.Item_ProviderId as number,
      itemNotes: item.Notes as string,
    };
  }

  mapToPerson(person: IPerson): Person {
    return {
      PersonId: person.id,
      Name: person.personName,
      PhoneNumber: person.personPhoneNumber,
    };
  }

  mapToIPerson(person: Person): IPerson {
    return {
      id: person.PersonId as number,
      personName: person.Name as string,
      personPhoneNumber: person.PhoneNumber as string,
    };
  }

  mapToProvider(provider: IProvider): Provider {
    return {
      ProviderId: provider.providerId as number,
      Name: provider.providerName as string,
      PhoneNumber: provider.providerPhoneNumber as string,
      Notes: provider.providerNotes as string,
    };
  }

  mapToIProvider(provider: Provider): IProvider {
    return {
      providerId: provider.ProviderId as number,
      providerName: provider.Name as string,
      providerBorrowedPrice: 0,
      providerayedPrice: 0,
      providerPhoneNumber: provider.PhoneNumber as string,
      providerNotes: provider.Notes as string,
    };
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

  mapToICustomer_IInnerDebt(
    Customer_InnerDebt: Customer_InnerDebt
  ): ICustomer_IInnerDebt {
    return {
      ...this.mapToICustomer(Customer_InnerDebt),
      ...this.mapToIInnerDebt(Customer_InnerDebt),
    };
  }

  mapTo_IInnerDebtItem_IInnerDebt_IItem(
    InnerDebtItem_InnerDebt_Item: InnerDebtItem_InnerDebt_Item
  ): IInnerDebtItem_IInnerDebt_IItem {
    return {
      ...this.mapToIInnerDebt(InnerDebtItem_InnerDebt_Item),
      ...this.mapToIItem(InnerDebtItem_InnerDebt_Item),
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
      ...this.mapToIItem(Customer_InnerDebt_InnerDebtItem_Item),
    };
  }
}

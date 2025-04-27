import Customer from "../Models/Customer";
import InnerDebt from "../Models/InnerDebt";
import Item from "../Models/Item";
import Person from "../Models/Person";
import Provider from "../Models/Provider";
import { CustomerInnerDebt } from "../Models/RelationModels/CustomerInnerDebt";
import ICustomer from "../ViewModels/Customers/ICustomer";
import IInnerDebt from "../ViewModels/InnerDebts/IInerDebts";
import IItem from "../ViewModels/Items/IItem";
import IPerson from "../ViewModels/People/IPerson";
import IProvider from "../ViewModels/Providers/IProvider";
import { ICustomerInnerDebt } from "../ViewModels/RelationModels/ICustomerInnerDebt";

export default class MapService {
  mapToCustomer(customer: ICustomer): Customer {
    return {
      CustomerId: customer.customerId as number,
      Name: customer.name as string,
      PhoneNumber: customer.phoneNumber as string,
      Notes: customer.notes as string,
    };
  }

  mapToICustomer(customer: Customer): ICustomer {
    return {
      customerId: customer.CustomerId as number,
      name: customer.Name as string,
      borrowedPrice: 0,
      payedPrice: 0,
      phoneNumber: customer.PhoneNumber as string,
      borrowList: [],
      notes: customer.Notes as string,
    };
  }

  mapToItem(item: IItem): Item {
    return {
      ItemId: item.id,
      Name: item.itemName,
      Quantity: item.quantity,
      Price: item.price,
      ProviderId: item.providerId,
      Notes: item.notes,
    };
  }

  mapToIItem(item: Item): IItem {
    return {
      id: item.ItemId as number,
      itemName: item.Name as string,
      quantity: item.Quantity as number,
      price: item.Price as number,
      providerId: item.ProviderId as number,
      notes: item.Notes as string,
    };
  }

  mapToPerson(person: IPerson): Person {
    return {
      PersonId: person.id,
      Name: person.name,
      PhoneNumber: person.phoneNumber,
    };
  }

  mapToIPerson(person: Person): IPerson {
    return {
      id: person.PersonId as number,
      name: person.Name as string,
      phoneNumber: person.PhoneNumber as string,
    };
  }

  mapToProvider(provider: IProvider): Provider {
    return {
      ProviderId: provider.id as number,
      Name: provider.name as string,
      PhoneNumber: provider.phoneNumber as string,
      Notes: provider.notes as string,
    };
  }

  mapToIProvider(provider: Provider): IProvider {
    return {
      id: provider.ProviderId as number,
      name: provider.Name as string,
      borrowedPrice: 0,
      payedPrice: 0,
      phoneNumber: provider.PhoneNumber as string,
      notes: provider.Notes as string,
      itemsList: [],
    };
  }

  mapToInnerDebt(innerDebt: IInnerDebt): InnerDebt {
    return {
      InnerDebtId: innerDebt.innerDebtId,
      TotalPrice: innerDebt.totalPrice,
      PricePaid: innerDebt.pricePaid,
      Date: innerDebt.date,
      PersonId: innerDebt.personId,
      CustomerId: innerDebt.customerId,
      Notes: innerDebt.notes,
    };
  }

  mapToIInnerDebt(innerDebt: InnerDebt): IInnerDebt {
    return {
      innerDebtId: innerDebt.InnerDebtId as number,
      totalPrice: innerDebt.TotalPrice as number,
      pricePaid: innerDebt.PricePaid as number,
      date: innerDebt.Date as string,
      itemsList: [],
      paymentsList: [],
      personId: innerDebt.PersonId as number,
      customerId: innerDebt.CustomerId as number,
      notes: innerDebt.Notes as string,
    };
  }

  mapToCustomerInnerDebt(
    customerInnerDebt: ICustomerInnerDebt
  ): CustomerInnerDebt {
    return {
      ...this.mapToCustomer(customerInnerDebt),
      ...this.mapToInnerDebt(customerInnerDebt),
    };
  }

  mapToICustomerInnerDebt(
    customerInnerDebt: CustomerInnerDebt
  ): ICustomerInnerDebt {
    return {
      ...this.mapToICustomer(customerInnerDebt),
      ...this.mapToIInnerDebt(customerInnerDebt),
    };
  }
}

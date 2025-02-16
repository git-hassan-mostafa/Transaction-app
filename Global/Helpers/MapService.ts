import Customer from "../Models/Customer";
import InnerDebt from "../Models/InnerDebt";
import Item from "../Models/Item";
import Person from "../Models/Person";
import Provider from "../Models/Provider";
import ICustomer from "../ViewModels/Customers/ICustomer";
import IInnerDebt from "../ViewModels/InnerDebts/IInerDebts";
import IItem from "../ViewModels/Items/IItem";
import IPerson from "../ViewModels/People/IPerson";
import IProvider from "../ViewModels/Providers/IProvider";

export default class MapService {
  mapToCustomer(customer: ICustomer): Customer {
    return {
      Id: customer.id as number,
      Name: customer.name as string,
      BorrowedPrice: customer.borrowedPrice as number,
      PayedPrice: customer.payedPrice as number,
      PhoneNumber: customer.phoneNumber as string,
      Notes: customer.notes as string,
    };
  }

  mapToICustomer(customer: Customer): ICustomer {
    return {
      id: customer.Id as number,
      name: customer.Name as string,
      borrowedPrice: customer.BorrowedPrice as number,
      payedPrice: customer.PayedPrice as number,
      phoneNumber: customer.PhoneNumber as string,
      borrowList: [],
      notes: customer.Notes as string,
    };
  }

  mapToItem(item: IItem): Item {
    return {
      Id: item.id,
      Name: item.name,
      Quantity: item.quantity,
      Price: item.price,
      ProviderId: item.providerId,
      Notes: item.notes,
    };
  }

  mapToIItem(item: Item): IItem {
    return {
      id: item.Id as number,
      name: item.Name as string,
      quantity: item.Quantity as number,
      price: item.Price as number,
      providerId: item.ProviderId as number,
      notes: item.Notes as string,
    };
  }

  mapToPerson(person: IPerson): Person {
    return {
      Id: person.id,
      Name: person.name,
      PhoneNumber: person.phoneNumber,
    };
  }

  mapToIPerson(person: Person): IPerson {
    return {
      id: person.Id as number,
      name: person.Name as string,
      phoneNumber: person.PhoneNumber as string,
    };
  }

  mapToProvider(provider: IProvider): Provider {
    return {
      Id: provider.id as number,
      Name: provider.name as string,
      BorrowedPrice: provider.borrowedPrice as number,
      PayedPrice: provider.payedPrice as number,
      PhoneNumber: provider.phoneNumber as string,
      Notes: provider.notes as string,
    };
  }

  mapToIProvider(provider: Provider): IProvider {
    return {
      id: provider.Id as number,
      name: provider.Name as string,
      borrowedPrice: provider.BorrowedPrice as number,
      payedPrice: provider.PayedPrice as number,
      phoneNumber: provider.PhoneNumber as string,
      notes: provider.Notes as string,
      itemsList: [],
    };
  }

  mapToInnerDebt(innerDebt: IInnerDebt): InnerDebt {
    return {
      Id: innerDebt.id,
      TotalPrice: innerDebt.totalPrice,
      PricePaid: innerDebt.pricePaid,
      Date: innerDebt.date,
      ItemsList: innerDebt.itemsList,
      PaymentsList: innerDebt.paymentsList,
      PersonId: innerDebt.personId,
      CustomerId: innerDebt.customerId,
      Notes: innerDebt.notes,
    };
  }

  mapToIInnerDebt(
    innerDebt: InnerDebt,
    customer: Customer | undefined | null = null
  ): IInnerDebt {
    return {
      id: innerDebt.Id as number,
      totalPrice: innerDebt.TotalPrice as number,
      pricePaid: innerDebt.PricePaid as number,
      date: innerDebt.Date as string,
      itemsList: innerDebt.ItemsList as string,
      paymentsList: innerDebt.PaymentsList as string,
      personId: innerDebt.PersonId as number,
      customerId: innerDebt.CustomerId as number,
      notes: innerDebt.Notes as string,
      customer:
        this.mapToICustomer(customer || ({} as Customer)) || ({} as ICustomer),
    };
  }
}

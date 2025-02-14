import Customer from "../Models/Customer";
import Item from "../Models/Item";
import Person from "../Models/Person";
import Provider from "../Models/Provider";
import ICustomer from "../ViewModels/Customers/ICustomer";
import IItem from "../ViewModels/Items/IItem";
import IPerson from "../ViewModels/People/IPerson";
import IProvider from "../ViewModels/Providers/IProvider";

export default class MapService {
  mapCustomer(customer: ICustomer): Customer {
    return {
      id: customer.id as number,
      name: customer.name as string,
      borrowedPrice: customer.borrowedPrice as number,
      payedPrice: customer.payedPrice as number,
      phoneNumber: customer.phoneNumber as string,
      notes: customer.notes as string,
    };
  }

  mapICustomer(customer: Customer): ICustomer {
    return {
      id: customer.id as number,
      name: customer.name as string,
      borrowedPrice: customer.borrowedPrice as number,
      payedPrice: customer.payedPrice as number,
      phoneNumber: customer.phoneNumber as string,
      borrowList: [],
      notes: customer.notes as string,
    };
  }

  mapItem(item: IItem): Item {
    return {
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      providerId: item.providerId,
      notes: item.notes,
    };
  }

  mapIItem(item: Item): IItem {
    return {
      id: item.id as number,
      name: item.name as string,
      quantity: item.quantity as number,
      price: item.price as number,
      providerId: item.providerId as number,
      notes: item.notes as string,
    };
  }

  mapPerson(person: IPerson): Person {
    return {
      id: person.id,
      name: person.name,
      phoneNumber: person.phoneNumber,
    };
  }

  mapIPerson(person: Person): IPerson {
    return {
      id: person.id as number,
      name: person.name as string,
      phoneNumber: person.phoneNumber as string,
    };
  }

  mapProvider(provider: IProvider): Provider {
    return {
      id: provider.id as number,
      name: provider.name as string,
      borrowedPrice: provider.borrowedPrice as number,
      payedPrice: provider.payedPrice as number,
      phoneNumber: provider.phoneNumber as string,
      notes: provider.notes as string,
    };
  }

  mapIProvider(provider: Provider): IProvider {
    return {
      id: provider.id as number,
      name: provider.name as string,
      borrowedPrice: provider.borrowedPrice as number,
      payedPrice: provider.payedPrice as number,
      phoneNumber: provider.phoneNumber as string,
      notes: provider.notes as string,
      itemsList: [],
    };
  }
}

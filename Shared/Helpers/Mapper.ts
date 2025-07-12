import ICustomer from "../../Models/Customers/ICustomer";
import IProduct from "../../Models/Products/IProduct";
import IProvider from "../../Models/Providers/IProvider";
import IInternalDebt from "@/Models/InternalDebts/IInternalDebts";
import IInternalDebtProduct from "@/Models/InternalDebts/IInternalDebtProduct";
import { Provider } from "@/DataBase/Supabase/Models/Provider";
import { Person } from "@/DataBase/Supabase/Models/Person";
import IPerson from "@/Models/People/IPerson";
import { Product } from "@/DataBase/Supabase/Models/Product";
import { InternalDebtProduct } from "@/DataBase/Supabase/Models/InternalDebtProduct";
import { Customer } from "@/DataBase/Supabase/Models/Customer";
import { InternalDebt } from "@/DataBase/Supabase/Models/InternalDebt";

export default class Mapper {
  mapToCustomer(customer: ICustomer): Customer {
    try {
      if (Object.keys(customer).length === 0) {
        return {} as Customer;
      }
      return {
        id: customer.Id,
        name: customer.Name,
        phonenumber: customer.PhoneNumber,
        notes: customer.Notes,
        // internaldebts: this.mapToInternalDebtAll(customer.InternalDebts || []),
      };
    } catch (error) {
      console.trace("Error in mapToCustomer:", error);
      throw error;
    }
  }

  mapToICustomer(customer: Customer): ICustomer {
    try {
      if (Object.keys(customer).length === 0) {
        return {} as ICustomer;
      }
      const borrowedPrice = customer.internaldebts
        ? this.mapToIInternalDebtAll(customer.internaldebts || []).reduce(
            (sum, debt) => {
              return sum + debt.TotalPrice;
            },
            0
          )
        : 0;
      const InternalDebts = this.mapToIInternalDebtAll(
        customer.internaldebts || []
      );
      return {
        Id: customer.id,
        Name: customer.name,
        PhoneNumber: customer.phonenumber,
        Notes: customer.notes,
        BorrowedPrice: borrowedPrice,
        PayedPrice: 0,
        InternalDebts,
        Debts: InternalDebts,
      };
    } catch (error) {
      console.trace("Error in mapToICustomer:", error);
      throw error;
    }
  }

  mapToCustomerAll(customers: ICustomer[]): Customer[] {
    try {
      return customers.map((c) => this.mapToCustomer(c));
    } catch (error) {
      console.trace("Error in mapToCustomerAll:", error);
      throw error;
    }
  }

  mapToICustomerAll(customers: Customer[]): ICustomer[] {
    try {
      return customers.map((c) => this.mapToICustomer(c));
    } catch (error) {
      console.trace("Error in mapToICustomerAll:", error);
      throw error;
    }
  }

  mapToProduct(product: IProduct): Product {
    try {
      if (Object.keys(product).length === 0) {
        return {} as Product;
      }
      return {
        id: product.Id,
        name: product.Name,
        quantity: Number(product.Quantity),
        price: Number(product.Price),
        notes: product.Notes,
        providerid: product.ProviderId,
        // provider: this.mapToProvider(product.Provider || ({} as IProvider)),
      };
    } catch (error) {
      console.trace("Error in mapToProduct:", error);
      throw error;
    }
  }

  mapToIProduct(product: Product): IProduct {
    try {
      if (Object.keys(product).length === 0) {
        return {} as IProduct;
      }
      return {
        Id: product.id,
        Name: product.name,
        Price: product.price?.toString(),
        Quantity: product.quantity?.toString(),
        Provider: this.mapToIProvider(product.providers || ({} as Provider)),
      };
    } catch (error) {
      console.trace("Error in mapToIProduct:", error);
      throw error;
    }
  }

  mapToProductAll(products: IProduct[]): Product[] {
    try {
      return products.map((p) => this.mapToProduct(p));
    } catch (error) {
      console.trace("Error in mapToProductAll:", error);
      throw error;
    }
  }

  mapToIProductAll(products: Product[]): IProduct[] {
    try {
      return products.map((p) => this.mapToIProduct(p));
    } catch (error) {
      console.trace("Error in mapToIProductAll:", error);
      throw error;
    }
  }

  mapToProvider(provider: IProvider): Provider {
    try {
      if (Object.keys(provider).length === 0) {
        return {} as Provider;
      }
      return {
        id: provider.Id,
        name: provider.Name,
        phonenumber: provider.PhoneNumber,
        notes: provider.Notes,
        // products: this.mapToProductAll(provider.Products || []),
        // externaldebts: this.mapToExternalDebtAll(provider.ExternalDebts || []),
      };
    } catch (error) {
      console.trace("Error in mapToProvider:", error);
      throw error;
    }
  }

  mapToIProvider(provider: Provider): IProvider {
    try {
      if (Object.keys(provider).length === 0) {
        return {} as IProvider;
      }
      return {
        Id: provider.id,
        Name: provider.name,
        PhoneNumber: provider.phonenumber,
        Notes: provider.notes,
        BorrowedPrice: 0,
        PayedPrice: 0,
        Products: this.mapToIProductAll(provider.products || []),
        // ExternalDebts:this.mapToIExternalDebtAll(provider.externaldebts || []),
      };
    } catch (error) {
      console.trace("Error in mapToIProvider:", error);
      throw error;
    }
  }

  mapToProviderAll(providers: IProvider[]): Provider[] {
    try {
      return providers.map((provider) => this.mapToProvider(provider));
    } catch (error) {
      console.trace("Error in mapToProviderAll:", error);
      throw error;
    }
  }

  mapToIProviderAll(providers: Provider[]): IProvider[] {
    try {
      return providers.map((provider) => this.mapToIProvider(provider));
    } catch (error) {
      console.trace("Error in mapToIProviderAll:", error);
      throw error;
    }
  }

  mapToIPerson(person: Person): IPerson {
    try {
      if (Object.keys(person).length === 0) {
        return {} as IPerson;
      }
      return {
        Id: person.id,
        Name: person.name,
        PhoneNumber: person.phonenumber,
        InternalDebts: this.mapToIInternalDebtAll(person.internaldebts || []),
        // ExternalDebts:this.mapToIExternalDebtAll(person.externaldebts || []),
      };
    } catch (error) {
      console.trace("Error in mapToIPerson:", error);
      throw error;
    }
  }

  mapToPerson(person: IPerson): Person {
    try {
      if (Object.keys(person).length === 0) {
        return {} as Person;
      }
      return {
        id: person.Id,
        name: person.Name,
        phonenumber: person.PhoneNumber,
        // internaldebts: this.mapToInternalDebtAll(person.InternalDebts || []),
        // externaldebts:this.mapToExternalDebtAll(person.ExternalDebts || []),
      };
    } catch (error) {
      console.trace("Error in mapToPerson:", error);
      throw error;
    }
  }

  mapToIPersonAll(people: Person[]): IPerson[] {
    try {
      return people.map((person) => this.mapToIPerson(person));
    } catch (error) {
      console.trace("Error in mapToIPersonAll:", error);
      throw error;
    }
  }

  mapToPersonAll(people: IPerson[]): Person[] {
    try {
      return people.map((person) => this.mapToPerson(person));
    } catch (error) {
      console.trace("Error in mapToPersonAll:", error);
      throw error;
    }
  }

  mapToInternalDebt(internalDebt: IInternalDebt): InternalDebt {
    try {
      if (Object.keys(internalDebt).length === 0) {
        return {} as InternalDebt;
      }
      return {
        id: internalDebt.Id,
        date: internalDebt.Date,
        notes: internalDebt.Notes,
        customerid: internalDebt.CustomerId,
        personid: internalDebt.PersonId,
        // customer: this.mapToCustomer(internalDebt.Customer || ({} as ICustomer)),
        // person: this.mapToPerson(internalDebt.Person || ({} as IPerson)),
        // internaldebtproducts: this.mapToInternalDebtProductAll(
        //   internalDebt.InternalDebtProducts || []
        // ),
        // internaldebtpayments: [],
        // internaldebtpayments: this.mapToInternalDebtPaymentAll(internalDebt.InternalDebtPayments || []),
      };
    } catch (error) {
      console.trace("Error in mapToInternalDebt:", error);
      throw error;
    }
  }

  mapToIInternalDebt(internalDebt: InternalDebt): IInternalDebt {
    try {
      if (Object.keys(internalDebt).length === 0) {
        return {} as IInternalDebt;
      }
      const TotalPrice =
        internalDebt.internaldebtproducts?.reduce(
          (prodSum, prod) =>
            prodSum + this.mapToIInternalDebtProduct(prod).TotalPrice,
          0
        ) || 0;
      return {
        Id: internalDebt.id,
        Date: internalDebt.date,
        Notes: internalDebt.notes,
        CustomerId: internalDebt.customerid,
        PersonId: internalDebt.personid,
        Customer: this.mapToICustomer(
          internalDebt.customers || ({} as Customer)
        ),
        Person: this.mapToIPerson(internalDebt.people || ({} as Person)),
        TotalPrice,
        PaidPrice: 0, // to be calculated later
        InternalDebtProducts: this.mapToIInternalDebtProductAll(
          internalDebt.internaldebtproducts || []
        ),
        InternalDebtPayments: [], // to be implemented later
      };
    } catch (error) {
      console.trace("Error in mapToIInternalDebt:", error);
      throw error;
    }
  }

  mapToIInternalDebtAll(
    internalDebts: InternalDebt[] | null | undefined
  ): IInternalDebt[] {
    try {
      if (!internalDebts) {
        return [];
      }
      return internalDebts.map((i) => this.mapToIInternalDebt(i));
    } catch (error) {
      console.trace("Error in mapToIInternalDebtAll:", error);
      throw error;
    }
  }

  mapToInternalDebtAll(internalDebts: IInternalDebt[]): InternalDebt[] {
    try {
      return internalDebts.map((i) => this.mapToInternalDebt(i));
    } catch (error) {
      console.trace("Error in mapToInternalDebtAll:", error);
      throw error;
    }
  }

  mapToInternalDebtProduct(
    internalDebtsProduct: IInternalDebtProduct
  ): InternalDebtProduct {
    try {
      if (Object.keys(internalDebtsProduct).length === 0) {
        return {} as InternalDebtProduct;
      }
      return {
        id: internalDebtsProduct.Id,
        quantity: internalDebtsProduct.Quantity,
        internaldebtid: internalDebtsProduct.InternalDebtId,
        productid: internalDebtsProduct.ProductId,
        // InternalDebt: this.mapToInternalDebt(
        //   internalDebtsProduct.InternalDebt || ({} as IInternalDebt)
        // ),
        // Product: this.mapToProduct(
        //   internalDebtsProduct.Product || ({} as IProduct)
        // ),
      };
    } catch (error) {
      console.trace("Error in mapToInternalDebtProduct:", error);
      throw error;
    }
  }

  mapToIInternalDebtProduct(
    internalDebtsProduct: InternalDebtProduct
  ): IInternalDebtProduct {
    try {
      if (Object.keys(internalDebtsProduct).length === 0) {
        return {} as IInternalDebtProduct;
      }
      return {
        Id: internalDebtsProduct.id,
        Quantity: internalDebtsProduct.quantity,
        InternalDebtId: internalDebtsProduct.internaldebtid,
        ProductId: internalDebtsProduct.productid,
        IsNew: false,
        TotalPrice:
          internalDebtsProduct.quantity *
          (internalDebtsProduct.products?.price ?? 0),
        Product: this.mapToIProduct(
          internalDebtsProduct.products || ({} as Product)
        ),
        InternalDebt: this.mapToIInternalDebt(
          internalDebtsProduct.InternalDebts || ({} as InternalDebt)
        ),
      };
    } catch (error) {
      console.trace("Error in mapToIInternalDebtProduct:", error);
      throw error;
    }
  }

  mapToIInternalDebtProductAll(internalDebtsProducts: InternalDebtProduct[]) {
    try {
      return internalDebtsProducts.map((i) =>
        this.mapToIInternalDebtProduct(i)
      );
    } catch (error) {
      console.trace("Error in mapToIInternalDebtProductAll:", error);
      throw error;
    }
  }

  mapToInternalDebtProductAll(
    internalDebtsProducts: IInternalDebtProduct[]
  ): InternalDebtProduct[] {
    try {
      return internalDebtsProducts.map((i) => this.mapToInternalDebtProduct(i));
    } catch (error) {
      console.trace("Error in mapToInternalDebtProductAll:", error);
      throw error;
    }
  }
}

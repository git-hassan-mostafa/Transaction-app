import Customer from "../../DataBase/Models/Customer";
import InternalDebt from "../../DataBase/Models/InternalDebt";
import InternalDebtProduct from "../../DataBase/Models/InternalDebtProduct";
import Product from "../../DataBase/Models/Product";
import Person from "../../DataBase/Models/Person";
import Provider from "../../DataBase/Models/Provider";
import { Customer_InternalDebt } from "../../DataBase/Models/RelationModels/Customer_InternalDebt";
import Customer_InternalDebt_InternalDebtProduct_Product from "../../DataBase/Models/RelationModels/Customer_InternalDebt_InternalDebtProduct_Product";
import InternalDebtProduct_InternalDebt_Product from "../../DataBase/Models/RelationModels/InternalDebtProduct_InternalDebt_Product";
import ICustomer from "../../Models/Customers/ICustomer";
import IProduct from "../../Models/Products/IProduct";
import IPerson from "../../Models/People/IPerson";
import IProvider from "../../Models/Providers/IProvider";
import { ICustomer_IInternalDebt_IInternalDebtProduct_IProduct } from "../../Models/RelationModels/ICustomer_IInternalDebt_IInternalDebtProduct_IProduct";
import { ICustomer_IInnternalDebt } from "../../Models/RelationModels/ICustomer_IInnternalDebt";
import IInternalDebtProduct_IInternalDebt_IProduct from "../../Models/RelationModels/IInternalDebtProduct_IInternalDebt_IProduct";
import IInternalDebt from "@/Models/InternalDebts/IInternalDebts";
import IInternalDebtProduct from "@/Models/InternalDebts/IInternalDebtProduct";

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

  mapToProduct(product: IProduct): Product {
    return {
      ProductId: product.productId,
      Name: product.productName,
      Quantity: Number(product.productQuantity),
      Price: Number(product.productPrice),
      Product_ProviderId: product.product_ProviderId,
      Notes: product.productNotes,
    };
  }

  mapToProductAll(products: IProduct[]): Product[] {
    return products.map((p) => this.mapToProduct(p));
  }

  mapToIProduct(product: Product): IProduct {
    return {
      productId: product.ProductId as number,
      productName: product.Name as string,
      productQuantity: product.Quantity?.toString() as string,
      productPrice: product.Price?.toString() as string,
      product_ProviderId: product.Product_ProviderId as number,
      productNotes: product.Notes as string,
    };
  }

  mapToIProductAll(products: Product[]): IProduct[] {
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

  mapToInternalDebt(internalDebt: IInternalDebt): InternalDebt {
    return {
      InternalDebtId: internalDebt.internalDebtId,
      Date: internalDebt.internalDebtDate || new Date().toISOString(),
      InternalDebt_PersonId: internalDebt.internalDebt_PersonId,
      InternalDebt_CustomerId: internalDebt.internalDebt_CustomerId,
      Notes: internalDebt.internalDebtNotes,
    };
  }

  mapToIInternalDebt(internalDebt: InternalDebt): IInternalDebt {
    return {
      internalDebtId: internalDebt.InternalDebtId as number,
      internalDebtTotalPrice: 0,
      internalDebtPricePaid: 0,
      internalDebtDate: internalDebt.Date as string,
      internalDebt_PersonId: internalDebt.InternalDebt_PersonId as number,
      internalDebt_CustomerId: internalDebt.InternalDebt_CustomerId as number,
      internalDebtNotes: internalDebt.Notes as string,
    };
  }

  mapToInternalDebtProduct(
    internalDebtsProduct: IInternalDebtProduct
  ): InternalDebtProduct {
    return {
      InternalDebtProductId: internalDebtsProduct.internalDebtProductId,
      InternalDebtProductQuantity:
        internalDebtsProduct.internalDebtProductQuantity,
      InternalDebtProduct_InternalDebtId:
        internalDebtsProduct.internalDebtProduct_InternalDebtId,
      InternalDebtProduct_ProductId:
        internalDebtsProduct.internalDebtProduct_ProductId,
    };
  }

  mapToIInternalDebtProduct(
    internalDebtsProduct: InternalDebtProduct
  ): IInternalDebtProduct {
    return {
      internalDebtProductId:
        internalDebtsProduct.InternalDebtProductId as number,
      internalDebtProductQuantity:
        internalDebtsProduct.InternalDebtProductQuantity as number,
      internalDebtProduct_InternalDebtId:
        internalDebtsProduct.InternalDebtProduct_InternalDebtId as number,
      internalDebtProduct_ProductId:
        internalDebtsProduct.InternalDebtProduct_ProductId as number,
      internalDebtProductTotalPrice: 0,
      internalDebtProductPricePaid: 0,
      isNew: false,
    };
  }

  mapTo_Customer_InternalDebt(
    ICustomer_IInternalDebt: ICustomer_IInnternalDebt
  ): Customer_InternalDebt {
    return {
      ...this.mapToCustomer(ICustomer_IInternalDebt),
      ...this.mapToInternalDebt(ICustomer_IInternalDebt),
    };
  }

  mapTo_Customer_InternalDebtAll(
    iCustomer_IInternalDebts: ICustomer_IInnternalDebt[]
  ): Customer_InternalDebt[] {
    return iCustomer_IInternalDebts.map((ic) =>
      this.mapTo_Customer_InternalDebt(ic)
    );
  }

  mapToICustomer_IInternalDebt(
    Customer_InternalDebt: Customer_InternalDebt
  ): ICustomer_IInnternalDebt {
    return {
      ...this.mapToICustomer(Customer_InternalDebt),
      ...this.mapToIInternalDebt(Customer_InternalDebt),
    };
  }

  mapToICustomer_IInternalDebtAll(
    customer_InternalDebts: Customer_InternalDebt[]
  ): ICustomer_IInnternalDebt[] {
    return customer_InternalDebts.map((c) =>
      this.mapToICustomer_IInternalDebt(c)
    );
  }

  mapTo_IInternalDebtProduct_IInternalDebt_IProduct(
    InternalDebtProduct_InternalDebt_Product: InternalDebtProduct_InternalDebt_Product
  ): IInternalDebtProduct_IInternalDebt_IProduct {
    return {
      ...this.mapToIInternalDebt(InternalDebtProduct_InternalDebt_Product),
      ...this.mapToIProduct(InternalDebtProduct_InternalDebt_Product),
      ...this.mapToIInternalDebtProduct(
        InternalDebtProduct_InternalDebt_Product
      ),
    };
  }

  mapTo_IICustomer_IInerDebt_IInternalDebtProduct_IProduct(
    Customer_InternalDebt_InternalDebtProduct_Product: Customer_InternalDebt_InternalDebtProduct_Product
  ): ICustomer_IInternalDebt_IInternalDebtProduct_IProduct {
    return {
      ...this.mapToICustomer(Customer_InternalDebt_InternalDebtProduct_Product),
      ...this.mapToIInternalDebt(
        Customer_InternalDebt_InternalDebtProduct_Product
      ),
      ...this.mapToIInternalDebtProduct(
        Customer_InternalDebt_InternalDebtProduct_Product
      ),
      ...this.mapToIProduct(Customer_InternalDebt_InternalDebtProduct_Product),
    };
  }
}

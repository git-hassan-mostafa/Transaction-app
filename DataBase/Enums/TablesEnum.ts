export enum TableEnum {
  Customers = "customers",
  People = "people",
  Providers = "providers",
  Products = "products",
  InternalDebts = "InternalDebts",
  InternalDebtProducts = "InternalDebtProducts",
  InternalDebtPayments = "InternalDebtPayments",
  ExternalDebts = "ExternalDebts",
  ExternalDebtProducts = "ExternalDebtProducts",
  ExternalDebtPayments = "ExternalDebtPayments",
}

export enum PrimaryKeysEnum {
  CustomerId = "CustomerId",
  PersonId = "PersonId",
  ProviderId = "ProviderId",
  ProductId = "ProductId",
  InternalDebtId = "InternalDebtId",
  InternalDebtProductId = "InternalDebtProductId",
  ExternalDebtId = "ExternalDebtId",
  ExternalDebtProductId = "ExternalDebtProductId",
}

export enum ForeignKeysEnum {
  InternalDebt_PersonId = "InternalDebt_PersonId",
  InternalDebt_CustomerId = "InternalDebt_CustomerId",
  InternalDebtPayment_InnerDebtId = "InternalDebtPayment_InnerDebtId",
  InternalDebtProduct_InternalDebtId = "InternalDebtProduct_InternalDebtId",
  InternalDebtProduct_ProductId = "InternalDebtProduct_ProductId",
  Product_ProviderId = "Product_ProviderId",
}

import ICustomer from "../Customers/ICustomer";
import IInternalDebtProduct from "../InternalDebts/IInternalDebtProduct";
import IInternalDebt from "../InternalDebts/IInternalDebts";
import IProduct from "../Products/IProduct";

export interface ICustomer_IInternalDebt_IInternalDebtProduct_IProduct
  extends ICustomer,
    IInternalDebt,
    IInternalDebtProduct,
    IProduct {}

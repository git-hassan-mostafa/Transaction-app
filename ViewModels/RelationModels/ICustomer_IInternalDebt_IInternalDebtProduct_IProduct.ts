import ICustomer from "../Customers/ICustomer";
import IInternalDebt from "../InternalDebts/IInternalDebts";
import IInternalDebtProduct from "../InternalDebts/IInternalDebtProduct";
import IProduct from "../Products/IProduct";

export interface ICustomer_IInternalDebt_IInternalDebtProduct_IProduct
  extends ICustomer,
    IInternalDebt,
    IInternalDebtProduct,
    IProduct {}

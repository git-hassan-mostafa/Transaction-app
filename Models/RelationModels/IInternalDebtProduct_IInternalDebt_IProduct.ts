import IInternalDebtProduct from "../InternalDebts/IInternalDebtProduct";
import IInternalDebt from "../InternalDebts/IInternalDebts";
import IProduct from "../Products/IProduct";

export default interface IInternalDebtProduct_IInternalDebt_IProduct
  extends IInternalDebtProduct,
    IInternalDebt,
    IProduct {}

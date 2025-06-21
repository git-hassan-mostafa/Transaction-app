import InternalDebt from "../InternalDebt";
import InternalDebtProduct from "../InternalDebtProduct";
import Product from "../Product";

export default interface InternalDebtProduct_InternalDebt_Product
  extends InternalDebtProduct,
    InternalDebt,
    Product {}

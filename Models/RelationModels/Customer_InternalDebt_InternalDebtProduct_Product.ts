import Customer from "../Customer";
import InternalDebt from "../InternalDebt";
import InternalDebtProduct from "../InternalDebtProduct";
import Product from "../Product";

export default interface Customer_InternalDebt_InternalDebtProduct_Product
  extends Customer,
    InternalDebt,
    InternalDebtProduct,
    Product {}

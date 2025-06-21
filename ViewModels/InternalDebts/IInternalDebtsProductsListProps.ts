import IDropDownItem from "@/Global/Types/IDropDownItem";
import IInternalDebtProduct_IInternalDebt_IProduct from "../RelationModels/IInternalDebtProduct_IInternalDebt_IProduct";
import IProduct from "../Products/IProduct";

export default interface IInternalDebtsProductsListProps {
  products: IProduct[];
  dropDownItems: IDropDownItem[];
  internalDebtsProducts: IInternalDebtProduct_IInternalDebt_IProduct[];
  newInternalDebtsProduct: IInternalDebtProduct_IInternalDebt_IProduct;
  setInternalDebtsProduct: (id: number) => void;
  setNewProductQuantity: (value: string) => void;
  showAddProduct: boolean;
  handleAddProduct: () => void;
  toggleAddProduct: (value: boolean) => void;
  handleDeleteProduct: (id: number) => void;
  refreshInternalDebtsProducts?: (id: number) => Promise<void>;
}

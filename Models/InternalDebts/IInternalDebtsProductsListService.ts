import IDropDownItem from "@/Shared/Types/IDropDownItem";
import IProduct from "../Products/IProduct";
import IInternalDebtProduct from "./IInternalDebtProduct";
import IInternalDebt from "./IInternalDebts";

export default interface IInternalDebtsProductsListService {
  internalDebt: IInternalDebt;
  products: IProduct[];
  dropDownItems: IDropDownItem[];
  newInternalDebtsProduct: IInternalDebtProduct;
  setInternalDebtsProduct: (id: number) => void;
  setInternalProductQuantity: (value: string) => void;
  showAddProduct: boolean;
  handleAddProduct: () => void;
  toggleAddProduct: (value: boolean) => void;
  handleDeleteProduct: (id: number) => void;
  refreshInternalDebtsProducts?: (id: number) => Promise<void>;
}

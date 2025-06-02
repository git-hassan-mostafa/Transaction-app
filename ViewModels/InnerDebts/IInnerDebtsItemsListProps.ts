import IDropDownItem from "@/Global/Types/IDropDownItem";
import IInnerDebtItem_IInnerDebt_IItem from "../RelationModels/IInnerDebtItem_IInnerDebt_IItem";
import IProduct from "../Products/IProduct";

export default interface IInnerDebtsItemsListProps {
  items: IProduct[];
  dropDownItems: IDropDownItem[];
  innerDebtsItems: IInnerDebtItem_IInnerDebt_IItem[];
  newInnerDebtsItem: IInnerDebtItem_IInnerDebt_IItem;
  setInnerDebtsItem: (id: number) => void;
  setNewItemQuantity: (value: string) => void;
  showAddItem: boolean;
  handleAddItem: () => void;
  toggleAddItem: (value: boolean) => void;
  handleDeleteItem: (id: number) => void;
  refreshInnerDebtsItems?: (id: number) => Promise<void>;
}

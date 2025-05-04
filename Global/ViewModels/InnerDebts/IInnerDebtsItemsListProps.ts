import IDropDownItem from "@/Global/Types/IDropDownItem";
import IInnerDebtItem_IInnerDebt_IItem from "../RelationModels/IInnerDebtItem_IInnerDebt_IItem";
import IItem from "../Items/IItem";

export default interface IInnerDebtsItemsListProps {
  items: IItem[];
  dropDownItems: IDropDownItem[];
  innerDebtsItems: IInnerDebtItem_IInnerDebt_IItem[];
  newInnerDebtsItem: IInnerDebtItem_IInnerDebt_IItem;
  setInnerDebtsItem: (id: number) => void;
  setNewItemQuantity: (value: string) => void;
  showAddItem: boolean;
  handleAddItem: () => void;
  toggleAddItem: (value: boolean) => void;
  handleDeleteItem: (id: number) => void;
}

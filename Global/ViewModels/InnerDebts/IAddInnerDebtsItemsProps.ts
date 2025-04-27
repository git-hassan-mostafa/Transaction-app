import IDropDownItem from "@/Global/Types/IDropDownItem";
import InnerDebtsItemItems from "../RelationModels/IInerDebtsItemItems";

export default interface IAddInnerDebtsItemsListProps {
  items: IDropDownItem[];
  innerDebtsItems: InnerDebtsItemItems[];
  newInnerDebtsItem: InnerDebtsItemItems;
  setInnerDebtsItem: (id: number) => void;
  setNewItemPrice: (value: string) => void;
  setNewItemQuantity: (value: string) => void;
  showAddItem: boolean;
  handleAddItem: () => void;
  toggleAddItem: (value: boolean) => void;
  handleDeleteItem: () => void;
}

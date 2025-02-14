import IItem from "./IItem";

export default interface IItemFormProps {
  id: number;
  updateFromItemsList: (item: IItem) => void;
}

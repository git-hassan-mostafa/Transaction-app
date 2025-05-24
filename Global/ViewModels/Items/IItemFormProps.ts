import IItem from "./IItem";

export default interface IItemFormProps {
  id: number;
  updateFromProductsList: (item: IItem) => void;
}

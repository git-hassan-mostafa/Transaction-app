import IItem from "./IItem";

export default interface IAddItemProps {
  addToItemsList: (value: IItem) => void;
  toggleModal: () => void;
}

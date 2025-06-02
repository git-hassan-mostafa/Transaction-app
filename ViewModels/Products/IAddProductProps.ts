import IProduct from "./IProduct";

export default interface IAddItemProps {
  addToProductsList: (value: IProduct) => void;
  toggleModal: () => void;
}

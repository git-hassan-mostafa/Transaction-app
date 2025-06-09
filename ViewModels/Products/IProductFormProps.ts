import IProduct from "./IProduct";

export default interface IItemFormProps {
  id: number;
  toggleModal: () => void;
  updateFromProductsList: (item: IProduct) => void;
}

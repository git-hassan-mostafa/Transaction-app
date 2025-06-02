import IProduct from "./IProduct";

export default interface IItemFormProps {
  id: number;
  updateFromProductsList: (item: IProduct) => void;
}

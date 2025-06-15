import IProduct from "./IProduct";

export default interface IProductFormProps {
  id: number | undefined;
  toggleModal: () => void;
  updateFromProductsList: (item: IProduct) => void;
  addToProductsList: (item: IProduct) => void;
}

import IProduct from "./IProduct";

export default interface IProductFormProps {
  id: number | undefined;
  toggleModal: () => void;
  updateFromProductsList: (product: IProduct) => void;
  addToProductsList: (product: IProduct) => void;
}

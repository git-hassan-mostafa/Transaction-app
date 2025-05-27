import IProvider from "./IProvider";

export default interface IAddProviderProps {
  addToProvidersList: (value: IProvider) => void;
  toggleModal: () => void;
}

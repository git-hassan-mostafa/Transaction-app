import IProvider from "./IProvider";

export interface IProviderFormProps {
  id: number | undefined;
  toggleModal: () => void;
  updateFromProvidersList: (provider: IProvider) => void;
  addToProvidersList: (provider: IProvider) => void;
}

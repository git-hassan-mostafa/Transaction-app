import IProvider from "./IProvider";

export interface IProviderFormProps {
  id: number;
  toggleModal: () => void;
  updateFromProvidersList: (provider: IProvider) => void;
}

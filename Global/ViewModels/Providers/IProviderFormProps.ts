import IProvider from "./IProvider";

export interface IProviderFormProps {
  id: number;
  updateFromProvidersList: (provider: IProvider) => void;
}

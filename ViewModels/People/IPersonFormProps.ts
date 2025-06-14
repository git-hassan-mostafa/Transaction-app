import IPerson from "./IPerson";

export default interface IPeopleFormProps {
  id: number;
  toggleModal: () => void;
  updateFromPeopleList: (value: IPerson) => void;
}

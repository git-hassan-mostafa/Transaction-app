import IPerson from "./IPerson";

export default interface IPeopleFormProps {
  id: number | undefined;
  toggleModal: () => void;
  updateFromPeopleList: (value: IPerson) => void;
  addToPeopleList: (value: IPerson) => void;
}

import IPerson from "./IPerson";

export default interface IPeopleFormProps {
  id: number;
  updateFromPeopleList: (value: IPerson) => void;
}

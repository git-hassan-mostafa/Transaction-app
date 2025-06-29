import IPerson from "./IPerson";

export default interface IAddPeopleProps {
  addToPeopleList: (value: IPerson) => void;
  toggleModal: () => void;
}

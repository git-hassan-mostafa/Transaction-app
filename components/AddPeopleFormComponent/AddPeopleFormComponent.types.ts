import Person from "@/Global/Models/Person";

export default interface IAddPeopleProps {
  addToPeopleList: (value: Person) => void;
  toggleModal: () => void;
}

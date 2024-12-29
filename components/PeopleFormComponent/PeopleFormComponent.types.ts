import Person from "@/Global/Models/Person";

export interface IPeopleProps {
  id: number;
  deleteFromPeopleList: (id: number) => void;
  updateFromPeopleList: (value: Person) => void;
}

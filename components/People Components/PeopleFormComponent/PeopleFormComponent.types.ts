import Person from "@/Global/Models/Person";

export interface IPeopleProps {
  id: number;
  updateFromPeopleList: (value: Person) => void;
}

import DropDownItem from "@/Global/Models/Types/DropDownItem";

export default interface CustomDropDownType {
  value: string | number;
  setValue: (value: string | number) => void;
  data: DropDownItem[];
}

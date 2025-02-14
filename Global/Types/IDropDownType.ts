import IDropDownItem from "@/Global/Types/IDropDownItem";

export default interface IDropDownType {
  value: string | number;
  setValue: (value: string | number) => void;
  data: IDropDownItem[];
}

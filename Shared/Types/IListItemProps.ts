import { ReactNode } from "react";

export default interface IListItemProps {
  title: ReactNode;
  subTitle: {
    text: ReactNode;
    color: string;
  };
  subTitle2?: {
    text: ReactNode;
    color: string;
  };
  color: string;
  sign?: {
    visible: boolean;
    color: string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

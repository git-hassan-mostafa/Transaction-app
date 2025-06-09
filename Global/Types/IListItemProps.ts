export default interface IListItemProps {
  title: string;
  subTitle: {
    text: string;
    color: string;
  };
  subTitle2?: {
    text: string;
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

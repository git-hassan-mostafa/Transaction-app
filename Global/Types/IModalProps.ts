export default interface IModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
}

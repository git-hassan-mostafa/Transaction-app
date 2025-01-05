export default interface CustomModalProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

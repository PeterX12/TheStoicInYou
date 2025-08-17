import { Modal } from "react-native";

interface InfoModalProps {
  isVisible: boolean;
  onClose?: () => void;
  title: string;
  content: string;
  showCloseButton?: boolean;
}

const InfoModal = ({
  isVisible,
  onClose,
  title,
  content,
  showCloseButton = true,
}: InfoModalProps) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    ></Modal>
  );
};

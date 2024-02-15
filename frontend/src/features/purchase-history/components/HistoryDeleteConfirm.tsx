import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  historyId: number;
  onClickDeleteButton: () => void;
};

function HistoryDeleteConfirm({ isOpen, onClose, onClickDeleteButton }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>購入履歴の削除</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>購入履歴を削除しますか？</p>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            キャンセル
          </Button>
          <Button colorScheme="red" onClick={onClickDeleteButton}>
            削除
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export { HistoryDeleteConfirm };

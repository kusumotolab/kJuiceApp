import { useRef } from "react";
import { Item, Member } from "types";

import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useToast,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: Item | null;
  selectedMember: Member | null;
  purchaseItem: () => void;
};

function PopUpMenu({
  isOpen,
  onClose,
  selectedItem,
  selectedMember,
  purchaseItem
}: Props) {
  const toast = useToast();
  const cancelRef = useRef<HTMLButtonElement>(null);

  function showToast() {
    toast({
      title: "購入完了",
      description: "購入が完了しました",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>{selectedMember?.name + "さん"}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          {selectedItem?.name + "を購入しますか？"}
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button
            colorScheme="teal"
            variant="outline"
            ref={cancelRef}
            onClick={onClose}
          >
            キャンセル
          </Button>
          <Button
            colorScheme="teal"
            variant="solid"
            onClick={() => {
              purchaseItem();
              showToast();
              onClose();
            }}
            ml="3"
          >
            購入
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { PopUpMenu };

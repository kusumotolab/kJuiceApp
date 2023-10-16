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
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: Item | undefined;
  selectedMember: Member | undefined;
  purchaseItem: () => void;
};

function PopUpMenu({
  isOpen,
  onClose,
  selectedItem,
  selectedMember,
  purchaseItem,
}: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null);

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

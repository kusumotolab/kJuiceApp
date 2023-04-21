import "./PopUpMenu.css";
import { Backend } from "util/Backend";
import { Dispatch, SetStateAction, useRef } from "react";
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
  imgSrc: string;
  selectedItem: Item | null;
  setSumPurchased: Dispatch<SetStateAction<number>>;
  selectedMember: Member | null;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  update: boolean;
};

function PopUpMenu({
  isOpen,
  onClose,
  selectedItem,
  setSumPurchased,
  selectedMember,
}: Props) {
  const toast = useToast();
  const cancelRef = useRef<HTMLButtonElement>(null);

  async function purchaseItem() {
    if (selectedMember === null || selectedItem === null) {
      return;
    }

    if (!(await Backend.purchase(selectedMember.id, selectedItem.id)))
      console.error("purchaseItem: failed");

    setSumPurchased((prev) => prev + 1);
  }

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
        <AlertDialogHeader>
          {selectedMember?.displayName + "さん"}
        </AlertDialogHeader>
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
              onClose.call(null);
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

import "./PopUpMenu.css";
import styled from "styled-components";
import { SelectCancelPurchaseButtonPane } from "./component/SelectCancelPurchaseButtonPane";
import { UserInformationPane } from "./component/UserInformationPane";
import { ItemInformationPane } from "./component/ItemInformationPane";
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
} from '@chakra-ui/react'

type Props = {
  isOpen: boolean;
  onClose: () => void;
  setPopUpVisibility: Dispatch<SetStateAction<boolean>>;
  imgSrc: string;
  selectedItem: Item | null;
  setSumPurchased: Dispatch<SetStateAction<number>>;
  selectedMember: Member | null;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  update: boolean;
  setShowCompleteMessage: Dispatch<SetStateAction<boolean>>;
};

function PopUpMenu({
  isOpen,
  onClose,
  setPopUpVisibility,
  imgSrc,
  selectedItem,
  setSumPurchased,
  selectedMember,
  setUpdate,
  update,
  setShowCompleteMessage,
}: Props) {

  const cancelRef = useRef<HTMLButtonElement>(null);

  async function purchaseItem() {
    if (selectedMember === null || selectedItem === null) {
      return;
    }

    if (!(await Backend.purchase(selectedMember.name, selectedItem.name)))
      console.error("purchaseItem: failed");

    setSumPurchased((prev) => prev + 1);
  }

  function closePopUp() {
    setPopUpVisibility(false);
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
            <AlertDialogHeader>〇〇さん</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
                を購入しますか？
            </AlertDialogBody>
            <AlertDialogFooter>
                <Button colorScheme="teal" variant="outline" ref={cancelRef} onClick={onClose}>キャンセル</Button>
                <Button colorScheme="teal" variant="solid" onClick={onClose} ml="3">購入</Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    // <Background>
    //   {/* 2段階でvisibilityを設定している
    //   このコンポーネント自体を表示するかしないかで分岐するべき */}
    //   <div className={`popup-menu ${visibility ? "visible" : "hidden"}`}>
    //     <UserInformationPane selectedMember={selectedMember} />
    //     <ItemInformationPane imgSrc={imgSrc} selectedItem={selectedItem} />
    //     <SelectCancelPurchaseButtonPane
    //       purchaseItem={purchaseItem}
    //       selectedMember={selectedMember}
    //       selectedItem={selectedItem}
    //       setSumPurchased={setSumPurchased}
    //       closePopUp={closePopUp}
    //       setUpdate={setUpdate}
    //       update={update}
    //       setShowCompleteMessage={setShowCompleteMessage}
    //     />
    //   </div>
    // </Background>
  );
}

export { PopUpMenu };

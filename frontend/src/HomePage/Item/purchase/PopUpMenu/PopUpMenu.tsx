import "./PopUpMenu.css";
import styled from "styled-components";
import { SelectCancelPurchaseButtonPane } from "./component/SelectCancelPurchaseButtonPane";
import { UserInformationPane } from "./component/UserInformationPane";
import { ItemInformationPane } from "./component/ItemInformationPane";
import { Backend } from "util/Backend";
import { Dispatch, SetStateAction } from "react";
import { Item, Member } from "types";

type Props = {
  visibility: boolean;
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
  visibility,
  setPopUpVisibility,
  imgSrc,
  selectedItem,
  setSumPurchased,
  selectedMember,
  setUpdate,
  update,
  setShowCompleteMessage,
}: Props) {
  const Background = styled.div`
    position: fixed;
    inset: 0;
    margin: auto;
    visibility: ${visibility ? "visible" : "hidden"};
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
  `;

  async function purchaseItem() {
    if (selectedMember === null || selectedItem === null) {
      return;
    }

    if (!(await Backend.purchase(selectedMember.id, selectedItem.id)))
      console.error("purchaseItem: failed");

    setSumPurchased((prev) => prev + 1);
  }

  function closePopUp() {
    setPopUpVisibility(false);
  }

  return (
    <Background>
      {/* 2段階でvisibilityを設定している
      このコンポーネント自体を表示するかしないかで分岐するべき */}
      <div className={`popup-menu ${visibility ? "visible" : "hidden"}`}>
        <UserInformationPane selectedMember={selectedMember} />
        <ItemInformationPane imgSrc={imgSrc} selectedItem={selectedItem} />
        <SelectCancelPurchaseButtonPane
          purchaseItem={purchaseItem}
          selectedMember={selectedMember}
          selectedItem={selectedItem}
          setSumPurchased={setSumPurchased}
          closePopUp={closePopUp}
          setUpdate={setUpdate}
          update={update}
          setShowCompleteMessage={setShowCompleteMessage}
        />
      </div>
    </Background>
  );
}

export { PopUpMenu };

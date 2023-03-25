import "./PopUpMenu.css";
import styled from "styled-components";
import SelectCancelPurchaseButtonPane from "./component/SelectCancelPurchaseButtonPane";
import UserInformationPane from "./component/UserInformationPane";
import ItemInformationPane from "./component/ItemInformationPane";
import { Backend } from "util/Backend";

const purchaseItem = async (
  selectedMember: string,
  selectedItem: string,
  setSumPurchased
) => {
  if (selectedMember === null) {
    return;
  }

  if (!(await Backend.purchase(selectedMember, selectedItem)))
    console.error("purchaseItem: failed");

  setSumPurchased((prev) => prev + 1);
};

function PopUpMenu({
  visibility,
  setPopUpVisivility,
  imgSrc,
  selectedItem,
  setSumPurchased,
  selectedMember,
  setUpdate,
  update,
  setShowCompleteMessage,
}) {
  const Background = styled.div`
    position: fixed;
    inset: 0;
    margin: auto;
    visibility: ${visibility ? "visible" : "hidden"};
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
  `;

  const closePopUp = () => {
    setPopUpVisivility(false);
  };

  return (
    <Background>
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

export default PopUpMenu;

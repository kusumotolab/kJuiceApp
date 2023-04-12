import { Dispatch, SetStateAction, useState } from "react";
import { FoodPane } from "./Food/FoodPane";
import { JuicePane } from "./Juice/JuicePane";
import { HistoryPane } from "../History/HistoryPane";
import { PopUpMenu } from "./purchase/PopUpMenu/PopUpMenu";

import LogoCola from "./../../image/logo_coca_cora.jpg";
import LogoFanta from "./../../image/logo_fanta.jpg";
import LogoWater from "./../../image/logo_water.jpeg";
import LogoGogoTea from "./../../image/logo_tea.jpeg";
import LogoPotechi from "./../../image/logo_potechi.jpeg";
import LogoDagashi from "./../../image/logo_dagashi.jpeg";
import { MemberInformation } from "./MemberInformation/MemberInformation";
import styled from "styled-components";
import { CompleteMessage } from "./purchase/CompleteMessage/completeMessage";
import { Item, LogoDictionary, Member } from "types";

type Props = {
  setSelectedItem: Dispatch<SetStateAction<Item | null>>;
  selectedItem: Item | null;
  juiceList: Item[];
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  foodList: Item[];
  selectedMember: Member | null;
  setSumPurchased: Dispatch<SetStateAction<number>>;
};

function ItemPane({
  setSelectedItem,
  selectedItem,
  juiceList,
  update,
  setUpdate,
  foodList,
  selectedMember,
  setSumPurchased,
}: Props) {
  const [isPopupVisible, setPopUpVisibility] = useState(false);
  const [showCompleteMessage, setShowCompleteMessage] = useState(false);

  const logoDictionary: LogoDictionary = {
    CocaCola: LogoCola,
    Fanta: LogoFanta,
    Water: LogoWater,
    GogoTea: LogoGogoTea,
    PotatoChips: LogoPotechi,
    Dagashi: LogoDagashi,
  };

  return (
    <MainItemPane>
      <MemberInformation selectedMember={selectedMember} />
      <JuicePane
        setSelectedItem={setSelectedItem}
        setPopUpVisibility={setPopUpVisibility}
        selectedMember={selectedMember}
        juiceList={juiceList}
        logoDictionary={logoDictionary}
      />
      <FoodPane
        setSelectedItem={setSelectedItem}
        setPopUpVisibility={setPopUpVisibility}
        selectedMember={selectedMember}
        foodList={foodList}
        logoDictionary={logoDictionary}
      />
      <HistoryPane selectedMember={selectedMember} />
      <PopUpMenu
        visibility={isPopupVisible}
        setPopUpVisibility={setPopUpVisibility}
        imgSrc={
          logoDictionary[selectedItem === null ? "CocaCola" : selectedItem.id]
        }
        selectedItem={selectedItem}
        setSumPurchased={setSumPurchased}
        selectedMember={selectedMember}
        setUpdate={setUpdate}
        update={update}
        setShowCompleteMessage={setShowCompleteMessage}
      />
      <CompleteMessage show={showCompleteMessage} />
    </MainItemPane>
  );
}

const MainItemPane = styled.div`
  width: 70%;
  height: 90vh;
  border-width: 2px;
  border-color: black;
  border: solid 1px #333;
  margin: 5px;
  overflow-y: scroll;
`;

export { ItemPane };

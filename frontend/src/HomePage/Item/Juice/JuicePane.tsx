import { ItemCard } from "../component/ItemCard";
import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";
import { Item, LogoDictionary, Member } from "types";

type Props = {
  juiceList: Item[];
  selected?: boolean;
  setSelectedItem: Dispatch<SetStateAction<Item | null>>;
  selectedMember: Member | null;
  setPopUpVisibility: Dispatch<SetStateAction<boolean>>;
  logoDictionary: LogoDictionary;
};

function JuicePane({
  juiceList,
  selected,
  setSelectedItem,
  selectedMember,
  setPopUpVisibility,
  logoDictionary,
}: Props) {
  return (
    <JuicePaneMain>
      <CategoryName>ジュース</CategoryName>
      <JuicePaneContent>
        {juiceList
          // .sort((a, b) => -a.salesFigure + b.salesFigure)
          .map((juice) => {
            return (
              <ItemCard
                color={selected ? "#121258" : "#FFC039"}
                onClick={() => {
                  setSelectedItem(juice);
                  if (selectedMember !== null) {
                    setPopUpVisibility(true);
                  }
                }}
                name={juice.name}
                item={juice}
                imgSrc={logoDictionary[juice.id]}
                key={juice.id}
              />
            );
          })}
      </JuicePaneContent>
    </JuicePaneMain>
  );
}

const JuicePaneContent = styled.div`
  overflow-x: scroll;
  display: flex;
  width: 100%;
  height: 85%;
  border: solid 1px black;
  margin-bottom: 1em;
  background-color: #787878;
`;

const JuicePaneMain = styled.div`
  height: 20em;
  margin-bottom: 1em;
`;

const CategoryName = styled.div`
  background-color: #303030;
  color: greenyellow;
  font-weight: bold;
  font-size: 2em;
`;

export { JuicePane };

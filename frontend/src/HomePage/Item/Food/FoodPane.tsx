import { ItemCard } from "../component/ItemCard";
import styled from "styled-components";
import { Item, LogoDictionary, Member } from "types";
import { Dispatch, SetStateAction } from "react";

type Props = {
  foodList: Item[];
  setSelectedItem: Dispatch<SetStateAction<Item>>;
  selectedMember: Member | null;
  setPopUpVisibility: Dispatch<SetStateAction<boolean>>;
  logoDictionary: LogoDictionary;
};

function FoodPane({
  foodList,
  setSelectedItem,
  selectedMember,
  setPopUpVisibility,
  logoDictionary,
}: Props) {
  return (
    <FoodPaneMain>
      <CategoryName>食品</CategoryName>
      <FoodPaneContent>
        {foodList.map((food) => {
          return (
            <ItemCard
              color="#FFC039"
              onClick={() => {
                setSelectedItem(food);
                if (selectedMember !== null) {
                  setPopUpVisibility(true);
                }
              }}
              name={food.name}
              item={food}
              imgSrc={logoDictionary[food.id]}
              key={food.id}
            />
          );
        })}
      </FoodPaneContent>
    </FoodPaneMain>
  );
}

const CategoryName = styled.div`
  background-color: #303030;
  color: greenyellow;
  font-weight: bold;
  font-size: 2em;
`;

const FoodPaneContent = styled.div`
  overflow-x: scroll;
  display: flex;
  width: 100%;
  height: 85%;
  border: solid 1px black;
  margin-bottom: 1em;
  background-color: #787878;
`;

const FoodPaneMain = styled.div`
  height: 20em;
  margin-bottom: 1em;
`;

export { FoodPane };

import "./ItemCard.css";
import styled from "styled-components";
import { Item } from "types";

type Props = {
  color: string;
  name: string;
  item: Item;
  onClick: () => void;
  imgSrc: string;
};

function ItemCard({ name, onClick, imgSrc, item }: Props) {
  return (
    <ItemCardPane onClick={onClick}>
      <div className="square">
        <img src={imgSrc} alt={name} />
      </div>
      <span>{name + " " + item.sellingPrice + "円"}</span>
    </ItemCardPane>
  );
}

const ItemCardPane = styled.button`
  background-color: #cabda1;
  padding: 1rem;
  display: grid;
  border: 0px;
  border-radius: 10px;
  grid-template-columns: 100%;
  grid-template-rows: 80% 20%;
  font-size: 1.5em;
  margin-left: 0.5em;
  margin-right: 0.5em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  flex-shrink: 0;
  font-size: 1.2em;
  width: 11em;
`;

export { ItemCard };

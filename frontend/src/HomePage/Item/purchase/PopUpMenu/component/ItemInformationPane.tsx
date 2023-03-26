import styled from "styled-components";
import { Item } from "types";

type Props = {
  imgSrc: string;
  selectedItem: Item | null;
};

function ItemInformationPane({ imgSrc, selectedItem }: Props) {
  return (
    <ItemInfo>
      <ItemImage src={imgSrc} />
      <div style={{ marginRight: "1em" }}>
        {selectedItem === null ? "hoge" : selectedItem.name}
      </div>
      <div>{selectedItem === null ? "hoge" : selectedItem.sellingPrice}円</div>
    </ItemInfo>
  );
}

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1em;
  margin-bottom: 1em;
`;

const ItemImage = styled.img`
  width: 2em;
  height: 2em;
  border-radius: 50%;
`;

export { ItemInformationPane };

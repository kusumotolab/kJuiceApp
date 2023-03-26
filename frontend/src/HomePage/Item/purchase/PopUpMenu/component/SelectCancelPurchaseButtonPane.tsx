import { Button } from "../../../../../component/Button";
import styled from "styled-components";
import { Item, Member } from "types";
import { Dispatch, SetStateAction } from "react";

type Props = {
  purchaseItem: () => Promise<void>;
  selectedMember: Member | null;
  selectedItem: Item | null;
  setSumPurchased: Dispatch<SetStateAction<number>>;
  closePopUp: () => void;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  update: boolean;
  setShowCompleteMessage: Dispatch<SetStateAction<boolean>>;
};

function SelectCancelPurchaseButtonPane({
  purchaseItem,
  selectedItem,
  setSumPurchased,
  closePopUp,
  setUpdate,
  update,
  setShowCompleteMessage,
}: Props) {
  return (
    <SelectButtonPane>
      <ButtonPane>
        <Button
          border="solid 1px black"
          color="gray"
          height="2em"
          width="40%"
          onClick={() => closePopUp()}
          radius="0.2em"
          fontColor="white"
          fontSize="0.7em"
        >
          <div>キャンセル</div>
        </Button>
      </ButtonPane>
      <ButtonPane>
        <Button
          border="solid 1px black"
          color="darkred"
          height="2em"
          width="40%"
          onClick={() => {
            purchaseItem();
            closePopUp();
            setSumPurchased(selectedItem?.salesFigure ?? 0 + 1);
            setUpdate(!update);
            setShowCompleteMessage(true);
            setTimeout(() => {
              setShowCompleteMessage(false);
            }, 2100);
          }}
          radius="0.2em"
          fontColor="white"
          fontSize="0.7em"
        >
          <div>購入</div>
        </Button>
      </ButtonPane>
    </SelectButtonPane>
  );
}

const SelectButtonPane = styled.div`
  vertical-align: bottom;
`;

const ButtonPane = styled.div`
  margin-left: 0.5em;
  margin-right: 0.5em;
  display: inline;
`;

export { SelectCancelPurchaseButtonPane };

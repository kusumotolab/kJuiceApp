import styled from "styled-components";
import { History } from "types";
import { CancelButton } from "./cancell/CancelButton";

type Props = {
  history: History;
  updateHistory: () => void;
};

function HistoryCard({ history, updateHistory }: Props) {
  return (
    <HistoryCardPane>
      <HistoryCardDate>{history.date}</HistoryCardDate>
      <HistoryCardItem>{history.itemName}</HistoryCardItem>
      <HistoryCardMoney>{history.price}円</HistoryCardMoney>
      <CancelButton updateHistory={updateHistory} history={history} />
    </HistoryCardPane>
  );
}

const HistoryCardPane = styled.div`
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: rgb(180, 180, 180);
  height: 2em;
  font-size: 1em;
  display: flex;
  margin: 0.5em 0em 0.5em 0em;
`;

const HistoryCardDate = styled.div`
  margin-left: 1em;
  width: 50%;
  padding: 0.5em 0;
`;

const HistoryCardItem = styled.div`
  margin-left: 2em;
  width: 15%;
  padding: 0.5em 0;
`;

const HistoryCardMoney = styled.div`
  margin-left: 2em;
  width: 15%;
  padding: 0.5em 0;
`;

export { HistoryCard };

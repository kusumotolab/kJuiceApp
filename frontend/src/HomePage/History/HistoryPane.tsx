import { useEffect, useState } from "react";
import { HistoryCard } from "./card/HistoryCard";
import styled from "styled-components";
import { History, Member } from "types";
import { Backend } from "util/Backend";

type Props = {
  selectedMember: Member | null;
};

function HistoryPane({ selectedMember }: Props) {
  const [histories, setHistories] = useState<History[]>([]);

  const fetchHistoryData = async () => {
    if (selectedMember === null) {
      setHistories([]);
      return;
    }

    const histories = await Backend.getUserHistory(selectedMember.id);

    if (histories === null) {
      console.error("fetchHistoryData: failed");
      return;
    }

    setHistories(histories);
  };

  function updateHistory() {
    fetchHistoryData();
  }

  useEffect(() => {
    fetchHistoryData();
  }, [selectedMember]);

  return (
    <MainHistoryPane>
      <CategoryName>購入履歴</CategoryName>
      {histories.map((history) => (
        <HistoryCard
          history={history}
          updateHistory={updateHistory}
          key={history.historyId}
        />
      ))}
    </MainHistoryPane>
  );
}

const MainHistoryPane = styled.div`
  width: 100%;
  border: solid 1px black;
  overflow-y: scroll;
  overflow-x: hidden;
`;
const CategoryName = styled.div`
  background-color: #303030;
  color: greenyellow;
  font-weight: bold;
  font-size: 2em;
`;

export { HistoryPane };

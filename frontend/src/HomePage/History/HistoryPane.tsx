import { useEffect, useState } from "react";
import { HistoryCard } from "./card/HistoryCard";
import styled from "styled-components";
import { History, Member } from "types";
import { Backend } from "util/Backend";
import { Box, Heading } from "@chakra-ui/react";

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

    const histories = await Backend.getUserHistory(selectedMember.name);

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
    <Box>
      <Heading>購入履歴</Heading>
      {histories.map((history) => (
        <HistoryCard
          history={history}
          updateHistory={updateHistory}
          key={history.id}
        />
      ))}
    </Box>
  );
}

export { HistoryPane };

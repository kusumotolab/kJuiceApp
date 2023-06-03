import { useEffect, useState } from "react";
import { HistoryCard } from "./card/HistoryCard";
import { History, Member } from "types";
import { Backend } from "util/Backend";
import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

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

    setHistories(histories.reverse());
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
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>日付</Th>
              <Th>商品</Th>
              <Th>金額</Th>
              <Th>キャンセル</Th>
            </Tr>
          </Thead>
          <Tbody>
            {histories.map((history) => (
              <HistoryCard
                history={history}
                updateHistory={updateHistory}
                key={history.historyId}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export { HistoryPane };

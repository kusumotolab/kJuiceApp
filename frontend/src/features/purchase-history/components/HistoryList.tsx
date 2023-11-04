import { Center, Heading, Text } from "@chakra-ui/react";
import { useMembers } from "contexts/MembersContext";
import { useEffect, useState } from "react";
import { Member, History } from "types";
import { Backend } from "util/Backend";
import { HistoryCard } from "./HistoryCard";

function HistoryList({ selectedMemberId }: { selectedMemberId: string }) {
  const [histories, setHistories] = useState<History[]>([]);
  const members = useMembers();
  const selectedMember = members.find(
    (member: Member) => member.id === selectedMemberId,
  );

  function deleteHistory(history: History) {
    setHistories(histories.filter((h) => h.historyId !== history.historyId));
  }

  useEffect(() => {
    async function fetchHistories() {
      if (selectedMember === undefined) {
        setHistories([]);
        return;
      }

      const histories = await Backend.getUserHistory(selectedMember.id);
      if (histories === null) {
        console.error("getUserHistory: failed");
        return;
      }

      setHistories(histories);
    }

    fetchHistories();
  }, [selectedMemberId]);

  if (selectedMemberId === "") {
    return (
      <Center h="100%">
        <Heading size="md" textColor="gray">
          利用者を選択してください
        </Heading>
      </Center>
    );
  }

  if (histories.length === 0) {
    return (
      <Center>
        <Text size="md" textColor="gray">
          購入履歴がありません
        </Text>
      </Center>
    );
  }

  return (
    <>
      {histories.map((history) => (
        <HistoryCard
          key={history.historyId}
          history={history}
          deleteHistory={deleteHistory} 
        />
      ))}
    </>
  );
}

export { HistoryList };

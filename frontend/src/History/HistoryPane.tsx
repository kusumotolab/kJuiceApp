import { useEffect, useState } from "react";
import { HistoryCard } from "./card/HistoryCard";
import { History, Member } from "types";
import { Backend } from "util/Backend";
import { Center, Heading, Text } from "@chakra-ui/react";
import { TwoColumnLayout } from "layout/TwoColumnLayout";
import { MemberPane } from "HomePage/Member/MemberPane";

function HistoryPaneContents({
  selectedMember,
}: {
  selectedMember: Member | null;
}) {
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

  if (selectedMember === null) {
    return (
      <Center h="100%">
        <Heading size="md" textColor="gray">利用者を選択してください</Heading>
      </Center>
    );
  }

  if (histories.length === 0) {
    return (
      <Center>
        <Text size="md" textColor="gray">購入履歴がありません</Text>
      </Center>
    );
  }

  return (
    <>
      {histories.map((history) => (
        <HistoryCard
          key={history.historyId}
          history={history}
          updateHistory={updateHistory}
        />
      ))}
    </>
  );
}

function HistoryPane() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  return (
    <TwoColumnLayout
      h="calc(100vh - 60px)"
      menu={
        <MemberPane
          selectedMember={selectedMember}
          handleClickMemberCard={(member) => setSelectedMember(member)}
        />
      }
    >
      <Heading size="md" mb={4}>
        購入履歴
      </Heading>
      <HistoryPaneContents selectedMember={selectedMember} />
    </TwoColumnLayout>
  );
}

export { HistoryPane };

import { Center, Heading, Text } from "@chakra-ui/react";
import { History } from "types";
import { HistoryCard } from "./HistoryCard";

type Props = {
  histories: History[];
  isMemberSelected: boolean;
  onDeleteHistory: (history: History) => void;
};

function HistoryList({ histories, isMemberSelected, onDeleteHistory }: Props) {

  if (isMemberSelected === false) {
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
          onDeleteHistory={onDeleteHistory}
        />
      ))}
    </>
  );
}

export { HistoryList };

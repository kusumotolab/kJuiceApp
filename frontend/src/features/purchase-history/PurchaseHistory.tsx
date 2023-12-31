import { useEffect, useState } from "react";
import { Heading } from "@chakra-ui/react";
import {
  LeftColumn,
  RightColumn,
  TwoColumnLayout,
} from "components/TwoColumnLayout";
import { MemberPane } from "components/MemberPane";
import { HistoryList } from "./components/HistoryList";
import { Backend } from "util/Backend";
import { History } from "types";
import { useMembersDispatch } from "contexts/MembersContext";

function PurchaseHistory() {
  const [selectedMemberId, setSelectedMemberId] = useState<string>("");
  const [histories, setHistories] = useState<History[]>([]);
  const dispatch = useMembersDispatch();

  async function fetchHistories(memberId: string) {
    const histories = await Backend.getUserHistory(memberId);
    if (histories === null) {
      console.error("getUserHistory: failed");
      return;
    }
    setHistories(histories);
  }

  async function deleteHistory(history: History) {
    if (!(await Backend.recall(history.historyId))) {
      console.error("recall: failed");
      return;
    }

    // memberの利用金額を更新
    dispatch({
      type: "purchaseCanceled",
      id: history.memberId,
      price: history.price,
    });

    // historyを更新
    setHistories(histories.filter((h) => h.historyId !== history.historyId));
  }

  return (
    <TwoColumnLayout>
      <LeftColumn>
        <MemberPane
          selectedMemberId={selectedMemberId}
          onClickMemberCard={(memberId) => {
            setSelectedMemberId(memberId);
            fetchHistories(memberId);
          }}
        />
      </LeftColumn>
      <RightColumn>
        <Heading size="md" mb={4}>
          購入履歴
        </Heading>
        <HistoryList
          histories={histories}
          isMemberSelected={selectedMemberId !== ""}
          onDeleteHistory={(history) => deleteHistory(history)}
        />
      </RightColumn>
    </TwoColumnLayout>
  );
}

export { PurchaseHistory };

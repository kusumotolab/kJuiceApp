import { useState } from "react";
import { Heading } from "@chakra-ui/react";
import {
  LeftColumn,
  RightColumn,
  TwoColumnLayout,
} from "components/TwoColumnLayout";
import { MemberPane } from "components/MemberPane";
import { HistoryList } from "./components/HistoryList";

function PurchaseHistory() {
  const [selectedMemberId, setSelectedMemberId] = useState<string>("");

  return (
    <TwoColumnLayout>
      <LeftColumn>
        <MemberPane
          selectedMemberId={selectedMemberId}
          onClickMemberCard={(memberId: string) =>
            setSelectedMemberId(memberId)
          }
        />
      </LeftColumn>
      <RightColumn>
        <Heading size="md" mb={4}>
          購入履歴
        </Heading>
        <HistoryList selectedMemberId={selectedMemberId} />
      </RightColumn>
    </TwoColumnLayout>
  );
}

export { PurchaseHistory };

import { useState } from "react";
import {
  TwoColumnLayout,
  LeftColumn,
  RightColumn,
} from "components/TwoColumnLayout";
import { ItemPane } from "./components/ItemPane";
import { MemberPane } from "components/MemberPane";
import { ConfrimPane } from "./components/ConfirmPane";

function Home() {
  const [selectedItemId, setSelectedItemId] = useState<string>("");
  const [selectedMemberId, setSelectedMemberId] = useState<string>("");

  return (
    <>
      <TwoColumnLayout h="calc(100% - 96px)">
        <LeftColumn>
          <MemberPane
            selectedMemberId={selectedMemberId}
            onClickMemberCard={(memberId: string) =>
              setSelectedMemberId(memberId)
            }
          />
        </LeftColumn>
        <RightColumn>
          <ItemPane
            selectedItemId={selectedItemId}
            onClickItemCard={(id: string) => setSelectedItemId(id)}
          />
        </RightColumn>
      </TwoColumnLayout>
      <ConfrimPane
        selectedMemberId={selectedMemberId}
        clearMemberSelection={() => setSelectedMemberId("")}
        selectedItemId={selectedItemId}
        clearItemSelection={() => setSelectedItemId("")}
      />
    </>
  );
}

export { Home };

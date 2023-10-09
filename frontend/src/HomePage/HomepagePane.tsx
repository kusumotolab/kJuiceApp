import { useContext, useState } from "react";
import { ItemPane } from "./Item/ItemPane";
import { MemberPane } from "./Member/MemberPane";
import { Item, Member } from "types";
import { TabIndex } from "App";
import { ConfirmPane } from "./ConfirmPane";
import { TwoColumnLayout } from "layout/TwoColumnLayout";

function HomepagePane() {
  // TODO: tabIndexが変更された際にMemberPaneとItemPaneを再取得する
  // もっといい方法があるはず
  const tabIndex = useContext(TabIndex);

  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <>
      <TwoColumnLayout
        h="calc(100vh - (64px + 96px))"
        menu={
          <MemberPane
            selectedMember={selectedMember}
            handleClickMemberCard={(member) => setSelectedMember(member)}
          />
        }
      >
        <ItemPane
          selectedItem={selectedItem}
          handleClickItemCard={(item) => setSelectedItem(item)}
        />
      </TwoColumnLayout>
      <ConfirmPane
        selectedMember={selectedMember}
        selectedItem={selectedItem}
        clearMemberSelection={() => setSelectedMember(null)}
        clearItemSelection={() => setSelectedItem(null)}
      />
    </>
  );
}

export { HomepagePane };

import { Dispatch, SetStateAction } from "react";
import { Member } from "types";
import { MemberPanePerAttribute } from "./component/MemberPanePerAttribute";

type Props = {
  selectedMember: Member | null;
  setSelectedMember: Dispatch<SetStateAction<Member | null>>;
  memberList: Member[];
};

function MemberPane({ selectedMember, setSelectedMember, memberList }: Props) {
  return (
    <>
      <MemberPanePerAttribute
        description="先生"
        attribute="teacher"
        memberList={memberList}
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
      />
      <MemberPanePerAttribute
        description="M2"
        attribute="m2"
        memberList={memberList}
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
      />
      <MemberPanePerAttribute
        description="M1"
        attribute="m1"
        memberList={memberList}
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
      />
      <MemberPanePerAttribute
        description="B4"
        attribute="b4"
        memberList={memberList}
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
      />
    </>
  );
}

export { MemberPane };

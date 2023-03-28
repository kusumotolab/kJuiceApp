import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { Member } from "types";
import { MemberPanePerAttribute } from "./component/MemberPanePerAttribute";

type Props = {
  selectedMember: Member | null;
  setSelectedMember: Dispatch<SetStateAction<Member | null>>;
  memberList: Member[];
};

function MemberPane({ selectedMember, setSelectedMember, memberList }: Props) {
  return (
    <MainMemberPane>
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
    </MainMemberPane>
  );
}

const MainMemberPane = styled.div`
  overflow: scroll;
  width: 30%;
  height: 90vh;
  border-width: 2px;
  border-color: black;
  border: solid 1px #333;
  margin: 5px;

  background-color: rgb(47, 47, 47);
  color: greenyellow;
`;

export { MemberPane };

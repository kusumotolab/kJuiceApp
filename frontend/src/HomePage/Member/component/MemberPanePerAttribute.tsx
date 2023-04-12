import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { Member } from "types";
import { MemberCard } from "./MemberCard";

type Props = {
  description: string;
  attribute: string;
  memberList: Member[];
  selectedMember: Member | null;
  setSelectedMember: Dispatch<SetStateAction<Member | null>>;
};

function MemberPanePerAttribute({
  description,
  attribute,
  memberList,
  selectedMember,
  setSelectedMember,
}: Props) {
  return (
    <div>
      <Attribute>{description}</Attribute>
      {memberList
        .filter((member) => member.attribute == attribute)
        .sort((a, b) => {
          if (a.id > b.id) {
            return 1;
          } else {
            return -1;
          }
        })
        .map((member) => (
          <MemberCard
            selected={
              selectedMember !== null && selectedMember.id === member.id
            }
            member={member}
            setSelectedMember={setSelectedMember}
            key={member.id}
          />
        ))}
    </div>
  );
}

const Attribute = styled.div`
  width: 100%;
  margin-top: 1em;
`;

export { MemberPanePerAttribute };

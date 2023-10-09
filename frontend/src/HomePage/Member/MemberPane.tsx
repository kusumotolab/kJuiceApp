import useMembers from "hooks/useMembers";
import { Dispatch, SetStateAction } from "react";
import { Member } from "types";
import { MemberPanePerAttribute } from "./component/MemberPanePerAttribute";

type Props = {
  selectedMember: Member | null;
  handleClickMemberCard: (member: Member) => void;
};

function MemberPane({ selectedMember, handleClickMemberCard }: Props) {
  const members = useMembers();

  const attributes = [
    { description: "先生", attribute: "teacher" },
    { description: "M2", attribute: "m2" },
    { description: "M1", attribute: "m1" },
    { description: "B4", attribute: "b4" },
  ];

  return (
    <>
      {attributes.map((attribute) => (
        <MemberPanePerAttribute
          key={attribute.attribute}
          description={attribute.description}
          attribute={attribute.attribute}
          members={members}
          selectedMember={selectedMember}
          handleClickMemberCard={handleClickMemberCard}
        />
      ))}
    </>
  );
}

export { MemberPane };

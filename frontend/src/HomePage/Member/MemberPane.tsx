import { Dispatch, SetStateAction } from "react";
import { Member } from "types";
import { MemberPanePerAttribute } from "./component/MemberPanePerAttribute";

type Props = {
  selectedMember: Member | null;
  setSelectedMember: Dispatch<SetStateAction<Member | null>>;
  memberList: Member[];
};

function MemberPane({ selectedMember, setSelectedMember, memberList }: Props) {
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
          memberList={memberList}
          selectedMember={selectedMember}
          setSelectedMember={setSelectedMember}
        />
      ))}
    </>
  );
}

export { MemberPane };

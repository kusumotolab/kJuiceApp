import { Heading, Stack } from "@chakra-ui/react";
import { useMembers } from "contexts/MembersContext";
import { MemberCard } from "./MemberCard";

type Props = {
  selectedMemberId: string;
  onClickMemberCard: (id: string) => void;
};

export default function MemberPane({
  selectedMemberId,
  onClickMemberCard,
}: Props) {
  const members = useMembers();
  const attributes = [
    {
      id: 0,
      attribute: "teacher",
      name: "先生",
      members: members.filter(
        (member) => member.attribute === "teacher" && member.active === true
      ),
    },
    {
      id: 1,
      attribute: "m2",
      name: "M2",
      members: members.filter(
        (member) => member.attribute === "m2" && member.active === true
      ),
    },
    {
      id: 2,
      attribute: "m1",
      name: "M1",
      members: members.filter(
        (member) => member.attribute === "m1" && member.active === true
      ),
    },
    {
      id: 3,
      attribute: "b4",
      name: "B4",
      members: members.filter(
        (member) => member.attribute === "b4" && member.active === true
      ),
    },
  ];

  return (
    <>
      {attributes.map((attribute) => (
        <Stack key={attribute.id} spacing={4} mb={8}>
          <Heading size="md">{attribute.name}</Heading>
          {attribute.members.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              selected={member.id === selectedMemberId}
              onClick={onClickMemberCard}
            />
          ))}
        </Stack>
      ))}
    </>
  );
}

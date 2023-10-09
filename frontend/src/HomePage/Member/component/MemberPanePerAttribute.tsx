import { Dispatch, SetStateAction } from "react";
import { Member } from "types";
import { MemberCard } from "./MemberCard";
import { Stack, Heading } from "@chakra-ui/react";

type Props = {
  description: string;
  attribute: string;
  members: Member[];
  selectedMember: Member | null;
  handleClickMemberCard: Dispatch<SetStateAction<Member | null>>;
};

function MemberPanePerAttribute({
  description,
  attribute,
  members,
  selectedMember,
  handleClickMemberCard,
}: Props) {
  return (
    <Stack spacing={4} mb={8}>
      <Heading size="md">{description}</Heading>
      {members
        .filter((member) => member.active === true && member.attribute === attribute)
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
            handleClick={handleClickMemberCard}
            key={member.id}
          />
        ))}
    </Stack>
  );
}

export { MemberPanePerAttribute };

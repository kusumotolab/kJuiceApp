import { Dispatch, SetStateAction } from "react";
import { Member } from "types";
import { MemberCard } from "./MemberCard";
import { Stack, Heading } from "@chakra-ui/react";

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
    <Stack spacing={4} mb={8}>
      <Heading size="lg" color="white">
        {description}
      </Heading>
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
    </Stack>
  );
}

export { MemberPanePerAttribute };

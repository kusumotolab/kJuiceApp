import { Member } from "types";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import useMemberImage from "hooks/useMemberImage";

type Props = {
  selected: boolean;
  member: Member;
  handleClick: (member: Member) => void;
};

function MemberCard({ selected, member, handleClick }: Props) {
  const memberImage = useMemberImage(member);

  return (
    <Flex
      rounded={8}
      border="2px"
      borderColor={selected ? "teal.400" : "blackAlpha.200"}
      m={4}
      p={2}
      alignItems="center"
      onClick={() => handleClick(member)}
    >
      <Avatar src={memberImage} size="md" />
      <Text ml={4} mb={0}>
        {member.name}
      </Text>
    </Flex>
  );
}

export { MemberCard };

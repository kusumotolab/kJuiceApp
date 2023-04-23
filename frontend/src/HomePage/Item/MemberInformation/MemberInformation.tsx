import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Member } from "types";

type Props = {
  selectedMember: Member | null;
};

function MemberInformation({ selectedMember }: Props) {
  const memberName = (selectedMember?.name ?? "---") + "さん";
  const memberUnpaidAmount = "工事中";

  return (
    <Flex justifyContent="center" gap={4}>
      <Avatar size="xl" />
      <Box>
        <Heading>{memberName}</Heading>
        <Text fontSize="xl">{memberUnpaidAmount}</Text>
      </Box>
    </Flex>
  );
}

export { MemberInformation };

import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Member } from "types";

type Props = {
  selectedMember: Member | undefined;
};

function MemberInformation({ selectedMember }: Props) {
  const memberName = (selectedMember?.name ?? "---") + "さん";
  const memberUnpaidAmount = (selectedMember?.payment ?? "---") + "円";

  return (
    <Flex my={8} justifyContent="center" gap={4}>
      <Avatar size="xl" />
      <Box>
        <Heading>{memberName}</Heading>
        <Text fontSize="xl">{memberUnpaidAmount}</Text>
      </Box>
    </Flex>
  );
}

export { MemberInformation };

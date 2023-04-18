import { Avatar, Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { Member } from "types";

type Props = {
    selectedMember: Member | null;
};

function MemberInformation({ selectedMember }: Props) {

    const memberName = (selectedMember?.displayName ?? "---") + "さん";
    const memberUnpaidAmount = (selectedMember?.umpayedAmount ?? 0) + "円";

    return (
        <Flex justifyContent="center" gap={4}>
            <Avatar size="xl"/>
            <Box>
                <Heading>{memberName}</Heading>
                <Text fontSize="xl">{memberUnpaidAmount}</Text>
            </Box>
        </Flex>
    );
}

export { MemberInformation };

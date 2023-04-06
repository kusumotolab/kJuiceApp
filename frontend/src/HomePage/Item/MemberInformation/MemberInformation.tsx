import { Heading, Stack, Text } from "@chakra-ui/react";
import { Member } from "types";

type Props = {
    selectedMember: Member | null;
};

function MemberInformation({ selectedMember }: Props) {

    const memberName = (selectedMember?.displayName ?? "---") + "さん";
    const memberUnpaidAmount = (selectedMember?.umpayedAmount ?? 0) + "円";

    return (
        <Stack spacing={4} mb={8}>
            <Heading>ユーザ情報</Heading>
            <Text fontSize="2xl" ml={4}>{memberName}</Text>
            <Text fontSize="2xl" ml={4}>{memberUnpaidAmount}</Text>
        </Stack>
    );
}

export { MemberInformation };

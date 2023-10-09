import {
  Avatar,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Member } from "types";
import { Backend } from "util/Backend";

type Props = {
  selectedMember: Member | null;
};

function MemberInformation({ selectedMember }: Props) {
  const [userIcon, setUserIcon] = useState("");
  const memberName = (selectedMember?.name ?? "---") + "さん";
  const memberUnpaidAmount = "工事中";

  async function getImage() {
    if (selectedMember === null) {
      setUserIcon("");
      return;
    }

    const img = await Backend.getMemberImage(selectedMember.id);
    if (img !== null) {
      setUserIcon(URL.createObjectURL(img));
    }
  }

  useEffect(() => {
    getImage();
  }, [selectedMember]);

  return (
    <Flex my={8} gap={4} w={64}>
      <Avatar src={userIcon} size="lg" />
      <Center>
        {selectedMember === null ? (
          <Heading color="blackAlpha.500" size="md">
            利用者を選択
          </Heading>
        ) : (
          <Stack>
            <Heading size="md">{memberName}</Heading>
            <Text>{memberUnpaidAmount}</Text>
          </Stack>
        )}
      </Center>
    </Flex>
  );
}

export { MemberInformation };

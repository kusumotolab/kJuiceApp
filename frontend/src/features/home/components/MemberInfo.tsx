import { Avatar, Center, Flex, Heading, IconButton, Stack, Text } from "@chakra-ui/react";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Member } from "types";
import { Backend } from "util/Backend";

type Props = {
  member: Member | undefined;
  onClickClearButton: () => void;
};

export default function MemberInfo({ member, onClickClearButton }: Props) {
  const [imageURL, setImageURL] = useState<string>("");

  // TODO: 画像処理の共通化
  useEffect(() => {
    let ignore = false;

    async function getImage() {
      if (member === undefined) {
        setImageURL("");
        return;
      }

      const res = await Backend.getMemberImage(member.id);
      if (!ignore) {
        if (res === null) {
          console.log(
            member.id + ": Custom image not found. So use default image.",
          );
          setImageURL("");
          return;
        }
        setImageURL(URL.createObjectURL(res));
      }
    }

    getImage();

    return () => {
      ignore = true;
    };
  }, [member]);

  return (
    <>
      <IconButton
        variant="unstyled"
        aria-label="利用者選択取り消し"
        icon={
          <FontAwesomeIcon
            icon={faXmarkCircle}
            size="lg"
            color={member === undefined ? "gray" : "red"}
          />
        }
        onClick={onClickClearButton}
      />
      <Flex my={8} gap={4} w={64}>
        <Avatar src={imageURL} size="lg" />
        <Center>
          {member === undefined ? (
            <Heading color="blackAlpha.500" size="md">
              利用者を選択
            </Heading>
          ) : (
            <Stack>
              <Heading size="md">{member.name}</Heading>
              <Text>{"今月：" + member.payment + "円"}</Text>
            </Stack>
          )}
        </Center>
      </Flex>
    </>
  );
}


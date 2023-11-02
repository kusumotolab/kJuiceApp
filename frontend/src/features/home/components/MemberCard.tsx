import { Member } from "types";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Backend } from "util/Backend";

type Props = {
  selected: boolean;
  member: Member;
  onClick: (id: string) => void;
};

function MemberCard({ selected, member, onClick }: Props) {
  const [imageURL, setImageURL] = useState<string>("");

  useEffect(() => {
    let ignore = false;

    async function getImage() {
      const res = await Backend.getMemberImage(member.id);
      if (!ignore) {
        if (res === null) {
          console.log(
            member.id + ": Custom image not found. So use default image."
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
  }, []);

  return (
    <Flex
      rounded={8}
      border="2px"
      borderColor={selected ? "teal.400" : "blackAlpha.200"}
      m={4}
      p={2}
      alignItems="center"
      onClick={() => onClick(member.id)}
    >
      <Avatar src={imageURL} size="md" />
      <Text ml={4} mb={0}>
        {member.name}
      </Text>
    </Flex>
  );
}

export { MemberCard };

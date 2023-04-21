import { useEffect, useState } from "react";

import { Member } from "types";
import { Dispatch, SetStateAction } from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";

type Props = {
  selected: boolean;
  member: Member;
  setSelectedMember: Dispatch<SetStateAction<Member | null>>;
};

function MemberCard({ selected, member, setSelectedMember }: Props) {
  const [userIcon, setUserIcon] = useState("");

  const styles = useSpring({
    opacity: selected ? 1 : 0,
  });

  async function getImage() {
    const img = await Backend.getMemberImage(member.id);
    if (img !== null) {
      setUserIcon(URL.createObjectURL(img));
    }
  }

  useEffect(() => {
    getImage();
  }, []);

  return (
    <Flex
      rounded={4}
      m={4}
      p={2}
      alignItems="center"
      bg={selected ? "whiteAlpha.200" : "none"}
      onClick={() => {
        setSelectedMember(member);
      }}
    >
      <Avatar src={userIcon} />
      <Text ml={4} mb={0} fontSize="2xl" color="white">
        {member.displayName}
      </Text>
    </Flex>
  );
}

export { MemberCard };

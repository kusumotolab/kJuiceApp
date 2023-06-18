import { useContext, useEffect, useState } from "react";

import { Member } from "types";
import { Dispatch, SetStateAction } from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { Backend } from "util/Backend";
import { TabIndex } from "App";

type Props = {
  selected: boolean;
  member: Member;
  setSelectedMember: Dispatch<SetStateAction<Member | null>>;
};

function MemberCard({ selected, member, setSelectedMember }: Props) {
  const [userIcon, setUserIcon] = useState("");

  const tabIndex = useContext(TabIndex);

  async function getImage() {
    const img = await Backend.getMemberImage(member.id);
    if (img !== null) {
      setUserIcon(URL.createObjectURL(img));
    }
  }

  useEffect(() => {
    getImage();
  }, [tabIndex]);

  return (
    <Flex
      rounded={8}
      border={selected ? "2px" : "1px"}
      borderColor={selected ? "teal.400" : "blackAlpha.400"}
      m={4}
      p={2}
      alignItems="center"
      bg={selected ? "whiteAlpha.200" : "none"}
      onClick={() => {
        setSelectedMember(member);
      }}
    >
      <Avatar src={userIcon} rounded="inherit" />
      <Text ml={4} mb={0}>
        {member.name}
      </Text>
    </Flex>
  );
}

export { MemberCard };

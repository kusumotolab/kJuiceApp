import { Dispatch, SetStateAction } from "react";
import { Member } from "types";
import { MemberPanePerAttribute } from "./component/MemberPanePerAttribute";
import { Box, Heading } from "@chakra-ui/react";

type Props = {
  selectedMember: Member | undefined;
  handleClickMemberCard: Dispatch<SetStateAction<string | null>>;
  memberList: Member[];
};

function MemberPane({
  selectedMember,
  handleClickMemberCard,
  memberList,
}: Props) {
  return (
    <Box
      flex="1"
      minW="300px"
      maxW="300px"
      bg="blackAlpha.800"
      overflowX="scroll"
      overscrollBehavior="contain"
      px={4}
    >
      <Heading size="2xl" color="white" mt={4} mb={8}>
        ホーム
      </Heading>
      <MemberPanePerAttribute
        description="先生"
        attribute="teacher"
        memberList={memberList}
        selectedMember={selectedMember}
        handleClickMemberCard={handleClickMemberCard}
      />
      <MemberPanePerAttribute
        description="M2"
        attribute="m2"
        memberList={memberList}
        selectedMember={selectedMember}
        handleClickMemberCard={handleClickMemberCard}
      />
      <MemberPanePerAttribute
        description="M1"
        attribute="m1"
        memberList={memberList}
        selectedMember={selectedMember}
        handleClickMemberCard={handleClickMemberCard}
      />
      <MemberPanePerAttribute
        description="B4"
        attribute="b4"
        memberList={memberList}
        selectedMember={selectedMember}
        handleClickMemberCard={handleClickMemberCard}
      />
    </Box>
  );
}

export { MemberPane };

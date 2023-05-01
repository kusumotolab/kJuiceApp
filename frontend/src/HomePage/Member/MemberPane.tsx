import { Dispatch, SetStateAction } from "react";
import { Member } from "types";
import { MemberPanePerAttribute } from "./component/MemberPanePerAttribute";
import { Box, Heading } from "@chakra-ui/react";

type Props = {
  selectedMember: Member | null;
  setSelectedMember: Dispatch<SetStateAction<Member | null>>;
  memberList: Member[];
};

function MemberPane({ selectedMember, setSelectedMember, memberList }: Props) {
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
        setSelectedMember={setSelectedMember}
      />
      <MemberPanePerAttribute
        description="M2"
        attribute="m2"
        memberList={memberList}
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
      />
      <MemberPanePerAttribute
        description="M1"
        attribute="m1"
        memberList={memberList}
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
      />
      <MemberPanePerAttribute
        description="B4"
        attribute="b4"
        memberList={memberList}
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
      />
    </Box>
  );
}

export { MemberPane };

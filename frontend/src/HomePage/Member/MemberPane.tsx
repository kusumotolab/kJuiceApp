import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
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
        // TODO: 高さpropを変更する
        <Box w="30%" h="90vh" bg="blackAlpha.800" overflowX="scroll" px={4}>
            <Heading size="2xl" color="white" mt={4} mb={8}>ホーム</Heading>
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

// const MainMemberPane = styled.div`
//   overflow: scroll;
//   width: 30%;
//   height: 90vh;
//   border-width: 2px;
//   border-color: black;
//   border: solid 1px #333;
//   margin: 5px;

//   background-color: rgb(47, 47, 47);
//   color: greenyellow;
// `;

export { MemberPane };

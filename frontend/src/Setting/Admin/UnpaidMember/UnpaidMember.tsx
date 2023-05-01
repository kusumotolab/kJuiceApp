import { useEffect, useState } from "react";
import { Member } from "types";
import { Backend } from "util/Backend";
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

function UnpaidMember() {
  const [memberList, setMemberList] = useState<Member[]>([]);

  const fetchMemberList = async () => {
    const memberList = await Backend.getMemberList();

    if (memberList === null) {
      console.error("fetchMemberList: failed");
      return;
    }

    setMemberList(memberList);
  };

  useEffect(() => {
    fetchMemberList();
  }, []);

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr className="caption">
            <Th>名前</Th>
            <Th>未払金</Th>
            <Th>支払いボタン</Th>
          </Tr>
        </Thead>
        <Tbody>
          {memberList.map((member) => (
            <Tr key={member.name}>
              <Th>{member.name}</Th>
              <Th>工事中</Th>
              <Th>
                <Button
                  colorScheme="teal"
                  onClick={() => {
                    console.log("OK");
                  }}
                >
                  支払い完了
                </Button>
              </Th>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export { UnpaidMember };

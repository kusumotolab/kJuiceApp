import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useMembers } from "contexts/MembersContext";

function UnpaidMember() {
  const members = useMembers();

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
          {members.map((member) => (
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

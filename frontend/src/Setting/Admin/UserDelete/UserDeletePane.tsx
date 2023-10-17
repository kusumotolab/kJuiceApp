import { Backend } from "util/Backend";
import {
  Table,
  TableContainer,
  Tbody,
  Th,
  Switch,
  Thead,
  Tr,
  Button,
} from "@chakra-ui/react";
import { useMembers, useMembersDispatch } from "contexts/MembersContext";

function UserDeletePane() {
  const members = useMembers();
  const dispatch = useMembersDispatch();

  async function handleSwitchMemberActivity(id: string, active: boolean) {
    if (!(await Backend.setMemberActivity(id, active))) {
      console.error("switchMemberActivity: failed");
      return;
    }
    dispatch({ type: "switchedActivity", id: id, active: active });
  }

  async function handleDeleteMember(member: string) {
    if (!(await Backend.deleteMember(member))) {
      console.error("deleteMember: failed");
      return;
    }

    dispatch({ type: "deleted", id: member });
  }

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr className="caption">
            <Th>ユーザ名</Th>
            <Th>属性</Th>
            <Th>Active/InActive</Th>
            <Th>削除ボタン</Th>
          </Tr>
        </Thead>
        <Tbody>
          {members.map((member) => (
            <Tr key={member.name}>
              <Th>{member.name}</Th>
              <Th>{member.attribute}</Th>
              <Th>
                <Switch
                  isChecked={member.active}
                  onChange={() =>
                    handleSwitchMemberActivity(member.id, !member.active)
                  }
                />
              </Th>
              <Th>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDeleteMember(member.id)}
                >
                  削除
                </Button>
              </Th>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export { UserDeletePane };

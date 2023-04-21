import { useEffect, useState } from "react";
import { Member } from "types";
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

function UserDeletePane() {
  const [memberList, setMemberList] = useState<Member[]>([]);

  async function fetchMemberList() {
    const memberList = await Backend.getMemberList();

    if (memberList === null) {
      console.error("fetchMemberList: failed");
      return;
    }

    setMemberList(memberList);
  }

  async function switchMemberActivity(id: string, activity: boolean) {
    if (!(await Backend.setMemberActivity(id, activity))) {
      console.error("switchMemberActivity: failed");
      return;
    }
    memberList.findIndex((member) => member.id === id);
    setMemberList(
      memberList.map((member) => {
        if (member.id === id) member.active = activity;
        return member;
      })
    );
  }

  async function deleteMember(member: string) {
    if (!(await Backend.deleteMember(member)))
      console.error("deleteMember: failed");
  }

  useEffect(() => {
    fetchMemberList();
  }, []);
  return (
    <div className="UserDelete">
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
            {memberList.map((member) => (
              <Tr key={member.name}>
                <Th>{member.displayName}</Th>
                <Th>{member.attribute}</Th>
                <Th>
                  <Switch
                    isChecked={member.active}
                    onChange={() =>
                      switchMemberActivity(member.name, !member.active)
                    }
                  />
                </Th>
                <Th>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={async () => {
                      await deleteMember(member.name);
                      await fetchMemberList();
                    }}
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

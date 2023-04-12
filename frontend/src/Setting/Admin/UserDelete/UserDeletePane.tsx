import { useEffect, useState } from "react";
import { Button } from "../../../component/Button";
import { Toggle } from "../../../component/Toggle";
import { Member } from "types";
import { Backend } from "util/Backend";

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
      <table border={1}>
        <tr className="caption">
          <th>ユーザ名</th>
          <th>属性</th>
          <th>Active/InActive</th>
          <th>削除ボタン</th>
        </tr>
        {memberList.map((member) => (
          <tr key={member.name}>
            <th>{member.name}</th>
            <th>{member.attribute}</th>
            <th>
              <Toggle
                onClick={(activity: boolean) =>
                  switchMemberActivity(member.id, activity)
                }
                toggled={member.active}
              />
            </th>
            <th>
              <Button
                color="gray"
                radius="0.5em"
                onClick={async () => {
                  await deleteMember(member.name);
                  await fetchMemberList();
                }}
                fontColor="white"
              >
                削除
              </Button>
            </th>
          </tr>
        ))}
      </table>
    </div>
  );
}

export { UserDeletePane };

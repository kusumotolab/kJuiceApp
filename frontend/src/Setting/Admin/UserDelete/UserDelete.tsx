import { useEffect, useState } from "react";
import Button from "../../component/Button";
import { Toggle } from "../../component/Toggle";
import { Member } from "types";
import { Backend } from "util/Backend";

const fetchMemberList = async (setMemberList) => {
  const memberList = await Backend.getMemberList();

  if (memberList === null) {
    console.error("fetchMemberList: failed");
    return;
  }

  setMemberList(memberList);
};

const switchMemberActivity = async (name: string, activity: boolean) => {
  if (!(await Backend.setMemberActivity(name, activity)))
    console.error("switchMemberActivity: failed");
};

const deleteMember = async (member: string) => {
  if (!(await Backend.deleteMember(member)))
    console.error("deleteMember: failed");
};

function UserAddPane() {
  const [memberList, setMemberList] = useState<Member[]>([]);

  useEffect(() => {
    fetchMemberList(setMemberList);
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
          <tr>
            <th>{member.displayName}</th>
            <th>{member.attribute}</th>
            <th>
              <Toggle
                onClick={async () =>
                  await switchMemberActivity(member.name, !member.active)
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
                  await fetchMemberList(setMemberList);
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

export default UserAddPane;

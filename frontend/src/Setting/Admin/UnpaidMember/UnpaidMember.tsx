import { useEffect, useState } from "react";
import { Button } from "../../../component/Button";
import "./UnpaidMember.css";
import { Member } from "types";
import { Backend } from "util/Backend";

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
    <div className="UnpaidMember">
      <table border={1}>
        <tr className="caption">
          <th>名前</th>
          <th>未払金</th>
          <th>支払いボタン</th>
        </tr>
        {memberList.map((member) => (
          <tr key={member.id}>
            <th>{member.name}</th>
            <th>工事中</th>
            <th>
              <Button
                color="gray"
                radius="0.5em"
                onClick={() => {
                  console.log("OK");
                }}
                fontColor="white"
              >
                支払い完了
              </Button>
            </th>
          </tr>
        ))}
      </table>
    </div>
  );
}

export { UnpaidMember };

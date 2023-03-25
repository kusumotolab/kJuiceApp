import { useEffect, useState } from "react";
import Button from "../../component/Button";
import "./UnpaidMember.css";
import { Member } from "types";
import { Backend } from "util/Backend";

const fetchMemberList = async (setMemberList) => {
  const memberList = await Backend.getMemberList();

  if (memberList === null) {
    console.error("fetchMemberList: failed");
    return;
  }

  setMemberList(memberList.filter((member) => member.umpayedAmount > 0));
};

function UnpaidMember() {
  const [memberList, setMemberList] = useState<Member[]>([]);

  useEffect(() => {
    fetchMemberList(setMemberList);
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
          <tr>
            <th>{member.displayName}</th>
            <th>{member.umpayedAmount}円</th>
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

export default UnpaidMember;

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Backend } from "util/Backend";
import Select from "react-select";
import { Button } from "../../../component/Button";
import { Member } from "types";

function SendSlack() {
  const [slackMessage, setSlackMessage] = useState<string>("");
  const [memberList,setMemberList] = useState<Member[]>([]);
  const [admin,setAdmin] = useState<string>("---");

  async function fetchSlackMessage() {
    const message = await Backend.getInvokeMessageForSlack(admin, 1);
    if (message != null) {
      setSlackMessage(message);
    }
  }

  async function fetchMemberList() {
    const memberList = await Backend.getMemberList();

    if (memberList === null) {
      console.error("fetchMemberList: failed");
      return;
    }

    setMemberList(memberList.filter((member) => member.active));
  }

  useEffect(() => {
    fetchSlackMessage();
    fetchMemberList();
  }, [admin]);
  
  const options = memberList.map(({ displayName }) => ({
    value: displayName,
    label: displayName,
  }));

  return (
    <SendSlackPane>
      メッセージプレビュー
      <MessagePreview>{slackMessage}</MessagePreview>

      <Select
        options={options}
        defaultValue={{ label: "ユーザを選択してください", value: "" }}
        onChange={(target) => {
          setAdmin(target?.value ?? "");
        }}
        />
      <Button
        color="blue"
        onClick={() => {
          console.log("OK");
        }}
        fontColor="white"
      >
        送信
      </Button>
    </SendSlackPane>
  );
}

const SendSlackPane = styled.div`
  font-size: 1.5rem;
  margin: 1rem;
  padding: 1rem;
`

const MessagePreview = styled.div`
  font-size: 1rem;
  background: #EDEFF1;
  margin: 1rem;
  padding: 1rem;
  white-space: pre-wrap;
  word-wrap: break-word;
`


export { SendSlack };

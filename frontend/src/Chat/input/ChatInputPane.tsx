import { Dispatch, SetStateAction, useState } from "react";
import "./ChatInputPane.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from "react-bootstrap";
import { Backend } from "util/Backend";

type Props = {
  setLastUpdated: Dispatch<SetStateAction<string>>;
};

function ChatInputPane({ setLastUpdated }: Props) {
  const [message, setMessage] = useState("");

  async function addMessage() {
    if (!(await Backend.addMessage(message)))
      console.error("addMessage: failed");
  }

  return (
    <div className="ChatInputPane">
      <InputGroup className="mb-3">
        <Button
          variant="secondary"
          id="button-addon2"
          onClick={async () => {
            await addMessage();
            setMessage("");
            const date = new Date();
            setLastUpdated(
              // TODO 日付フォーマットできるライブラリを使う
              date.getFullYear() +
                "/" +
                ("0" + (date.getMonth() + 1)).slice(-2) +
                "/" +
                ("0" + date.getDate()).slice(-2) +
                " " +
                ("0" + date.getHours()).slice(-2) +
                ":" +
                ("0" + date.getMinutes()).slice(-2) +
                ":" +
                ("0" + date.getSeconds()).slice(-2) +
                "." +
                date.getMilliseconds()
            );
          }}
        >
          送信
        </Button>
        <Form.Control
          placeholder="140字まで入力可能．それ以上は入力しないで．"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </InputGroup>
    </div>
  );
}

export { ChatInputPane };

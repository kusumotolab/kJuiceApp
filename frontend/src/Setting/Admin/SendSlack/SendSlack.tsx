import styled from "styled-components";
import { Button } from "../../../component/Button";

function SendSlack() {
  return (
    <SendSlackPane>
      メッセージプレビュー
      <MessagePreview>メッセージ</MessagePreview>
      <label>
        名前：
        <input type="text" name="name" />
      </label>
      <label>
        属性：
        <select name="new-user-attribute" defaultValue="teature">
          <option value="teature">Teature</option>
          <option value="m2">M2</option>
          <option value="m1">M1</option>
          <option value="b4">B4</option>
        </select>
      </label>
      <label>
        <Button
          color="gray"
          onClick={() => {
            console.log("OK");
          }}
          fontColor="white"
        >
          キャンセル
        </Button>
        <Button
          color="blue"
          onClick={() => {
            console.log("OK");
          }}
          fontColor="white"
        >
          追加
        </Button>
      </label>
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
`


export { SendSlack };

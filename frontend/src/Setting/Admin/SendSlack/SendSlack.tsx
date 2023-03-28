import { Button } from "../../../component/Button";

function SendSlack() {
  return (
    <div className="SendSlack">
      <label>
        <div>アイコン：</div>
      </label>
      <label>
        名前：
        <input type="text" name="name" />
      </label>
      <label>
        属性：
        <select name="new-user-attribute" defaultValue="teacher">
          <option value="teacher">先生</option>
          <option value="m2">修士2年</option>
          <option value="m1">修士1年</option>
          <option value="b4">学部4年</option>
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
    </div>
  );
}

export { SendSlack };

import { useState } from "react";
import { Button } from "../../../component/Button";
import { Backend } from "util/Backend";

function ItemAddPane() {
  const [itemId, setItemId] = useState("");
  const [sellingPrice, setSellingPrice] = useState(0);
  const [costPrice, setCostPrice] = useState(0);
  const [grouping, setGrouping] = useState("juice");

  async function addItem() {
    if (!(await Backend.addItem(itemId, itemId, sellingPrice, costPrice, grouping)))
      console.error("addItem: failed");
  }

  return (
    <div className="ItemAdd">
      <label>
        <div>アイコン：</div>
      </label>
      <label>
        アイテムID：
        <input
          type="text"
          value={itemId}
          onChange={(event) => setItemId(event.target.value)}
        />
      </label>
      <label>
        定価:
        <input
          type="number"
          value={sellingPrice}
          onChange={(event) => setSellingPrice(Number(event.target.value))}
        />
      </label>
      <label>
        原価:
        <input
          type="number"
          value={costPrice}
          onChange={(event) => setCostPrice(Number(event.target.value))}
        />
      </label>
      <label>
        カテゴリ：
        <select
          value={grouping}
          defaultValue="juice"
          onChange={(event) => setGrouping(event.target.value)}
        >
          <option value="juice">Juice</option>
          <option value="food">Food</option>
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
      </label>
      <label>
        <Button
          color="blue"
          onClick={() => {
            addItem();
          }}
          fontColor="white"
        >
          追加
        </Button>
      </label>
    </div>
  );
}

export { ItemAddPane };

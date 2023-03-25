import { useEffect, useState } from "react";
import Button from "../../component/Button";
import { Toggle } from "../../component/Toggle";
import { Backend } from "util/Backend";
import { Item } from "types";

const fetchItemList = async (setItemList) => {
  const itemList = await Backend.getItemList();
  if (itemList !== null) {
    setItemList(itemList);
  } else {
    console.error("fetchItemList: failed");
  }
};

const switchItemActivity = async (id: string, activity: boolean) => {
  if (!(await Backend.setItemActivity(id, activity)))
    console.error("setItemactivity: failed");
};

const deleteItem = async (id: string) => {
  if (!(await Backend.deleteItem(id))) console.error("deleteItem: failed");
};

function UserAddPane() {
  const [itemList, setItemList] = useState<Item[]>([]);

  useEffect(() => {
    fetchItemList(setItemList);
  }, []);

  return (
    <div className="ItemDelete">
      <table border={1}>
        <tr className="caption">
          <th>アイテム名</th>
          <th>グルーピング</th>
          <th>Active/Inactive</th>
          <th>削除ボタン</th>
        </tr>
        {itemList.map((item) => (
          <tr>
            <th>{item.name}</th>
            <th>{item.grouping}</th>
            <th>
              <Toggle
                toggled={item.active}
                onClick={async () => {
                  await switchItemActivity(item.name, !item.active);
                }}
              />
            </th>
            <th>
              <Button
                color="gray"
                radius="0.5em"
                onClick={async () => {
                  await deleteItem(item.name);
                  await fetchItemList(setItemList);
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

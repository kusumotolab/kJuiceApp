import { useEffect, useState } from "react";
import { Item } from "types";
import { Backend } from "util/Backend";

function sortItems(items: Item[]) {
  return items.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    return 1;
  });
}

export default function useItems() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    let ignore = false;

    async function fetchItems() {
      const data = await Backend.getItemList();
      if (data === null) {
        console.error("fetchItemList: failed");
        return;
      }
      console.log("fetchItemList: success");
      if (!ignore) {
        setItems(sortItems(data));
      }
    }

    fetchItems();

    return () => {
      ignore = true;
    };
  }, []);

  async function reloadItems() {
    const data = await Backend.getItemList();
    if (data === null) {
      console.error("fetchItemList: failed");
      return;
    }
    setItems(sortItems(data));
  }

  return { items, reloadItems };
}

import { useEffect, useState } from "react";
import { Item } from "types";
import { Backend } from "util/Backend";

export default function useItems() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    Backend.getItemList()
      .then((data) => {
        if (data === null) {
          console.error("fetchItemList: failed");
          return;
        }
        setItems(data);
      });
  }, []);

  return items;
}

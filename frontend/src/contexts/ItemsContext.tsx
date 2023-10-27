import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { Item, ItemId } from "types";
import { Backend } from "util/Backend";

export const ItemsContext = createContext<Item[]>([]);
export const ItemsDispatchContext = createContext<Dispatch<Action>>(
  {} as Dispatch<Action>,
);

export function ItemsProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(itemsReducer, []);

  useEffect(() => {
    let ignore = false;

    async function fetchItems() {
      const data = await Backend.getItemList();
      if (data === null) {
        console.error("fetchItemList: failed");
        return;
      }
      if (!ignore) {
        dispatch({ type: "initialized", items: sortItems(data) });
      }
    }

    fetchItems();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <ItemsContext.Provider value={items}>
      <ItemsDispatchContext.Provider value={dispatch}>
        {children}
      </ItemsDispatchContext.Provider>
    </ItemsContext.Provider>
  );
}

export function useItems() {
  return useContext(ItemsContext);
}

export function useItemsDispatch() {
  return useContext(ItemsDispatchContext);
}

type Action =
  | { type: "initialized"; items: Item[] }
  | {
      type: "added";
      id: ItemId;
      name: string;
      sellingPrice: number;
      costPrice: number;
      category: string;
    }
  | { type: "deleted"; id: ItemId }
  | { type: "switchedActivity"; id: ItemId; active: boolean };

function itemsReducer(items: Item[], action: Action) {
  switch (action.type) {
    case "initialized":
      return action.items;
    case "added":
      return [
        ...items,
        {
          id: action.id,
          name: action.name,
          sellingPrice: action.sellingPrice,
          costPrice: action.costPrice,
          category: action.category,
          active: false,
        },
      ];
    case "deleted":
      return items.filter((item) => item.id !== action.id);
    case "switchedActivity":
      return items.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            active: action.active,
          };
        }
        return item;
      });
    default:
      throw new Error("invalid action");
  }
}

function sortItems(items: Item[]) {
  return items.sort((a, b) => {
    if (a.id < b.id) {
      return -1;
    }
    return 1;
  });
}

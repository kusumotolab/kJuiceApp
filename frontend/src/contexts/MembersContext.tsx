import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { Member } from "types";
import { Backend } from "util/Backend";

export const MembersContext = createContext<Member[]>([]);
export const MembersDispatchContext = createContext<Dispatch<Action>>(
  {} as Dispatch<Action>,
);

export function MembersProvider({ children }: { children: React.ReactNode }) {
  const [members, dispatch] = useReducer(membersReducer, []);

  useEffect(() => {
    let ignore = false;

    async function fetchMembers() {
      const data = await Backend.getMemberList();
      if (data === null) {
        console.error("fetchMemberList: failed");
        return;
      }
      if (!ignore) {
        dispatch({ type: "initialized", members: sortMembers(data) });
      }
    }

    fetchMembers();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <MembersContext.Provider value={members}>
      <MembersDispatchContext.Provider value={dispatch}>
        {children}
      </MembersDispatchContext.Provider>
    </MembersContext.Provider>
  );
}

export function useMembers() {
  return useContext(MembersContext);
}

export function useMembersDispatch() {
  return useContext(MembersDispatchContext);
}

type Action =
  | { type: "initialized"; members: Member[] }
  | { type: "added"; id: string; name: string; attribute: string }
  | { type: "deleted"; id: string }
  | { type: "switchedActivity"; id: string; active: boolean }
  | { type: "purchased"; id: string; purchase_amount: number };

function membersReducer(members: Member[], action: Action) {
  switch (action.type) {
    case "initialized":
      return action.members;
    case "added":
      return [
        ...members,
        {
          id: action.id,
          name: action.name,
          attribute: action.attribute,
          active: false,
          payment: 0,
        },
      ];
    case "deleted":
      return members.filter((member) => member.id !== action.id);
    case "switchedActivity":
      return members.map((member) => {
        if (member.id === action.id) {
          return {
            ...member,
            active: action.active,
          };
        }
        return member;
      });
    case "purchased":
      return members.map((member) => {
        if (member.id === action.id) {
          return {
            ...member,
            payment: member.payment + action.purchase_amount,
          };
        }
        return member;
      });
    default:
      throw new Error("invalid action");
  }
}

function sortMembers(members: Member[]) {
  return members.sort((a, b) => {
    if (a.id < b.id) {
      return -1;
    }
    return 1;
  });
}

import { useEffect, useState } from "react";
import { Member } from "types";
import { Backend } from "util/Backend";

function sortMembers(members: Member[]) {
  return members.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    return 1;
  });
}

export default function useMembers() {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    let ignore = false;

    async function fetchMembers() {
      const data = await Backend.getMemberList();
      if (data === null) {
        console.error("fetchMemberList: failed");
        return;
      }
      console.log("fetchMemberList: success");
      if (ignore) {
        return;
      }
      setMembers(sortMembers(data));
    }

    fetchMembers();

    return () => {
      ignore = true;
    };
  }, []);

  /**
    * バックエンドからメンバー一覧をリロードする．
  */
  async function reloadMembers() {
    const data = await Backend.getMemberList();
    if (data === null) {
      console.error("fetchMemberList: failed");
      return;
    }
    console.log(data);
    setMembers(sortMembers(data));
  }

  return { members, reloadMembers };
}

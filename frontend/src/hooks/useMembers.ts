import { useEffect, useState } from "react";
import { Member } from "types";
import { Backend } from "util/Backend";

export default function useMembers() {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    Backend.getMemberList()
      .then((data) => {
        if (data === null) {
          console.error("fetchMemberList: failed");
          return;
        }
        setMembers(data);
      });
  }, []);

  return members;
}

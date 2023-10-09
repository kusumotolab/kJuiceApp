import { useEffect, useState } from "react";
import { Member } from "types";
import { Backend } from "util/Backend";

export default function useMemberImage(member: Member | null) {
  const [memberImage, setMemberImage] = useState("");

  useEffect(() => {
    if (member === null) {
      return;
    }
    Backend.getMemberImage(member.id)
      .then((res) => {
        if (res === null) {
          console.error("getMemberImage: failed");
          return;
        }
        setMemberImage(URL.createObjectURL(res));
      });
  }, [member]);

  return memberImage;
}

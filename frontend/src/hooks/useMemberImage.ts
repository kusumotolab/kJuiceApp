import { useEffect, useState } from "react";
import { Member } from "types";
import { Backend } from "util/Backend";

export default function useMemberImage(member: Member | null) {
  const [memberImage, setMemberImage] = useState("");

  useEffect(() => {
    let ignore = false;

    async function fetchMemberImage() {
      if (member === null) {
        return;
      }
      Backend.getMemberImage(member.id)
        .then((res) => {
          if (res === null) {
            console.error("getMemberImage: failed");
            return;
          }
          if (ignore) {
            return;
          }
          setMemberImage(URL.createObjectURL(res));
        });
    }
    fetchMemberImage();

    return () => {
      ignore = true;
    }
  }, []);

  return memberImage;
}

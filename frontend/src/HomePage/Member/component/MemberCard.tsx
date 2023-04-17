import { useEffect, useState } from "react";

import { Member } from "types";
import { Dispatch, SetStateAction } from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";


type Props = {
    selected: boolean;
    member: Member;
    setSelectedMember: Dispatch<SetStateAction<Member | null>>;
};

function MemberCard({ selected, member, setSelectedMember }: Props) {
    const [userIcon, setUserIcon] = useState("");

    async function fetchBase64Img(userId: string) {
        await fetch(
            `${window.location.protocol}//${window.location.host}${window.location.pathname}backend/member/image?name=${userId}`,
            {
                method: "GET",
                mode: "cors",
            }
        )
            .then((res) => res.text())
            .then((items) => {
                setUserIcon(items);
            });
    }

    useEffect(() => {
        fetchBase64Img(member.name);
    }, []);

    return (
        <Flex
            rounded={4}
            m={4}
            p={2}
            alignItems="center"
            bg={selected ? "whiteAlpha.200" : "none"}
            onClick={() => { setSelectedMember(member); }}
        >
            <Avatar src={userIcon} />
            <Text ml={4} mb={0} fontSize="2xl" color="white">{member.displayName}</Text>
        </Flex >
    );
}

export { MemberCard };

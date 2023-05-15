import {
  Button,
  FormControl,
  FormLabel,
  Center,
  Stack,
  Avatar,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Member } from "types";
import { Backend } from "util/Backend";



function SendSlack() {

  const [selectedIssuer, setSelectedIssuer] = useState<Member>();
  const [userIcon, setUserIcon] = useState("");
  const [memberList, setMemberList] = useState<Member[]>([]);

  async function setDefaultIssuer() {
    const billsList = await Backend.getBill();
    if (billsList == null) {
      return;
    }
    const issuerId = billsList.slice(-1)[0].issuerId;
    const membersList = await Backend.getMemberList();
    if (membersList == null) {
      return;
    }

    try {
      const issuer = membersList
        .filter((member) => member.active)
        .filter((member) => member.id == issuerId)[0];
      getImage(issuer)
      setSelectedIssuer(issuer);
    } catch (e) {
      return;
    }
  }

  async function getImage(member: Member) {
    const img = await Backend.getMemberImage(member.id);
    if (img !== null) {
      setUserIcon(URL.createObjectURL(img));
    } else {
      setUserIcon("");
    }
  }

  async function getMemberList() {
    const memberList = await Backend.getMemberList();

    if (memberList === null) {
      console.error("fetchMemberList: failed");
      return;
    }

    setMemberList(memberList.filter((member) => member.active));
  }

  function getSortedMemberListForSelectBox(): Member[] {
    const ret: Member[] = [];
    if(selectedIssuer != undefined){
      ret.push(selectedIssuer);      
    }
    memberList.forEach((member) => {
      if(selectedIssuer?.id != member.id){
        ret.push(member);
      }
    });
    return ret;
  }

  useEffect(() => {
    if (selectedIssuer == undefined) {
      setDefaultIssuer();
      getMemberList();
    } else {
      getImage(selectedIssuer);
    }
  }, [selectedIssuer])

  return (
    <Stack spacing={4}>
      <FormControl id="user-icon">
        <FormLabel>送信者</FormLabel>
        <Stack direction="row" spacing={8}>
          <Avatar bg="gray.400" src={userIcon} />
          <Center>
            <Select
              onChange={async (e) => {
                const userId = e.target?.value ?? "";
                setSelectedIssuer(memberList.filter((member) => member.id == userId)[0]);
              }}
            >
              {getSortedMemberListForSelectBox().map(({ id, name }) => {
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
            </Select>
          </Center>
        </Stack>
      </FormControl>
      <Button
        colorScheme="teal"
        onClick={() => {
          if(selectedIssuer != undefined){
            Backend.issueBill(selectedIssuer.id);
          }
        }}
      >
        送信
      </Button>
    </Stack>
  );
}

export { SendSlack };

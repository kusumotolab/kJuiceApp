import {
  Button,
  FormControl,
  FormLabel,
  Center,
  Stack,
  Select,
  Avatar,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Member } from "types";
import { Backend } from "util/Backend";

function SendSlack() {
  const [selectedIssuer, setSelectedIssuer] = useState<Member>();
  const [userIcon, setUserIcon] = useState("");
  const [memberList, setMemberList] = useState<Member[]>([]);

  async function setDefaultIssuer() {
    const billsList = await Backend.getBillList();
    if (billsList === null || typeof billsList === "undefined") {
      return;
    }
    const issuerId = billsList?.at(-1)?.issuerId;
    const membersList = await Backend.getMemberList();
    if (membersList === null) {
      return;
    }

    try {
      const issuer =
        membersList.find((member) => member.active && member.id === issuerId) ||
        membersList[0];
      setImage(issuer);
      setSelectedIssuer(issuer);
    } catch (e) {
      return;
    }
  }

  async function setImage(member: Member) {
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

  function updateIssuer(memberId: string) {
    if (memberId != "") {
      setSelectedIssuer(memberList.find((member) => member.id === memberId));
    }
  }

  function issuerSelected(e: React.ChangeEvent<HTMLSelectElement>) {
    const memberId = e.target?.value ?? "";
    updateIssuer(memberId);
  }

  function issueBill() {
    if (typeof selectedIssuer !== "undefined") {
      Backend.issueBill(selectedIssuer.id);
    }
  }

  useEffect(() => {
    setDefaultIssuer();
    getMemberList();
  }, []);

  useEffect(() => {
    if (typeof selectedIssuer !== "undefined") {
      setImage(selectedIssuer);
    }
  }, [selectedIssuer]);

  return (
    <Stack spacing={4}>
      <FormControl id="user-icon">
        <FormLabel>食品会/ジュース会大臣</FormLabel>
        <Card>
          <CardBody>
            <Stack direction="row" spacing={8} h="1fr">
              <Avatar bg="gray.400" src={userIcon} size="lg" />
              <Center h="1fr" fontSize="2xl">
                <Select size="lg" onChange={async (e) => issuerSelected(e)}>
                  {memberList.map(({ id, name }) => (
                    <option
                      key={id}
                      value={id}
                      selected={selectedIssuer?.id === id}
                    >
                      {name}
                    </option>
                  ))}
                </Select>
              </Center>
            </Stack>
          </CardBody>
        </Card>
      </FormControl>
      <Button colorScheme="teal" onClick={() => issueBill()}>
        送信
      </Button>
    </Stack>
  );
}

export { SendSlack };

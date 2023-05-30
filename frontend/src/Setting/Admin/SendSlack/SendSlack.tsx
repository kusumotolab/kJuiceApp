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
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Member } from "types";
import { Backend } from "util/Backend";

function SendSlack() {
  const [issuer, setIssuer] = useState<Member>();
  const [issuerIcon, setIssuerIcon] = useState("");
  const [memberList, setMemberList] = useState<Member[]>([]);
  const toast = useToast();

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
      setIssuer(issuer);
    } catch (e) {
      return;
    }
  }

  async function setImage(member: Member) {
    const img = await Backend.getMemberImage(member.id);
    if (img !== null) {
      setIssuerIcon(URL.createObjectURL(img));
    } else {
      setIssuerIcon("");
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
      setIssuer(memberList.find((member) => member.id === memberId));
    }
  }

  function handleChangeIssuer(e: React.ChangeEvent<HTMLSelectElement>) {
    const memberId = e.target?.value;
    updateIssuer(memberId);
  }

  function issueBill() {
    if (typeof issuer !== "undefined") {
      try {
        Backend.issueBill(issuer.id);
        showToast("請求書を発行しました", "success");
      } catch (e) {
        showToast("請求書の発行に失敗しました", "error");
      }
    }
  }

  function showToast(title: string, status: "success" | "error") {
    toast({
      title: title,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  }

  useEffect(() => {
    setDefaultIssuer();
    getMemberList();
  }, []);

  useEffect(() => {
    if (typeof issuer !== "undefined") {
      setImage(issuer);
    }
  }, [issuer]);

  return (
    <Stack spacing={4}>
      <FormControl>
        <FormLabel>食品会/ジュース会大臣</FormLabel>
        <Card>
          <CardBody>
            <Stack direction="row" spacing={8} h="1fr">
              <Avatar bg="gray.400" src={issuerIcon} size="lg" />
              <Center h="1fr" fontSize="2xl">
                <Select size="lg" onChange={async (e) => handleChangeIssuer(e)}>
                  {memberList.map(({ id, name }) => (
                    <option key={id} value={id} selected={issuer?.id === id}>
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

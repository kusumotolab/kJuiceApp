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
  Grid,
  GridItem,
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
    if (billsList === null || billsList === undefined) {
      return;
    }
    const issuerId = billsList?.at(-1)?.issuerId;
    const membersList = await Backend.getMemberList();
    if (membersList === null) {
      return;
    }

    try {
      const issuer = membersList.filter(
        (member) => member.active && member.id == issuerId
      )[0];
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
      setSelectedIssuer(
        memberList.filter((member) => member.id == memberId)[0]
      );
    }
  }

  useEffect(() => {
    setDefaultIssuer();
    getMemberList();
  }, []);

  useEffect(() => {
    if (selectedIssuer != undefined) {
      setImage(selectedIssuer);
    }
  }, [selectedIssuer]);

  return (
    <Stack spacing={4}>
      <FormControl id="user-icon">
        <FormLabel>食品会/ジュース会大臣</FormLabel>
        <Card>
          <CardBody>
            <Grid templateColumns="repeat(5,1fr)" gap={4}>
              <GridItem colSpan={2}>
                <Stack direction="row" spacing={8} h="100%">
                  <Avatar bg="gray.400" src={userIcon} size="lg" />
                  <Center h="100%" fontSize="2xl">
                    {selectedIssuer?.name}
                  </Center>
                </Stack>
              </GridItem>
              <GridItem colStart={5} colEnd={6}>
                <Center h="100%">
                  <Select
                    onChange={async (e) => {
                      const memberId = e.target?.value ?? "";
                      updateIssuer(memberId);
                    }}
                    placeholder="変更"
                  >
                    {memberList.map(({ id, name }) => {
                      return (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      );
                    })}
                  </Select>
                </Center>
              </GridItem>
            </Grid>
          </CardBody>
        </Card>
      </FormControl>
      <Button
        colorScheme="teal"
        onClick={() => {
          if (selectedIssuer != undefined) {
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

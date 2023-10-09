import { useEffect, useState } from "react";
import { Member } from "types";
import { Backend } from "util/Backend";
import {
  Switch,
  Box,
  Text,
  Flex,
  Spacer,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  Stack,
  Divider,
  Button,
  Avatar,
  IconButton,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faPlus } from "@fortawesome/free-solid-svg-icons";

type MemberItemProps = {
  member: Member;
  switchMemberActivity: (id: string, activity: boolean) => void;
  deleteMember: (id: string) => void;
  fetchMemberList: () => void;
};

function MemberItem(props: MemberItemProps) {
  const { member, switchMemberActivity, deleteMember, fetchMemberList } = props;

  return (
    <Flex
      _first={{ borderTop: "1px", borderColor: "blackAlpha.200" }}
      borderBottom="1px"
      borderColor="blackAlpha.200"
      justify="space-between"
      alignItems="center"
      px={4}
      py={2}
    >
      <Avatar />
      <Box ml={4}>
        <Text fontSize="xl" fontWeight="bold">
          {member.name + " さん"}
        </Text>
        <Text textColor="gray.500">{member.attribute + ", (工事中)円"}</Text>
      </Box>
      <Spacer />
      <HStack spacing={8}>
        <Switch
          size="lg"
          isChecked={member.active}
          onChange={() => switchMemberActivity(member.id, !member.active)}
        />
        <Popover>
          <PopoverTrigger>
            <IconButton
              aria-label="More"
              icon={<FontAwesomeIcon icon={faEllipsisVertical} />}
              size="lg"
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <Stack spacing={4} p={4}>
              <Text>編集</Text>
              <Divider />
              <Text
                textColor="red"
                onClick={async () => {
                  await deleteMember(member.id);
                  await fetchMemberList();
                }}
              >
                削除
              </Text>
            </Stack>
          </PopoverContent>
        </Popover>
      </HStack>
    </Flex>
  );
}

function MemberManagementPane() {
  const [memberList, setMemberList] = useState<Member[]>([]);

  async function fetchMemberList() {
    const memberList = await Backend.getMemberList();

    if (memberList === null) {
      console.error("fetchMemberList: failed");
      return;
    }

    setMemberList(memberList);
  }

  async function switchMemberActivity(id: string, activity: boolean) {
    if (!(await Backend.setMemberActivity(id, activity))) {
      console.error("switchMemberActivity: failed");
      return;
    }
    memberList.findIndex((member) => member.id === id);
    setMemberList(
      memberList.map((member) => {
        if (member.id === id) member.active = activity;
        return member;
      }),
    );
  }

  async function deleteMember(member: string) {
    if (!(await Backend.deleteMember(member)))
      console.error("deleteMember: failed");
  }

  useEffect(() => {
    fetchMemberList();
  }, []);

  return (
    <>
      <Button
        leftIcon={<FontAwesomeIcon icon={faPlus} />}
        colorScheme="blue"
        variant="outline"
        size="lg"
        mx={4}
        my={4}
      >
        利用者を追加
      </Button>
      <Stack spacing={0}>
        {memberList.map((member) => (
          <MemberItem
            key={member.id}
            member={member}
            switchMemberActivity={switchMemberActivity}
            deleteMember={deleteMember}
            fetchMemberList={fetchMemberList}
          />
        ))}
      </Stack>
    </>
  );
}

export { MemberManagementPane };

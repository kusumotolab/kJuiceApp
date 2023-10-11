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
  useDisclosure,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faPlus } from "@fortawesome/free-solid-svg-icons";
import { MemberAddModal } from "../MemberAddModal/MemberAddModal";
import useMemberImage from "hooks/useMemberImage";
import useMembers from "hooks/useMembers";

type MemberRowProps = {
  member: Member;
  onChangeSwitchActivity: (id: string, activity: boolean) => void;
  onClickDeleteMember: (id: string) => void;
};

function MemberRow(props: MemberRowProps) {
  const { member, onChangeSwitchActivity, onClickDeleteMember } = props;
  const memberImage = useMemberImage(member);

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
      <Avatar src={memberImage} />
      <Box ml={4}>
        <HStack spacing={2} align="center">
          <Text fontSize="xl" fontWeight="bold">
            {member.name + " さん"}
          </Text>
          <Text as="sub" textColor="gray">
            {member.id}
          </Text>
        </HStack>
        <Text textColor="gray.500">{member.attribute + ", (工事中)円"}</Text>
      </Box>
      <Spacer />
      <HStack spacing={4}>
        <Switch
          colorScheme="teal"
          size="lg"
          isChecked={member.active}
          onChange={() => onChangeSwitchActivity(member.id, !member.active)}
        />
        <Popover>
          <PopoverTrigger>
            <IconButton
              variant="ghost"
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
                onClick={() => onClickDeleteMember(member.id)}
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { members, reloadMembers } = useMembers();

  async function handleSwitchMemberActivity(id: string, activity: boolean) {
    if (!(await Backend.setMemberActivity(id, activity))) {
      console.error("switchMemberActivity: failed");
      return;
    }

    reloadMembers();
  }

  async function handleDeleteMember(id: string) {
    if (!(await Backend.deleteMember(id))) {
      console.error("deleteMember: failed");
      return;
    }

    reloadMembers();
  }

  async function handleAddMember({ id, name, attribute }: Member) {
    if (!(await Backend.addMember(id, name, attribute))) {
      console.error("addMember: failed");
      return;
    }

    await reloadMembers();
  }

  return (
    <>
      <Button
        leftIcon={<FontAwesomeIcon icon={faPlus} />}
        colorScheme="teal"
        variant="outline"
        size="lg"
        mx={4}
        my={4}
        onClick={onOpen}
      >
        利用者を追加
      </Button>
      <Stack spacing={0}>
        {members.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            onChangeSwitchActivity={handleSwitchMemberActivity}
            onClickDeleteMember={handleDeleteMember}
          />
        ))}
      </Stack>
      <MemberAddModal
        isOpen={isOpen}
        onClose={onClose}
        onClickAddMember={handleAddMember}
      />
    </>
  );
}

export { MemberManagementPane };

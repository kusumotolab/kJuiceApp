import {
  Avatar,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Backend } from "util/Backend";
import { FileSelect } from "util/FileSelect";
import { useMembers } from "contexts/MembersContext";

function IconSetting() {
  const [profileImage, setProfileImage] = useState("");
  const [userId, setUserId] = useState<string>("");
  const members = useMembers();
  const [fileObject, setFileObject] = useState<File>();

  function onFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setFileObject(e.target.files[0]);

    setProfileImage(window.URL.createObjectURL(e.target.files[0]));
  }

  async function handleSubmit(fileObject: File | undefined) {
    if (userId === "") {
      alert("userIdが指定されていません");
      return;
    }

    if (typeof fileObject === "undefined") {
      alert("画像が選択されていません");
      return;
    }

    if (await Backend.setMemberImage(userId, fileObject)) {
      alert("送信に成功しました");
    } else {
      alert(
        "ファイルの送信に失敗しました．ファイルサイズ/ファイル形式を確認してください．ファイルサイズは10MB以下である必要があります．",
      );
    }
  }

  return (
    <Box w="2xl" margin="auto">
      <Stack spacing={4}>
        <Heading>ユーザ設定</Heading>
        <FormControl id="select-user">
          <Select
            placeholder="ユーザを選択"
            onChange={(e) => {
              setUserId(e.target?.value ?? "");
            }}
          >
            {members.map(({ id, name }) => {
              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <FormControl id="user-icon">
          <FormLabel>ユーザアイコン</FormLabel>
          <Stack direction="row" spacing={8}>
            <Center>
              <Avatar src={profileImage} size="xl" />
            </Center>
            <Center>
              <FileSelect onFileInputChange={onFileInputChange} />
            </Center>
          </Stack>
        </FormControl>
        <Button
          colorScheme="teal"
          variant="solid"
          onClick={() => handleSubmit(fileObject)}
        >
          変更
        </Button>
      </Stack>
    </Box>
  );
}

export { IconSetting };

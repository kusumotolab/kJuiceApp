import { useEffect, useState } from "react";
import { Backend } from "util/Backend";
import { Item } from "types";
import {
  Image,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { FileSelect } from "Setting/User/IconSetting/FileSelect/FileSelect";
import LogoDefaultItem from "./../../../image/default_item.svg";

function ItemIconChangePane() {
  const [itemList, setItemList] = useState<Item[]>([]);
  const [profileImage, setProfileImage] = useState(LogoDefaultItem);
  const [targetItemId, setTargetItemId] = useState<string>("");
  const [fileObject, setFileObject] = useState<File>();
  const toast = useToast();

  async function fetchItemList() {
    const itemList = await Backend.getItemList();
    if (itemList !== null) {
      setItemList(itemList);
    } else {
      console.error("fetchItemList: failed");
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

  function onFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setFileObject(e.target.files[0]);

    setProfileImage(URL.createObjectURL(e.target.files[0]));
  }
  async function handleSubmit() {
    if (targetItemId === "") {
      showToast("アイテムが指定されていません", "error");
      return;
    }

    if (typeof fileObject === "undefined") {
      showToast("画像が選択されていません", "error");
      return;
    }

    if (await Backend.setItemImage(targetItemId, fileObject)) {
      showToast("画像の送信に成功しました", "success");
    } else {
      showToast(
        "ファイルの送信に失敗しました．ファイルサイズ/形式を確認してください．ファイルサイズの上限は10MBです．",
        "error"
      );
    }
  }

  useEffect(() => {
    fetchItemList();
  }, []);

  return (
    <Box w="xl" margin="auto">
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>プレビュー</FormLabel>
          <Stack direction="row" spacing={8}>
            <Center>
              <Image src={profileImage} boxSize="100px" objectFit="cover" />
            </Center>
            <Center>
              <FileSelect onFileInputChange={onFileInputChange} />
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="select-user">
          <Select
            placeholder="アイコンを変更するアイテムの選択"
            onChange={(e) => setTargetItemId(e.target?.value)}
          >
            {itemList.map(({ id, name }) => {
              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <Button colorScheme="teal" variant="solid" onClick={handleSubmit}>
          変更
        </Button>
      </Stack>
    </Box>
  );
}

export { ItemIconChangePane };
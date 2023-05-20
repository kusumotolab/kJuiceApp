import { useEffect, useState } from "react";
import { Backend } from "util/Backend";
import { Item } from "types";
import { Image, Box, Button, Center, FormControl, FormLabel, Select, Stack } from "@chakra-ui/react";
import { FileSelect } from "Setting/User/IconSetting/FileSelect/FileSelect";
import LogoDefaultItem from "./../../../image/default_item.svg";

function ItemIconChangePane() {
  const [itemList, setItemList] = useState<Item[]>([]);
  const [profileImage, setProfileImage] = useState(LogoDefaultItem);
  const [selectedItemId,setSelectedItemId] = useState<string>("");
  const [fileObject, setFileObject] = useState<File>();


  async function fetchItemList() {
    const itemList = await Backend.getItemList();
    if (itemList !== null) {
      setItemList(itemList);
    } else {
      console.error("fetchItemList: failed");
    }
  }

  function onFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setFileObject(e.target.files[0]);

    setProfileImage(window.URL.createObjectURL(e.target.files[0]));
  }
  async function handleSubmit(itemId: string,fileObject: File | undefined) {
    if (itemId === "") {
      alert("アイテムが指定されていません");
      return;
    }

    if (typeof fileObject === "undefined") {
      alert("画像が選択されていません");
      return;
    }

    if (await Backend.setItemImage(itemId, fileObject)) {
      alert("送信に成功しました");
    } else {
      alert(
        "ファイルの送信に失敗しました．ファイルサイズ/ファイル形式を確認してください．ファイルサイズは10MB以下である必要があります．"
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
            onChange={(e) => {
                setSelectedItemId(e.target?.value ?? "");
            }}
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
        <Button
          colorScheme="teal"
          variant="solid"
          onClick={() => handleSubmit(selectedItemId,fileObject)}
        >
          変更
        </Button>
      </Stack>
    </Box>
  );
}

export { ItemIconChangePane };

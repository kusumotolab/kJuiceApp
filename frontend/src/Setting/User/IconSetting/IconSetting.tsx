import { useEffect, useState } from "react";
import { FileSelect } from "./FileSelect/FileSelect";
import { Backend } from "util/Backend";
import { Member } from "types";
import { Box, Button, FormControl, FormLabel, Heading, Select, Stack, Avatar, Center } from "@chakra-ui/react";

function IconSetting() {
    const [profileImage, setProfileImage] = useState("");
    const [userId, setUserId] = useState<string>("");
    const [memberList, setMemberList] = useState<Member[]>([]);
    const [fileObject, setFileObject] = useState<File>();

    async function fetchMemberList() {
        const memberList = await Backend.getMemberList();

        if (memberList === null) {
            console.error("fetchMemberList: failed");
            return;
        }

        setMemberList(memberList.filter((member) => member.active));
    }

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
                "ファイルの送信に失敗しました．ファイルサイズ/ファイル形式を確認してください．ファイルサイズは10MB以下である必要があります．"
            );
        }
    }

    useEffect(() => {
        fetchMemberList();
    }, []);

    const options = memberList.map(({ name, displayName }) => ({
        value: name,
        label: displayName,
    }));
    return (
        <Box w="2xl" margin="auto">
            <Stack spacing={4}>
                <Heading>ユーザ設定</Heading>
                <FormControl id="select-user">
                    <Select placeholder="ユーザを選択" onChange={(e) => { setUserId(e.target?.value ?? "") }}>
                        {memberList.map(({ name, displayName }) => {
                            return (
                                <option key={name} value={name}>{displayName}</option>
                            );
                        })}
                    </Select>
                </FormControl>
                <FormControl id="user-icon">
                    <FormLabel>ユーザアイコン</FormLabel>
                    <Stack direction="row" spacing={8}>
                        <Center>
                            <Avatar
                                src={profileImage}
                                size='xl'
                            />
                        </Center>
                        <Center>
                            <FileSelect onFileInputChange={onFileInputChange} />
                        </Center>
                    </Stack>
                </FormControl>
                <Button colorScheme="teal" variant="solid" onClick={() => handleSubmit(fileObject)}>変更</Button>
            </Stack>
        </Box>
    );
}

export { IconSetting };

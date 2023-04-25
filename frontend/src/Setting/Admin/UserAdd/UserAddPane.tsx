import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Backend } from "util/Backend";

function UserAddPane() {
  const [userId, setUserId] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [attribute, setAttribute] = useState("teacher");

  async function addUser() {
    if (!(await Backend.addMember(userId, displayName, attribute)))
      console.error("addUser: failed");
  }

  return (
    <Stack spacing={4}>
      <FormControl id="icon">
        <FormLabel>アイコン</FormLabel>
      </FormControl>
      <FormControl id="id">
        <FormLabel>ID</FormLabel>
        <Input
          type="text"
          name="name"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
        />
      </FormControl>
      <FormControl id="displayName">
        <FormLabel>表示名</FormLabel>
        <Input
          type="text"
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
        />
      </FormControl>
      <FormControl id="attribute">
        <FormLabel>属性</FormLabel>
        <Select
          name="new-user-attribute"
          value={attribute}
          onChange={(event) => setAttribute(event.target.value)}
        >
          <option value="teacher">先生</option>
          <option value="m2">M2</option>
          <option value="m1">M1</option>
          <option value="b4">B4</option>
        </Select>
      </FormControl>
      <Button
        colorScheme="teal"
        onClick={() => {
          console.log(userId);
          console.log(displayName);
          console.log(attribute);
          addUser();
        }}
      >
        追加
      </Button>
    </Stack>
  );
}

export { UserAddPane };

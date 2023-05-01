import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";

function SendSlack() {
  return (
    <Stack spacing={4}>
      <FormControl id="icon">
        <FormLabel>アイコン</FormLabel>
      </FormControl>
      <FormControl id="name">
        <FormLabel>名前</FormLabel>
        <Input type="text" name="name" />
      </FormControl>
      <FormControl id="attribute">
        <FormLabel>属性</FormLabel>
        <Select name="new-user-attribute" defaultValue="teacher">
          <option value="teacher">先生</option>
          <option value="m2">M2</option>
          <option value="m1">M1</option>
          <option value="b4">B4</option>
        </Select>
      </FormControl>
      <Button
        colorScheme="teal"
        onClick={() => {
          console.log("OK");
        }}
      >
        送信
      </Button>
    </Stack>
  );
}

export { SendSlack };

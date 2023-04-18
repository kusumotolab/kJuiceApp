import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

function PasswordPane({ visible, setVisible }: Props) {
  const [password, setPassword] = useState("");

  return (
    <Stack spacing={4} style={{ visibility: visible ? "visible" : "hidden" }}>
      <FormControl id="password">
        <FormLabel>パスワード</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <FormHelperText>ヒント: &quot;password&quot;</FormHelperText>
      </FormControl>
      <Button
        colorScheme="teal"
        onClick={() => {
          if (password == "password") {
            setVisible(false);
          } else {
            alert("パスワードが違います");
          }
        }}
      >
        認証
      </Button>
    </Stack>
  );
}

export { PasswordPane };

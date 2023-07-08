import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

function PasswordPane({ visible, setVisible }: Props) {
  const [password, setPassword] = useState("");
  const toast = useToast();

  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === "Enter") {
      verifyPassword();
    }
  }

  function verifyPassword() {
    if (password === "password") {
      setVisible(false);
    } else {
      showToast("パスワードが違います", "error");
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
  return (
    <Flex
      justify="center"
      alignItems="center"
      h="calc(100vh - 64px)"
      bg="gray.50"
    >
      <Stack w="50%" maxW="600px" minW="400px" spacing={4} align="center">
        <Heading size="lg">認証が必要です</Heading>
        <Text>パスワードを入力してください</Text>
        <Card w="100%">
          <CardBody>
            <Stack spacing={4}>
              <FormControl id="password">
                <FormLabel>パスワード</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <FormHelperText>ヒント: &quot;password&quot;</FormHelperText>
              </FormControl>
            </Stack>
            <Box mt={10}>
              <Button w="full" colorScheme="teal" onClick={verifyPassword}>
                認証
              </Button>
            </Box>
          </CardBody>
        </Card>
      </Stack>
    </Flex>
  );
}

export { PasswordPane };

import { Text, Heading, Stack } from "@chakra-ui/react";

function InitialView() {
  return (
    <Stack m="auto" spacing={4}>
      <Heading size="3xl" textAlign="center">
        kJuiceApp
      </Heading>
      <Text size="3xl" textAlign="center">
        ユーザを選択してください
      </Text>
    </Stack>
  );
}

export { InitialView };

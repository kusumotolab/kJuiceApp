import { useState } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";

type Props = {
  postMessage: (message: string) => Promise<void>;
};

function ChatInputPane({ postMessage }: Props) {
  const [message, setMessage] = useState("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessage(e.target.value);
  }

  async function handlePost() {
    await postMessage(message);
    setMessage("");
  }

  return (
    <div className="ChatInputPane">
      <Flex display="flex" gap={2}>
        <Input
          value={message}
          onChange={handleInputChange}
          placeholder="140字まで入力可能．それ以上は入力しないで．"
        />
        <Button type="submit" onClick={handlePost} colorScheme="teal">
          送信
        </Button>
      </Flex>
    </div>
  );
}

export { ChatInputPane };

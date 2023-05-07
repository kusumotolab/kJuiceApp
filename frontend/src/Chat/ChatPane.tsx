import { useEffect, useState } from "react";
import { ChatMessageComponent } from "./ChatMessageComponent";
import { ChatInputPane } from "./input/ChatInputPane";
import { Chat } from "types";
import { Backend } from "util/Backend";

function ChatPane() {
  const [messages, setMessagesList] = useState<Chat[]>([]);

  async function fetchMessagesList() {
    const messageList = await Backend.getMessageList();

    if (messageList === null) {
      console.error("fetchMessagesList: failed");
      return;
    }

    setMessagesList(messageList.reverse());
  }

  async function postMessage(message: string) {
    if (!(await Backend.addMessage(message)))
      console.error("addMessage: failed");
    await fetchMessagesList();
  }

  async function deleteMessage(id: number) {
    if (!(await Backend.deleteChat(id))) console.error("deleteMessage: failed");
    await fetchMessagesList();
  }

  useEffect(() => {
    fetchMessagesList();
  }, []);

  return (
    <div className="ChatPane">
      <ChatInputPane postMessage={postMessage} />
      {messages.map((chat) => (
        <ChatMessageComponent
          key={chat.id}
          chat={chat}
          deleteMessage={deleteMessage}
        />
      ))}
    </div>
  );
}

export { ChatPane };

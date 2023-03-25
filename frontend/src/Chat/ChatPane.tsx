import { useEffect, useState } from "react";
import ChatMessageComponent from "./ChatMessageComponent";
import "./ChatPane.css";
import ChatInputPane from "./input/ChatInputPane";
import { Chat } from "types";
import { Backend } from "util/Backend";

const fetchMessagesList = async (setMessagesList) => {
  const messageList = await Backend.getMessageList();

  if (messageList === null) {
    console.error("fetchMessagesList: failed");
    return;
  }

  setMessagesList(messageList.reverse());
};

function ChatPane() {
  const [messages, setMessagesList] = useState<Chat[]>([]);

  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    fetchMessagesList(setMessagesList);
  }, [lastUpdated]);

  return (
    <div className="ChatPane">
      <ChatInputPane setLastUpdated={setLastUpdated} />
      {messages.map((chat) => (
        <ChatMessageComponent
          chat={chat}
          key={chat.id}
          setLastUpdated={setLastUpdated}
        />
      ))}
    </div>
  );
}

export default ChatPane;

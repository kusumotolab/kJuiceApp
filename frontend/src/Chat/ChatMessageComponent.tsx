import "./ChatMessageComponent.css";
import DefaultIcon from "./../image/userimg/defaultimg.png";
import { Backend } from "util/Backend";
import { Chat } from "types";
import { Dispatch, SetStateAction } from "react";

type Props = {
  chat: Chat;
  setLastUpdated: Dispatch<SetStateAction<string>>;
};

function ChatMessageComponent({ chat, setLastUpdated }: Props) {
  const fetchChatDelete = async (id: number) => {
    if (!(await Backend.deleteChat(id)))
      console.error("fetchChatDelete: failed");
  };

  return (
    <div className="ChatMessageComponent">
      <img src={DefaultIcon} alt="icon" />
      <div className="MessageBox">
        {chat.message}
        <div className="MessageBox-bottom-pane">
          <div className="ChatMessageDate">{chat.date}</div>
          <button
            className="DeleteButton"
            onClick={async () => {
              await fetchChatDelete(chat.id);
              const date = new Date();
              setLastUpdated(
                // TODO 日付フォーマットできるライブラリを使う
                date.getFullYear() +
                  "/" +
                  ("0" + (date.getMonth() + 1)).slice(-2) +
                  "/" +
                  ("0" + date.getDate()).slice(-2) +
                  " " +
                  ("0" + date.getHours()).slice(-2) +
                  ":" +
                  ("0" + date.getMinutes()).slice(-2) +
                  ":" +
                  ("0" + date.getSeconds()).slice(-2) +
                  "." +
                  date.getMilliseconds()
              );
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export { ChatMessageComponent };

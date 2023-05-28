import "./ChatMessageComponent.css";
import DefaultIcon from "./../image/userimg/defaultimg.png";
import { Chat } from "types";
import { DateFormatter } from "util/DateFormatter";

type Props = {
  chat: Chat;
  deleteMessage: (id: number) => Promise<void>;
};

function ChatMessageComponent({ chat, deleteMessage }: Props) {
  function handleDelete() {
    deleteMessage(chat.id);
  }

  return (
    <div className="ChatMessageComponent">
      <img src={DefaultIcon} alt="icon" />
      <div className="MessageBox">
        {chat.message}
        <div className="MessageBox-bottom-pane">
          <div className="ChatMessageDate">
            {DateFormatter.convertDateFormat(chat.date)}
          </div>
          <button className="DeleteButton" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export { ChatMessageComponent };

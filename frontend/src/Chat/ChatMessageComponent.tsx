import "./ChatMessageComponent.css";
import DefaultIcon from "./../image/userimg/defaultimg.png"

const fetchChatDelete = async (id) =>{
    await fetch(`${window.location.protocol}//${window.location.host}${window.location.pathname}backend/chat/delete?id=${id}`, {
        method: 'GET',
        mode: 'cors'
    });
}

function ChatMessageComponent(props){
    return(
        <div className="ChatMessageComponent">
            <img src={DefaultIcon}/>
            <div className="MessageBox">
                {props.chat.message}
                <div className="MessageBox-bottom-pane">
                    <div className="ChatMessageDate">
                        {props.chat.date}
                    </div>
                    <button
                        className="DeleteButton"
                        onClick={async () => {
                            await fetchChatDelete(props.chat.id);
                            let date = new Date();
                            props.setLastUpdated(date.getFullYear() + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' +('0' + date.getDate()).slice(-2) + ' ' +  ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2) + '.' + date.getMilliseconds())

                        }}>
                        Delete
                    </button> 
                </div>
            </div>
        </div>
    );
}

export default ChatMessageComponent;

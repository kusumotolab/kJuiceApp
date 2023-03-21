import { animated, useSpring } from "react-spring";
import styled from "styled-components";

function CompleteMessage({show,setShow}){
    const styles = useSpring({
        right: show? "0em":"-8em",
    })
    return(
        <MessagePane as={animated.div} style={styles}>
            購入完了
        </MessagePane>
    );
}

const MessagePane = styled.div`
    display:flex;
    color:white;
    justify-content: center;
    align-items:center;
    position:absolute;
    right:0;
    top:2em;
    width:8em;
    height:3em;
    background-color:#F37167;
    font-size:2em;
    border-radius: 2em 0 0 2em;
`

export default CompleteMessage;

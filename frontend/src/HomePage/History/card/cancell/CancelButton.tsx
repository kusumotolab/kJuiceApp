import { useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { History } from "types";
import { Backend } from "util/Backend";

type Props = {
  history: History;
  updateHistory: () => void;
};

function CancelButton({ history, updateHistory }: Props) {
  const [cancel_toggle, setCancelToggle] = useState(false);

  async function postRecall(history: History) {
    if (!(await Backend.recall(history))) console.error("postRecall: failed");
  }

  function handle_cancel_toggle() {
    setCancelToggle(!cancel_toggle);
  }

  const cancel_style = useSpring({
    width: cancel_toggle ? "5em" : "0em",
    border: "none",
    padding: ".5em 0em",
    color: "white",
    backgroundColor: "red",
    marginLeft: "auto",
    height: "100%",
  });

  const opacity_style = useSpring({ opacity: cancel_toggle ? 1 : 0 });
  const rotate_style = useSpring({
    transform: cancel_toggle ? "rotate(180deg)" : "rotate(0deg)",
  });

  return (
    <CancelButtonPane>
      <animated.button
        style={cancel_style}
        onClick={async () => {
          setCancelToggle(false);
          await postRecall(history);
          updateHistory();
        }}
      >
        <animated.span style={opacity_style}>Cancel</animated.span>
      </animated.button>
      <CancelToggleButton
        onClick={() => {
          handle_cancel_toggle();
        }}
      >
        <animated.div style={rotate_style}>▶︎</animated.div>
      </CancelToggleButton>
    </CancelButtonPane>
  );
}

const CancelButtonPane = styled.div`
  width: 15%;
  position: relative;
  display: flex;
  right: 0;
`;

const CancelToggleButton = styled.button`
  position: relative;
  height: 100%;
  background-color: rgb(48, 48, 48);
  vertical-align: middle;
  padding: 0.5em;
  top: 0;
  right: 0;
  color: greenyellow;
  border: 0;
`;

export { CancelButton };

import { ReactNode, useState } from "react";
import "./PullDownMenu.css";
import { useSpring, animated } from "react-spring";

interface Props {
  summary: string;
  children: ReactNode;
}

function PullDownMenu({ summary, children }: Props) {
  const [isVisible, setVisibility] = useState(false);

  const styles = useSpring({
    to: { height: isVisible ? "auto" : 0 },
    from: { height: isVisible ? 0 : "auto" },
  });

  return (
    <div className="PullDownMenu">
      <button
        className="SummaryButton"
        onClick={() => {
          setVisibility(!isVisible);
        }}
      >
        <div className="pull-down-menu-summary">
          <div className={`${isVisible ? "rotate-90" : "rotate-0"}`}>▶︎</div>
          {summary}
        </div>
      </button>
      <animated.div
        className={`PullDownMenu-Content ${isVisible ? "visible" : ""}`}
        style={styles}
      >
        {children}
      </animated.div>
    </div>
  );
}

export { PullDownMenu };

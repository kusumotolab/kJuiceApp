import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";

type Props = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

function PasswordPane({ visible, setVisible }: Props) {
  const [password, setPassword] = useState("");

  return (
    <PasswordPaneMain style={{ visibility: visible ? "visible" : "hidden" }}>
      <PassWordInputWindow>
        <TitleBar>
          <ExitButton />
          <CloseButton />
          <OpenButton />
          管理者権限
        </TitleBar>
        <PassWordInputWindowContent>
          パスワードを入力してください
          <br />
          <br />
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            onClick={() => {
              if (password == "password") {
                setVisible(false);
              } else {
                alert("パスワードが違います");
              }
            }}
          >
            入力
          </button>
          <br />
          ヒント: 円周率の下4桁
        </PassWordInputWindowContent>
      </PassWordInputWindow>
    </PasswordPaneMain>
  );
}

const PasswordPaneMain = styled.div`
  position: absolute;
  background-color: gray;
  left: 0;
  right: 0;
  bottom: 0;
  top: 6em;
  z-index: 10;
`;

const ExitButton = styled.div`
  width: 0.8em;
  height: 0.8em;
  margin: 0.35em 0.2em;
  background-color: red;
  border-radius: 0.5em;
`;

const CloseButton = styled.div`
  width: 0.8em;
  height: 0.8em;
  margin: 0.35em 0.2em;
  background-color: yellow;
  border-radius: 0.5em;
`;

const OpenButton = styled.div`
  width: 0.8em;
  height: 0.8em;
  margin: 0.35em 0.2em;
  margin-right: 1em;
  background-color: rgb(47, 202, 0);
  border-radius: 0.5em;
`;

const TitleBar = styled.div`
  width: 100%;
  height: 1.5em;
  border-radius: 0.5em 0.5em 0 0;
  background-color: #303030;
  color: greenyellow;
  padding: 0 0.5em;
  display: flex;
`;

const PassWordInputWindow = styled.div`
  position: relative;
  background-color: white;
  width: 24em;
  left: calc(50% - 12em);
  top: calc(30% - 5em);
  border-radius: 0.5em;
`;

const PassWordInputWindowContent = styled.div`
  padding: 0.5em;
`;
export { PasswordPane };

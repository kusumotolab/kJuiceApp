import { useState } from "react";
import { PullDownMenu } from "../../component/PullDownMenu";
import { UserAddPane } from "./UserAdd/UserAddPane";
import { UserDeletePane } from "./UserDelete/UserDeletePane";
import { ItemAddPane } from "./ItemAdd/ItemAddPane";
import { SendSlack } from "./SendSlack/SendSlack";
import { UnpaidMember } from "./UnpaidMember/UnpaidMember";
import { ItemDeletePane } from "./ItemDelete/ItemDeletePane";
import { PasswordPane } from "./PassWord/PassWordPane";
import styled from "styled-components";

function AdminPane() {
  const [passwordPaneVisible, setPasswordPaneVisible] = useState(true);

  return (
    <Admin>
      <PasswordPane
        visible={passwordPaneVisible}
        setVisible={setPasswordPaneVisible}
      />
      <TabPane />
      <ContentPane
        style={{ visibility: passwordPaneVisible ? "hidden" : "visible" }}
      >
        <PullDownMenu summary="ユーザの追加">
          <UserAddPane />
        </PullDownMenu>
        <PullDownMenu summary="ユーザの削除">
          <UserDeletePane />
        </PullDownMenu>
        <PullDownMenu summary="アイテムの登録">
          <ItemAddPane />
        </PullDownMenu>
        <PullDownMenu summary="アイテムの削除">
          <ItemDeletePane />
        </PullDownMenu>
        <PullDownMenu summary="slackへの通知">
          <SendSlack />
        </PullDownMenu>
        <PullDownMenu summary="金額未払い者の管理">
          <UnpaidMember />
        </PullDownMenu>
      </ContentPane>
    </Admin>
  );
}

const Admin = styled.div`
  width: 100%;
  height: 100%;
`;

const TabPane = styled.div`
  position: fixed;
  top: 0;
  z-index: -9;
  background-color: white;
  width: 100%;
  height: 2em;
`;

const ContentPane = styled.div`
  overflow-y: scroll;
  background-color: gray;
  position: absolute;
  bottom: 0em;
  top: 3em;
`;

export { AdminPane };

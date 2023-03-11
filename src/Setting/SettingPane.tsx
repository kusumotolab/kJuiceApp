import React, { useState } from "react";
import backgroundImg from "./../image/admin-background.jpeg";

import styled from "styled-components";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import AdminPane from "./Admin/AdminPane";
import Admin from "./Admin/AdminPane";
import UserSetting from "./User/UserSetting";

function SettingPane() {
  const [passwordPaneVisible, setPasswordPaneVisible] = useState(true);

  return (
    <Tabs>
      <TabList>
        <Tab>User</Tab>
        <Tab>Admin</Tab>
      </TabList>
      <TabPanel>
        <UserSetting />
      </TabPanel>
      <TabPanel>
        <Admin />
      </TabPanel>
    </Tabs>
  );
}

export default SettingPane;

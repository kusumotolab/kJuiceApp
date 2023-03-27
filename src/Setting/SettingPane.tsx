import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Admin from "./Admin/AdminPane";
import UserSetting from "./User/UserSetting";

function SettingPane() {
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

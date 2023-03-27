import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { AdminPane } from "./Admin/AdminPane";
import { UserSetting } from "./User/UserSetting";

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
        <AdminPane />
      </TabPanel>
    </Tabs>
  );
}

export { SettingPane };

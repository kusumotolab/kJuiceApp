import { AdminPane } from "./Admin/AdminPane";
import { UserSetting } from "./User/UserSetting";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

function SettingPane() {
    return (
        <Tabs>
            <TabList>
                <Tab>User</Tab>
                <Tab>Admin</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <UserSetting />
                </TabPanel>
                <TabPanel>
                    <AdminPane />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}

export { SettingPane };

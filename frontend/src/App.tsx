import "bootstrap/dist/css/bootstrap.min.css";
// import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./App.css";
import { ChatPane } from "./Chat/ChatPane";
import { HomePageParent } from "./HomePage/HomePageParent";
import { GraphPane } from "./Graph/GraphPane";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChartGantt,
    faHammer,
    faHouse,
    faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { SettingPane } from "./Setting/SettingPane";

import { ChakraProvider, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

function App() {
    const iconStyle: React.CSSProperties = { marginLeft: "0.4em" };

    return (
        <ChakraProvider>
            <Tabs>
                <TabList>
                    <Tab>
                        Home
                        <FontAwesomeIcon style={iconStyle} icon={faHouse} />
                    </Tab>
                    <Tab>
                        Graph
                        <FontAwesomeIcon style={iconStyle} icon={faChartGantt} />
                    </Tab>
                    <Tab>
                        Settings
                        <FontAwesomeIcon style={iconStyle} icon={faHammer} />
                    </Tab>
                    <Tab>
                        Chat
                        <FontAwesomeIcon style={iconStyle} icon={faMessage} />
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <HomePageParent />
                    </TabPanel>
                    <TabPanel>
                        <GraphPane />
                    </TabPanel>
                    <TabPanel>
                        <SettingPane />
                    </TabPanel>
                    <TabPanel>
                        <ChatPane />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </ ChakraProvider>
    );
}

export { App };

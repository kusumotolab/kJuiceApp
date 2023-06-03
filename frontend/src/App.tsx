import { HomePageParent } from "./HomePage/HomePageParent";
import { SettingPane } from "./Setting/SettingPane";
import { GraphPane } from "./Graph/GraphPane";
import { ChatPane } from "./Chat/ChatPane";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartGantt,
  faHammer,
  faHouse,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

import {
  ChakraProvider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { createContext, useState } from "react";

export const TabIndex = createContext(0);

function App() {
  const iconStyle: React.CSSProperties = { marginLeft: "0.4em" };
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <ChakraProvider>
      <Tabs onChange={(index) => setTabIndex(index)}>
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
          <TabPanel p={0}>
            <TabIndex.Provider value={tabIndex}>
              <HomePageParent />
            </TabIndex.Provider>
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
    </ChakraProvider>
  );
}

export { App };

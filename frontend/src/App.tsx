import {
  faGear,
  faHouse,
  faUserEdit,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import { createContext, useState } from "react";
import { MembersProvider } from "contexts/MembersContext";
import { ItemsProvider } from "contexts/ItemsContext";
import { Header } from "components/Header";
import { UserSetting } from "Setting/User/UserSetting";
import { AdminPane } from "Setting/Admin/AdminPane";
import { Home } from "features/home/Home";

export const TabIndex = createContext(0);

function App() {
  const [selectedMenu, setSelectedMenu] = useState("home");

  type ContentsType = {
    item: string;
    displayText: string;
    icon: IconDefinition;
    iconPosition: "left" | "right";
    contents: JSX.Element;
  }[];

  const contents: ContentsType = [
    {
      item: "home",
      displayText: "ホーム",
      icon: faHouse,
      iconPosition: "left",
      contents: <Home />,
    },
    {
      item: "memberSettings",
      displayText: "利用者設定",
      icon: faUserEdit,
      iconPosition: "right",
      contents: <UserSetting />,
    },
    {
      item: "settings",
      displayText: "管理者設定",
      icon: faGear,
      iconPosition: "right",
      contents: <AdminPane />,
    },
  ];

  function handleClickMenu(menu: string) {
    setSelectedMenu(menu);
  }

  return (
    <ChakraProvider>
      <MembersProvider>
        <ItemsProvider>
          <Flex flexDir="column">
            <Header
              contents={contents}
              selectedMenu={selectedMenu}
              onClickMenu={handleClickMenu}
            />
            <Box mt={16} h="calc(100vh - 64px)">
              {
                contents.find((content) => content.item === selectedMenu)
                  ?.contents
              }
            </Box>
          </Flex>
        </ItemsProvider>
      </MembersProvider>
    </ChakraProvider>
  );
}

export { App };

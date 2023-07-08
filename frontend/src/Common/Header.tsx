import { Center, Flex, Heading, HStack, Spacer } from "@chakra-ui/react";
import {
  faChartLine,
  faComments,
  faGear,
  faHistory,
  faHouse,
  faMoon,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type HeaderProps = {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
};

const HeaderText = new Map<string, string>([
  ["home", "ホーム"],
  ["graph", "売上"],
  ["chat", "チャット"],
  ["history", "購入履歴"],
  ["settings", "設定"],
]);

function Header({ selectedMenu, setSelectedMenu }: HeaderProps) {
  return (
    <>
      <Center>
        {/* ヘッダ内の要素幅に影響されずに上部中央に固定するためにFlexから切り離した */}
        <Heading pos="fixed" top={5} zIndex="101" size="md">
          {HeaderText.get(selectedMenu)}
        </Heading>
      </Center>
      <Flex
        pos="fixed"
        top="0"
        w="100%"
        h={16}
        justify="center"
        borderBottom="1px"
        borderColor="blackAlpha.300"
        bg="white"
        zIndex="100"
      >
        <Center>
          <HStack spacing={6} ml={6}>
            <HeaderIcon
              icon={faHouse}
              menu="home"
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
            <HeaderIcon
              icon={faChartLine}
              menu="graph"
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
            <HeaderIcon
              icon={faComments}
              menu="chat"
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
            <HeaderIcon
              icon={faHistory}
              menu="history"
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
          </HStack>
        </Center>
        <Spacer />
        <Center>
          <HStack spacing={6} mr={6}>
            <FontAwesomeIcon icon={faMoon} size="lg" />
            <HeaderIcon
              icon={faGear}
              menu="settings"
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
          </HStack>
        </Center>
      </Flex>
    </>
  );
}

type HeaderIconProps = {
  icon: IconDefinition;
  menu: string;
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
};

function HeaderIcon({
  icon,
  menu,
  selectedMenu,
  setSelectedMenu,
}: HeaderIconProps) {
  const color = menu === selectedMenu ? "teal" : "black";

  return (
    <FontAwesomeIcon
      icon={icon}
      size="lg"
      color={color}
      onClick={() => setSelectedMenu(menu)}
    />
  );
}

export { Header };
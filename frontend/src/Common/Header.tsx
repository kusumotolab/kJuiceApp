import {
  Center,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spacer,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
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

const HeaderText = new Map<string, string>([
  ["home", "ホーム"],
  ["graph", "売上"],
  ["chat", "チャット"],
  ["history", "購入履歴"],
  ["settings", "設定"],
]);

type HeaderIconProps = {
  icon: IconDefinition;
  menu: string;
  ariaLabel: string;
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
};

function HeaderIcon({
  icon,
  menu,
  ariaLabel,
  selectedMenu,
  setSelectedMenu,
}: HeaderIconProps) {
  const unselectedColor = useColorModeValue("blackAlpha.300", "white");
  const color = menu === selectedMenu ? "teal" : unselectedColor;

  return (
    <IconButton
      variant="unstyled"
      aria-label={ariaLabel}
      onClick={() => setSelectedMenu(menu)}
      icon={<FontAwesomeIcon icon={icon} size="lg" color={color} />}
    />
  );
}

type HeaderProps = {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
};

function Header({ selectedMenu, setSelectedMenu }: HeaderProps) {
  const { toggleColorMode } = useColorMode();

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
        zIndex="100"
      >
        <Center>
          <HStack spacing={2} ml={6}>
            <HeaderIcon
              icon={faHouse}
              menu="home"
              ariaLabel="ホーム"
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
            {/*
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
            */}
            <HeaderIcon
              icon={faHistory}
              menu="history"
              ariaLabel="購入履歴"
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
          </HStack>
        </Center>
        <Spacer />
        <Center>
          <HStack spacing={6} mr={6}>
            {/*
            <FontAwesomeIcon
              icon={faMoon}
              size="lg"
              onClick={toggleColorMode}
            />
            */}
            <HeaderIcon
              icon={faGear}
              menu="settings"
              ariaLabel="設定"
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
          </HStack>
        </Center>
      </Flex>
    </>
  );
}

export { Header };

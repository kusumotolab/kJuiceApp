import {
  Center,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type HeaderIconProps = {
  icon: IconDefinition;
  menu: string;
  ariaLabel: string;
  selectedMenu: string;
  onClickMenu: (menu: string) => void;
};

function HeaderIcon({
  icon,
  menu,
  ariaLabel,
  selectedMenu,
  onClickMenu,
}: HeaderIconProps) {
  const color = menu === selectedMenu ? "teal" : "black";

  return (
    <IconButton
      variant="unstyled"
      aria-label={ariaLabel}
      onClick={() => onClickMenu(menu)}
      icon={<FontAwesomeIcon icon={icon} size="lg" color={color} />}
    />
  );
}

type HeaderProps = {
  selectedMenu: string;
  onClickMenu: (menu: string) => void;
  contents: {
    item: string;
    displayText: string;
    icon: IconDefinition;
    iconPosition: "left" | "right";
    contents: JSX.Element;
  }[];
};

function Header({ contents, selectedMenu, onClickMenu }: HeaderProps) {
  return (
    <>
      <Center>
        {/* ヘッダ内の要素幅に影響されずに上部中央に固定するためにFlexから切り離した */}
        <Heading pos="fixed" top={5} zIndex="101" size="md">
          {
            contents.find((content) => content.item === selectedMenu)
              ?.displayText
          }
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
        bg="white"
      >
        <Center>
          <HStack spacing={2} ml={6}>
            {contents
              .filter((content) => content.iconPosition === "left")
              .map((content) => (
                <HeaderIcon
                  key={content.item}
                  icon={content.icon}
                  menu={content.item}
                  ariaLabel={content.displayText}
                  selectedMenu={selectedMenu}
                  onClickMenu={onClickMenu}
                />
              ))}
          </HStack>
        </Center>
        <Spacer />
        <Center>
          <HStack spacing={6} mr={6}>
            {contents
              .filter((content) => content.iconPosition === "right")
              .map((content) => (
                <HeaderIcon
                  key={content.item}
                  icon={content.icon}
                  menu={content.item}
                  ariaLabel={content.displayText}
                  selectedMenu={selectedMenu}
                  onClickMenu={onClickMenu}
                />
              ))}
          </HStack>
        </Center>
      </Flex>
    </>
  );
}

export { Header };

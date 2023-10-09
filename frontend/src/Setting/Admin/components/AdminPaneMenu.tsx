import { Center, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type AdminPaneMenuProps = {
  menuItems: { title: string; icon: IconDefinition; pane: JSX.Element }[];
  selectedMenuId: number;
  setSelectedMenuId: (id: number) => void;
};
export default function AdminPaneMenu(props: AdminPaneMenuProps) {
  const unselectedColor = useColorModeValue("black", "white");
  const { menuItems, selectedMenuId, setSelectedMenuId } = props;

  return (
    <>
      {menuItems.map((item, index) => {
        const isSelected = selectedMenuId === index;
        return (
          <Flex
            key={item.title}
            rounded={8}
            border="2px"
            borderColor={isSelected ? "teal.400" : "blackAlpha.200"}
            m={4}
            p={2}
            alignItems="center"
            onClick={() => {
              setSelectedMenuId(index);
            }}
          >
            <Center
              boxSize={8}
              rounded={8}
              border="1px"
              borderColor="blackAlpha.200"
            >
              <FontAwesomeIcon
                icon={item.icon}
                size="lg"
                color={isSelected ? "teal" : unselectedColor}
              />
            </Center>
            <Text ml={4} mb={0} textColor={isSelected ? "teal" : unselectedColor}>
              {item.title}
            </Text>
          </Flex>
        );
      })}
    </>
  );
}

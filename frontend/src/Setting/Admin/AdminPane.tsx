import { useState } from "react";
import { UserAddPane } from "./UserAdd/UserAddPane";
import { ItemAddPane } from "./ItemAdd/ItemAddPane";
import { SendSlack } from "./SendSlack/SendSlack";
import { UnpaidMember } from "./UnpaidMember/UnpaidMember";
import { ItemDeletePane } from "./ItemDelete/ItemDeletePane";
import { PasswordPane } from "./PassWord/PassWordPane";
import { MemberManagementPane } from "./MemberManagement/MemberManagementPane";
import {
  Text,
  Box,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { TwoColumnLayout } from "layout/TwoColumnLayout";
import { faShoppingCart, faUser, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  title: string;
  children: JSX.Element;
};

function SettingItem({ title, children }: Props) {
  return (
    <>
      <Heading as="h2" size="md" mb={4}>{title}</Heading>
      {children}
    </>
  );
}

type AdminPaneMenuProps = {
  menuItems: { title: string, icon: IconDefinition, pane: JSX.Element }[];
  selectedMenuId: number;
  setSelectedMenuId: (id: number) => void;
};
function AdminPaneMenu(props: AdminPaneMenuProps) {
  const { menuItems, selectedMenuId, setSelectedMenuId } = props;
  return (
    <>
      {menuItems.map((item, index) => (
        <Flex
          key={item.title}
          rounded={8}
          border="2px"
          borderColor={selectedMenuId === index ? "teal.400" : "blackAlpha.200"}
          m={4}
          p={2}
          alignItems="center"
          onClick={() => {
            setSelectedMenuId(index);
          }}
        >
          <FontAwesomeIcon icon={item.icon} size="2xl" />
          <Text ml={4} mb={0}>{item.title}</Text>
        </Flex>
      ))}
    </>
  );
}

function AdminPane() {
  const [passwordPaneVisible, setPasswordPaneVisible] = useState(true);
  const [selectedMenuId, setSelectedMenuId] = useState<number>(0);

  const menuItems: { title: string, icon: IconDefinition, pane: JSX.Element }[] = [
    { title: "ユーザの管理", icon: faUser, pane: <MemberManagementPane /> },
    { title: "商品の管理", icon: faShoppingCart, pane: <ItemDeletePane /> },
    { title: "Slackへの通知", icon: faUser, pane: <SendSlack /> },
    { title: "金額未払い者の管理", icon: faUser, pane: <UnpaidMember /> },
  ];

  return (
    <Box>
      {passwordPaneVisible ? (
        <PasswordPane
          visible={passwordPaneVisible}
          setVisible={setPasswordPaneVisible}
        />
      ) : (
        <TwoColumnLayout menu={<AdminPaneMenu menuItems={menuItems} selectedMenuId={selectedMenuId} setSelectedMenuId={setSelectedMenuId} />}>
          <Heading as="h2" size="md" mb={4}>{menuItems[selectedMenuId].title}</Heading>
          {menuItems[selectedMenuId].pane}
        </TwoColumnLayout>
      )}
    </Box>
  );
}

export { AdminPane };

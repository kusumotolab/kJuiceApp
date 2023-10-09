import { useState } from "react";
import { ItemManagementPane } from "./ItemManagement/ItemManagementPane";
import { MemberManagementPane } from "./MemberManagement/MemberManagementPane";
import { SendSlack } from "./SendSlack/SendSlack";
import { UnpaidMember } from "./UnpaidMember/UnpaidMember";
import { PasswordPane } from "./PassWord/PassWordPane";
import { Box, Heading } from "@chakra-ui/react";
import { TwoColumnLayout } from "layout/TwoColumnLayout";
import {
    faBell,
  faDollar,
  faGlassWater,
  faUser,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import AdminPaneMenu from "./components/AdminPaneMenu";

function AdminPane() {
  const [passwordPaneVisible, setPasswordPaneVisible] = useState(true);
  const [selectedMenuId, setSelectedMenuId] = useState<number>(0);

  const menuItems: {
    title: string;
    icon: IconDefinition;
    pane: JSX.Element;
  }[] = [
    { title: "利用者の管理", icon: faUser, pane: <MemberManagementPane /> },
    { title: "商品の管理", icon: faGlassWater, pane: <ItemManagementPane /> },
    { title: "Slackへの通知", icon: faBell, pane: <SendSlack /> },
    { title: "金額未払い者の管理", icon: faDollar, pane: <UnpaidMember /> },
  ];

  return (
    <Box>
      {passwordPaneVisible ? (
        <PasswordPane
          visible={passwordPaneVisible}
          setVisible={setPasswordPaneVisible}
        />
      ) : (
        <TwoColumnLayout
          h="calc(100vh - 64px)"
          menu={
            <AdminPaneMenu
              menuItems={menuItems}
              selectedMenuId={selectedMenuId}
              setSelectedMenuId={setSelectedMenuId}
            />
          }
        >
          <Heading as="h2" size="md" mb={4}>
            {menuItems[selectedMenuId].title}
          </Heading>
          {menuItems[selectedMenuId].pane}
        </TwoColumnLayout>
      )}
    </Box>
  );
}

export { AdminPane };

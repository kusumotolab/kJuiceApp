import { useState } from "react";
import { UserAddPane } from "./UserAdd/UserAddPane";
import { UserDeletePane } from "./UserDelete/UserDeletePane";
import { ItemAddPane } from "./ItemAdd/ItemAddPane";
import { SendSlack } from "./SendSlack/SendSlack";
import { UnpaidMember } from "./UnpaidMember/UnpaidMember";
import { ItemDeletePane } from "./ItemDelete/ItemDeletePane";
import { PasswordPane } from "./PassWord/PassWordPane";
import {
  Accordion,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
  Box,
  AccordionItem,
  Heading,
} from "@chakra-ui/react";
import { ItemIconChangePane } from "./ItemIconChange/ItemIconChangePane";

type Props = {
  title: string;
  item: JSX.Element;
};

function SettingItem({ title, item }: Props) {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>{item}</AccordionPanel>
    </AccordionItem>
  );
}

function AdminPane() {
  const [passwordPaneVisible, setPasswordPaneVisible] = useState(true);

  return (
    <Box w="2xl" m="auto">
      <Heading>管理者設定</Heading>
      {passwordPaneVisible ? (
        <PasswordPane
          visible={passwordPaneVisible}
          setVisible={setPasswordPaneVisible}
        />
      ) : (
        <Accordion allowToggle>
          <SettingItem title="ユーザの追加" item={<UserAddPane />} />
          <SettingItem title="ユーザの削除" item={<UserDeletePane />} />
          <SettingItem title="アイテムの登録" item={<ItemAddPane />} />
          <SettingItem title="アイテムの削除" item={<ItemDeletePane />} />
          <SettingItem
            title="アイテム画像の変更"
            item={<ItemIconChangePane />}
          />
          <SettingItem title="Slackへの通知" item={<SendSlack />} />
          <SettingItem title="金額未払い者の管理" item={<UnpaidMember />} />
        </Accordion>
      )}
    </Box>
  );
}

export { AdminPane };

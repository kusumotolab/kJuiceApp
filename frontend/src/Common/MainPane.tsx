import { Box } from "@chakra-ui/react";
import { ChatPane } from "Chat/ChatPane";
import { GraphPane } from "Graph/GraphPane";
import { HomePageParent } from "HomePage/HomePageParent";
import { SettingPane } from "Setting/SettingPane";

type MainPaneProps = {
  selectedMenu: string;
};

function MainPane({ selectedMenu }: MainPaneProps) {
  var content;
  switch (selectedMenu) {
    case "home":
      content = <HomePageParent />;
      break;
    case "settings":
      content = <SettingPane />;
      break;
    case "history":
      content = <GraphPane />;
      break;
    case "chat":
      content = <ChatPane />;
      break;
    default:
      content = <HomePageParent />;
      break;
  }

  return (
    <Box mt={16} p={4} h="calc(100vh - 64px)">
      {content}
    </Box>
  );
}

export { MainPane };

import { Box, Container } from "@chakra-ui/react";
import { ChatPane } from "Chat/ChatPane";
import { GraphPane } from "Graph/GraphPane";
import { HomePageParent } from "HomePage/HomePageParent";
import { SettingPane } from "Setting/SettingPane";

type ContentPaneProps = {
  selectedMenu: string;
};

function ContentPane({ selectedMenu }: ContentPaneProps) {
  var content;
  switch (selectedMenu) {
    case "home":
      content = <HomePageParent />;
      break;
    case "settings":
      content = <SettingPane />;
      break;
    case "graph":
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
    <Box mt={16} h="calc(100vh - 64px)">
      {content}
    </Box>
  );
}

export { ContentPane };

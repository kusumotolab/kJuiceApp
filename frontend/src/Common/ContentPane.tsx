import { Box, Container } from "@chakra-ui/react";
import { ChatPane } from "Chat/ChatPane";
import { GraphPane } from "Graph/GraphPane";
import { HistoryPane } from "History/HistoryPane";
import { HomepagePane } from "HomePage/HomepagePane";
import { SettingPane } from "Setting/SettingPane";

function ContentPane({ selectedMenu }: { selectedMenu: string }) {
  var content;
  switch (selectedMenu) {
    case "home":
      content = <HomepagePane />;
      break;
    case "history":
      content = <HistoryPane />;
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
      content = <HomepagePane />;
      break;
  }

  return (
    <Box mt={16} h="calc(100vh - 64px)">
      {content}
    </Box>
  );
}

export { ContentPane };

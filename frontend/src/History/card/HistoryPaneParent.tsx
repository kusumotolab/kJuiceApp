import { MemberPane } from "HomePage/Member/MemberPane";
import { TwoColumnLayout } from "layout/TwoColumnLayout";

function HistoryPaneParent() {
  return <TwoColumnLayout menu={<MemberPane />} content={<HistoryPane />} />;
}

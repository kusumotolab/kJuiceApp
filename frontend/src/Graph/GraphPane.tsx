import "bootstrap/dist/css/bootstrap.min.css";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import SellingBarGraph from "./selling/SellingBarGraph";
import LineChart from "./linechart/LineChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faChartSimple } from "@fortawesome/free-solid-svg-icons";

function GraphPane() {
  const iconStyle: React.CSSProperties = { marginLeft: "0.4em" };

  return (
    <Tabs>
      <TabList>
        <Tab>
          Hot Selling
          <FontAwesomeIcon style={iconStyle} icon={faChartSimple} />
        </Tab>
        <Tab>
          Sales
          <FontAwesomeIcon style={iconStyle} icon={faChartLine} />
        </Tab>
      </TabList>
      <TabPanel>
        <SellingBarGraph />
      </TabPanel>
      <TabPanel>
        <LineChart />
      </TabPanel>
    </Tabs>
  );
}

export default GraphPane;

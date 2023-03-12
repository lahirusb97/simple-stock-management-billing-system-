import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Dashboard from "./Dashboard";
import Billing from "./Billing";
import Stock from "./Stock";
import NewBill from "./NewBill";
import Repair from "./Repair";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
        >
          <Tab label="My Stock" {...a11yProps(0)} />
          {/* <Tab label="Dashboard" {...a11yProps(1)} /> */}
          <Tab label="Billing History" {...a11yProps(1)} />
          <Tab label="New Bill" {...a11yProps(2)} />
          <Tab label="Repair" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Stock />
      </TabPanel>
      {/* <TabPanel value={value} index={1}>
        <Dashboard />
      </TabPanel> */}
      <TabPanel value={value} index={1}>
        <Billing />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <NewBill />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Repair />
      </TabPanel>
    </Box>
  );
}

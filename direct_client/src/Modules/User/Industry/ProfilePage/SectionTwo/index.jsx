import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Slide, Tab, styled } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import TabOne from "./TabOne";
import TabTwo from "./TabTwo";
import { TransitionGroup } from "react-transition-group";

const TabPanelCustome = styled(TabPanel)(({ theme }) => ({
  paddingInline: "0px",
  maxWidth: "100%",
}));

const TabsCustom = styled(TabList)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    background: "green !important",
    color: "green !important",
  },
  "& .Mui-selected": {
    background: "#F5F8FF",
    color: "green !important",
  },
}));
const TabCustom = styled(Tab)(({ theme }) => ({
  border: "1px solid #E9E9EB",
  "& .Mui-selected": {
    background: "#F5F8FF",
  },
}));
function SectionTwo({ profileData }) {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const industry = profileData?.industry;
  return (
    <TabContext sx={{ paddingBlock: "none", width: "100%" }} value={value}>
      <Box>
        <TabsCustom onChange={handleChange}>
          <TabCustom label="Basic Information" value="1" />
          <TabCustom label="Organizational Details" value="2" />
        </TabsCustom>
      </Box>
      <TabPanelCustome sx={{ overflow: "hidden" }} value="1">
        <TransitionGroup>
          <Slide direction="right" timeout={400}>
            <div>
              <TabOne profileData={industry} />
            </div>
          </Slide>
        </TransitionGroup>
      </TabPanelCustome>
      <TabPanelCustome value="2" sx={{ overflow: "hidden" }}>
        <TransitionGroup>
          <Slide direction="right" timeout={400}>
            <div>
              <TabTwo profileData={industry} />
            </div>
          </Slide>
        </TransitionGroup>
      </TabPanelCustome>
    </TabContext>
  );
}

export default SectionTwo;

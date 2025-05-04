import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Grow, Slide, Tab, styled } from "@mui/material";
import { useState } from "react";
import TabOne from "./Subcomponents/TabOne";
import TabTwo from "./Subcomponents/TabTwo";
import TabThree from "./Subcomponents/TabThree";
import TabFour from "./Subcomponents/TabFour";
import TabFive from "./Subcomponents/TabFive";
import TabSix from "./Subcomponents/TabSix";
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
  const academia = profileData?.academia;
  return (
    <div>
      {" "}
      <TabContext sx={{ paddingBlock: "none", width: "100%" }} value={value}>
        <Box>
          <Grow in={true} timeout={1000}>
            <TabsCustom onChange={handleChange}>
              <TabCustom label="Profile" value="1" />
              <TabCustom label="Projects" value="2" />
              <TabCustom label="Publications" value="3" />
              <TabCustom label="Intellectual Property" value="4" />
              <TabCustom label="Trainings" value="5" />
              <TabCustom label="Supervisions" value="6" />
            </TabsCustom>
          </Grow>
        </Box>
        <TabPanelCustome sx={{ overflow: "hidden", pl: 1 }} value="1">
          <TransitionGroup>
            <Slide timeout={500} direction="right">
              <div>
                <TabOne profileData={academia} />
              </div>
            </Slide>
          </TransitionGroup>
        </TabPanelCustome>
        <TabPanelCustome sx={{ overflow: "hidden", pl: 1 }} value="2">
          <TransitionGroup>
            <Slide timeout={500} direction="right">
              <div>
                <TabTwo profileData={academia} />
              </div>
            </Slide>
          </TransitionGroup>
        </TabPanelCustome>
        <TabPanelCustome sx={{ overflow: "hidden", pl: 1 }} value="3">
          <TransitionGroup>
            <Slide timeout={500} direction="right">
              <div>
                <TabThree profileData={academia} />
              </div>
            </Slide>
          </TransitionGroup>
        </TabPanelCustome>
        <TabPanelCustome sx={{ overflow: "hidden", pl: 1 }} value="4">
          <TransitionGroup>
            <Slide timeout={500} direction="right">
              <div>
                <TabFour profileData={academia} />
              </div>
            </Slide>
          </TransitionGroup>
        </TabPanelCustome>
        <TabPanelCustome sx={{ overflow: "hidden", pl: 1 }} value="5">
          <TransitionGroup>
            <Slide timeout={500} direction="right">
              <div>
                <TabFive profileData={academia} />
              </div>
            </Slide>
          </TransitionGroup>
        </TabPanelCustome>
        <TabPanelCustome sx={{ overflow: "hidden", pl: 1 }} value="6">
          <TransitionGroup>
            <Slide timeout={500} direction="right">
              <div>
                <TabSix profileData={academia} />
              </div>
            </Slide>
          </TransitionGroup>
        </TabPanelCustome>
      </TabContext>
    </div>
  );
}

export default SectionTwo;

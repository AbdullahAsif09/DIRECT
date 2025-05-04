import { Box, Grid, Tab, styled } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import Draft from "./Draft";
import All from "./All";
import New from "./New";
import MainPageIntro from "../Admin/MainPageIntro";
import { useSelector } from "react-redux";

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
function ViewProjects() {
  const [value, setValue] = useState("1");
  const handleChange = (e, v) => setValue(v);
  const profile = useSelector((state) => state.profile.profile);

  return (
    <Grid container rowGap={3} sx={{ marginTop: 5 }}>
      <Grid item xs={12}>
        <MainPageIntro
          title={"Overview"}
          description={`Overview and Project Highlights - Unveiling the key facets and
          noteworthy achievements that define the essence of the project.
        `}
        />
      </Grid>
      <Grid item xs={12}>
        <TabContext sx={{ paddingBlock: "none", width: "100%" }} value={value}>
          <Box>
            <TabsCustom onChange={handleChange}>
              <TabCustom label="Projects" value="1" />
              {profile?.role?.includes("super") && (
                <TabCustom label="Draft" value="2" />
              )}
              {profile?.role?.includes("super") && (
                <TabCustom label="New Project Requirments" value="3" />
              )}
            </TabsCustom>
          </Box>
          <TabPanelCustome value="1">
            <All />
          </TabPanelCustome>
          <TabPanelCustome value="2">
            <Draft />
          </TabPanelCustome>
          <TabPanelCustome value="3">
            <New setValue={setValue} />
          </TabPanelCustome>
        </TabContext>
      </Grid>
    </Grid>
  );
}

export default ViewProjects;

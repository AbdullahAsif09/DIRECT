import { Grid, Stack } from "@mui/material";
import Sidebar from "../Sidebar";
import About from "../About";
import { educationData } from "./data";
import CardsData from "../CardsData";
import { useWindowSize } from "@hooks";

function TabOne({ profileData }) {
  const windowWidth = useWindowSize();
  return (
    <Grid
      container
      flexDirection={windowWidth < 1200 ? "column-reverse" : "row"}
      rowGap={2}
    >
      <Grid item xs={12} lg={8.5} xl={9}>
        <Stack direction={"column"} spacing={3}>
          <About profileData={profileData} />
          <CardsData
            headingData={"Education"}
            contentData={educationData}
            profileData={profileData?.qualificationSection}
            qualificationSection
          />
          <CardsData
            profileData={profileData?.experienceSection}
            headingData={"Experience"}
            contentData={educationData}
            experienceSection
          />
        </Stack>
      </Grid>
      <Grid item xs={12} lg={3.5} xl={3}>
        <Sidebar profileData={profileData} />
      </Grid>
    </Grid>
  );
}
export default TabOne;

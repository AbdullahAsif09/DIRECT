import { Grid, Stack } from "@mui/material";
import Sidebar from "../Sidebar";
import About from "../About";
import CardsData from "../CardsData";
import Award from "../CardsData/Award";
import Scopus from "../CardsData/Scopus";
import { educationData } from "../TabOne/data";
 
function TabTwo({ profileData }) {
  return (
    <Grid container>
      <Grid item lg={8} xl={9}>
        <Stack direction={"column"} spacing={3}>
          <CardsData
            headingData={"Research Projects"}
            contentData={educationData}
            researchProjectsSection={true}
            profileData={profileData.researchProjectsSection}
            project
          />
          <CardsData
            headingData={"Industrial Projects"}
            contentData={educationData}
            industrialProjectsSection={true}
            profileData={profileData.industrialProjectsSection}
            project
          />
        </Stack>
      </Grid>
      <Grid item lg={4} xl={3}>
        <Sidebar profileData={profileData}  />
      </Grid>
    </Grid>
  );
}

export default TabTwo;

import { Grid, Stack } from "@mui/material";
import Sidebar from "../Sidebar";
import About from "../About";
import CardsData from "../CardsData";
import Award from "../CardsData/Award";
import Scopus from "../CardsData/Scopus";
import { educationData } from "../TabOne/data";

function TabThree({ profileData }) {
  return (
    <Grid container>
      <Grid item lg={8} xl={9}>
        <Stack direction={"column"} spacing={3}>
          <CardsData
            headingData={"Research Articles"}
            contentData={educationData}
            profileData={profileData.researchArticlesSection}
            researchArticlesSection
          />
          <CardsData
            headingData={"Conference Proceedings"}
            contentData={educationData}
            profileData={profileData.conferenceSection}
            conferenceSection
          />
          <CardsData
            headingData={"Book Chapter"}
            contentData={educationData}
            profileData={profileData.bookChapSection}
            bookChapSection
            publications
          />
          <CardsData
            headingData={"Book"}
            profileData={profileData.bookSection}
            contentData={educationData}
            bookSection
          />
          <CardsData
            headingData={"Editorial"}
            profileData={profileData.editorialSection}
            contentData={educationData}
            editorialSection
          />
        </Stack>
      </Grid>
      <Grid item lg={4} xl={3}>
        <Sidebar profileData={profileData} />
      </Grid>
    </Grid>
  );
}

export default TabThree;

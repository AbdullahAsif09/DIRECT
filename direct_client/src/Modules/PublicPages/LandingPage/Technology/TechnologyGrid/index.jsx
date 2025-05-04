import { Grid, Typography } from "@mui/material";
import { SectionContainer } from "@common/UI";
import SwiperGrid from "./SwiperGrid.jsx";

const TechnologyGrid = () => {
  return (
    <SectionContainer>
      <Grid justifyContent={"center"} container>
        <Grid item>
          <Typography variant="h1" textAlign={"center"} marginBottom={"6rem"}>
            Technology Grid
          </Typography>
        </Grid>
        <Grid sx={{ width: "100%" }} item>
          <SwiperGrid />
        </Grid>
      </Grid>
    </SectionContainer>
  );
};

export default TechnologyGrid;

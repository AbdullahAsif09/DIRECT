import { Card, Grid, Typography, styled } from "@mui/material";
import TabsSection from "./TabsSection";
import Headings from "../Headings";
const Container = styled(Card)(({ theme }) => ({
  padding: "2rem 1.5rem",
}));

function SectionOne({ data }) {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Headings title={"Overview"} />
        </Grid>
        <Grid item xs={12}>
          <TabsSection data={data} />
        </Grid>
      </Grid>
      
    </Container>
  );
}

export default SectionOne;

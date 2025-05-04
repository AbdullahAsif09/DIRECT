import { Button, Divider, Grid, Typography, styled } from "@mui/material";
import Accordions from "./Accordions";
import Headings from "../Headings";
const LastGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
}));
const Dividers = styled("div")(({ theme }) => ({
  width: "70px",
  marginTop: "10px",
  display: "flex",
  justifyContent: "space-between",
}));
const LeftBorder = styled("div")(({ theme }) => ({
  width: "70%",
  border: "2px solid #3787FF",
  borderRadius: "7px",
}));
const RightBorder = styled("div")(({ theme }) => ({
  width: "20%",
  border: "2px solid #3787FF",
  borderRadius: "17px",
}));
function SectionTwo({ data }) {
  return (
    <Grid container gap={3}>
      <Grid item xs={12}>
        <Headings title={"FAQ's"} />
      </Grid>
      <Grid item xs={12}>
        <Accordions dataAccodions={data} />
      </Grid>
      {/* <LastGrid item xs={12}>
        <Button variant="outlined">View All</Button>
      </LastGrid> */}
    </Grid>
  );
}

export default SectionTwo;

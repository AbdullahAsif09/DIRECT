import { Grid, Typography, styled } from "@mui/material";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import DisplayUploadedFiles from "../../DisplayUploadedFiles";
import Headings from "./Headings";
const GRID = styled(Grid)(({ theme }) => ({
  backgroundColor: "#DCE8FF",
  paddingInline: "15px",
  paddingBlock: "15px",
  borderRadius: "5px",
  ["@media screen  and (min-width:1799px)"]: {
    marginTop: "13.5rem",
  },
}));
function RightSection({ data }) {
  return (
    <GRID container gap={8}>
      <Grid item xs={12}>
        <SectionOne data={data} />
      </Grid>
      <Grid item xs={12}>
        {/* <DisplayUploadedFiles heading={<Headings title={"Uploaded Files"} />} /> */}
      </Grid>
      <Grid item xs={12}>
        <SectionTwo data={data} />
      </Grid>
    </GRID>
  );
}

export default RightSection;

import { Grid } from "@mui/material";
import InputFields from "../../../../InputFields/InputFields";
import Editor from "../../../../Editor";

function PhysicalAspect() {
  return (
    <Grid container>
      <Grid sx={{ p: 1, pt: 0 }} item md={12}>
        <Editor />
      </Grid>
    </Grid>
  );
}

export default PhysicalAspect;

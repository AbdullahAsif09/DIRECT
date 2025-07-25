import { Grid } from "@mui/material";
import React from "react";
import InputFields from "../../../../InputFields/InputFields";
import Editor from "../../../../Editor";
function Specs() {
  return (
    <div>
      <Grid container>
        <Grid sx={{ p: 1, pt: 0 }} item md={12}>
          <Editor />
        </Grid>
      </Grid>
    </div>
  );
}

export default Specs;

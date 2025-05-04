import { Grid } from "@mui/material";
import React from "react";
import InputFields from "../../../../InputFields/InputFields";
import Editor from "../../../../Editor";
function Logistics() {
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

export default Logistics;

import { Grid, Paper } from "@mui/material";
import React from "react";
import Objective from "./Objective";

function AboutPage() {
  return (
    <Grid
      sx={{ width: "90%", margin:"auto", }}
      container
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Paper sx={{margin:"20px", padding:"20px"}} elevation={4}>
        <Grid item={11}>
          <Objective />
        </Grid>
      </Paper>
    </Grid>
  );
}

export default AboutPage;

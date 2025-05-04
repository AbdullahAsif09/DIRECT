import React from "react";

import { Grid } from "@mui/material";

import MilestoneCard from "./Cards/Milestone";
const Activity = () => {
  return <Grid container pt={4} pb={4}>
    <MilestoneCard/>
  </Grid>;
};

export default Activity;

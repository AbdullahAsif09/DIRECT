import { Grid, Typography } from "@mui/material";
import React from "react";
import { AcceptedProposals } from "@common/Project";

const Proposals = () => {
  return (
    <Grid container pt={5} pb={5} sx={{ gap: "10px" }}>
      <Typography variant="h4" paddingY={2}>
        Proposals
      </Typography>
      <AcceptedProposals />
    </Grid>
  );
};

export default Proposals;

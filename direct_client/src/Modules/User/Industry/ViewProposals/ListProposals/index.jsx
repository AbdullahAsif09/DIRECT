import { Grid, Typography } from "@mui/material";

function ListProposals() {
  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <Grid item xs={12}>
        <Typography textAlign={"center"} variant="h1" color={"lightgray"}>
          You have no proposals yet!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default ListProposals;

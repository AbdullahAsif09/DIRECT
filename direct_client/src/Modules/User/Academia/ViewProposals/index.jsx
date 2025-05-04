import { Fab, Grid, Stack } from "@mui/material";
import MainHeadings from "@common/AnimationMui/MainHeadings";
import ListProposals from "./ListProposals";
import { Add } from "@mui/icons-material";
function ViewProposals() {
  return (
    <Grid container sx={{ pt: 5, minHeight: "90vh", overflow: "hidden" }}>
      <Grid item xs={12}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <MainHeadings text={"Proposal"} />
          <Fab variant="extended" size="medium" sx={{ mr: 2 }}>
            <Add /> Add New
          </Fab>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <ListProposals />
      </Grid>
    </Grid>
  );
}

export default ViewProposals;

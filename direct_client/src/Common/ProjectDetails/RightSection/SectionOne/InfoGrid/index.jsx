import { Card, Grid, Stack } from "@mui/material";

function InfoGrid() {
  return (
    <Card sx={{padding:3}}>
      <Grid container sx={{height:"100%"}} justifyContent={"center"} alignItems={"stretch"}>
        <Grid item xs={6}>
          <Stack direction={"column"}></Stack>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </Card>
  );
}

export default InfoGrid;

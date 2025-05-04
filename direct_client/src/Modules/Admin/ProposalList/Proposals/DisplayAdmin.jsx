import { Avatar, Grid, Stack, Typography } from "@mui/material";

function DisplayAdmin({ dataUsers }) {
  return (
    <Grid container sx={{ p: 1 }} gap={2}>
      <Grid item xs={12}>
        <Stack direction={"row"} gap={2}>
          <Avatar />
          <Stack direction={"column"}>
            <Stack direction={"row"} alignItems={"center"} gap={1}>
              {dataUsers?.firstName && (
                <Typography variant="body1">
                  {dataUsers?.firstName + ` ` + dataUsers?.lastName}
                </Typography>
              )}
              {dataUsers?.name && (
                <Typography variant="body1">{dataUsers?.name}</Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default DisplayAdmin;

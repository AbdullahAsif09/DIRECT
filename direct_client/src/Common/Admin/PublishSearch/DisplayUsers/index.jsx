import { Avatar, Grid, Stack, Typography } from "@mui/material";

function DisplayUsers({ dataUsers }) {
  return (
    <Grid container sx={{ p: 1 }} gap={2}>
      <Grid item xs={12}>
        <Stack direction={"row"} gap={2}>
          <Avatar />
          <Stack direction={"column"}>
            <Stack direction={"row"} alignItems={"center"} gap={1}>
              <Typography variant="body1">{dataUsers?.name}</Typography>
              <Typography variant="body2">({dataUsers?.field})</Typography>
            </Stack>
            <Typography variant="body2" color={"text.grey"} fontWeight={500}>
              {dataUsers?.institute}
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default DisplayUsers;

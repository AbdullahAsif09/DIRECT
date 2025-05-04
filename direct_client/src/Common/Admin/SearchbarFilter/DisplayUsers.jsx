import { Avatar, Grid, Stack, Typography } from "@mui/material";

function DisplayUsers({ dataUsers }) {
  return (
    <Grid container sx={{ p: 1 }} gap={2}>
      <Grid item xs={12}>
        <Stack direction={"row"} gap={2}>
          <Avatar />
          <Stack direction={"column"}>
            <Stack direction={"row"} alignItems={"center"} gap={1}>
              <Typography variant="body1">
                {dataUsers?.firstName
                  ? dataUsers?.firstName + ` ` + dataUsers?.lastName
                  : dataUsers?.name}
              </Typography>
              {dataUsers?.field && (
                <Typography variant="body2">({dataUsers?.field})</Typography>
              )}
              {dataUsers?.category?.length > 0 &&
                dataUsers?.category?.map((e, i) => (
                  <Typography key={i} variant="body2">
                    ({e})
                  </Typography>
                ))}
            </Stack>
            {dataUsers?.institute && (
              <Typography variant="body2" color={"text.grey"} fontWeight={500}>
                {dataUsers?.institute}
              </Typography>
            )}
            {dataUsers?.currentUniversity && (
              <Typography variant="body2" color={"text.grey"} fontWeight={500}>
                {dataUsers?.currentUniversity}
              </Typography>
            )}
            {dataUsers?.companyName && (
              <Typography variant="body2" color={"text.grey"} fontWeight={500}>
                {dataUsers?.companyName}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default DisplayUsers;

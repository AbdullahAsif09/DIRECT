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
                {dataUsers?.userID?.id?.firstName
                  ? dataUsers?.userID?.id?.firstName +
                    ` ` +
                    dataUsers?.userID?.id?.lastName
                  : dataUsers?.userID?.id?.name}
              </Typography>
              {dataUsers?.userID?.id?.field && (
                <Typography variant="body2">
                  ({dataUsers?.userID?.id?.field})
                </Typography>
              )}
            </Stack>
            {dataUsers?.userID?.id?.institute && (
              <Typography variant="body2" color={"text.grey"} fontWeight={500}>
                {dataUsers?.userID?.id?.institute}
              </Typography>
            )}
            {dataUsers?.userID?.id?.currentUniversity && (
              <Typography variant="body2" color={"text.grey"} fontWeight={500}>
                {dataUsers?.userID?.id?.currentUniversity}
              </Typography>
            )}
            {dataUsers?.userID?.id?.companyName && (
              <Typography variant="body2" color={"text.grey"} fontWeight={500}>
                {dataUsers?.userID?.id?.companyName}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default DisplayUsers;

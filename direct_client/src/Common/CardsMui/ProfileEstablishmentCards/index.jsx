import { Description, DescriptionOutlined } from "@mui/icons-material";
import { Card, Divider, Grid, Stack, Typography, styled } from "@mui/material";
const TypographyGreen = styled(Typography)(({ theme }) => ({
  color: theme.palette.bg.greenMui,
}));
function ProfileEstablishmentCards({ profileData }) {
   return (
    <Card elevation={2} sx={{ p: 2 }}>
      <Grid container gap={2}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent={"space-between"}>
            <Stack direction="row" spacing={1}>
              <DescriptionOutlined />
              <Typography
                noWrap
                maxWidth={200}
                sx={{
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                variant="body1"
                fontWeight={600}
              >
                {profileData?.organization}
              </Typography>
            </Stack>
            <TypographyGreen fontWeight={600} variant="caption">
              {profileData.dateOfReg}
            </TypographyGreen>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">{profileData?.category}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent={"space-between"}>
            <TypographyGreen variant="body2" fontWeight={600}>
              {profileData?.regNo}
            </TypographyGreen>
            <Typography variant="body2" fontWeight={600}>
              {profileData?.awardedBy}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}

export default ProfileEstablishmentCards;

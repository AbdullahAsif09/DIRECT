import { Card, Stack, Typography } from "@mui/material";

function About({ profileData }) {
  return (
    <Card elevation={2} sx={{ p: 3, width: "98%" }}>
      <Stack direction={"column"} spacing={2}>
        <Typography variant={"h3"}>About</Typography>
        <Typography variant={"body1"}>{profileData?.description}</Typography>
      </Stack>
    </Card>
  );
}

export default About;

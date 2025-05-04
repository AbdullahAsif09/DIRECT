import { Card, Grid, Stack, Typography, styled } from "@mui/material";
const arrayData = [
  {
    title: "Our Mission",
    description:
      "Advancing national defence capabilities, promoting innovation, and fostering collaboration between academia and the defense sector",
  },
  {
    title: "Our Vision",
    description:
      "Pioneering Excellence in Defense Innovation and National Security",
  },
];
const StyledCards = styled(Card)(({ theme }) => ({
  padding: "20px",
  boxShadow: theme.palette.boxShadows.boxShadowCardsLight,
  width: "60%",
  height: "130px",
  margin: "auto",
}));
function MissionAndVision() {
  return (
    <Grid sx={{mt:2}} container justifyContent={"space-between"}>
      {arrayData.map((e, i) => (
        <Grid item sx={{ p: 1 }} xs={6}>
          <StyledCards>
            <Stack direction={"column"} gap={1}>
              <Typography variant="h2">{e.title}</Typography>
              <Typography variant="body2">{e.description}</Typography>
            </Stack>
          </StyledCards>
        </Grid>
      ))}
    </Grid>
  );
}

export default MissionAndVision;

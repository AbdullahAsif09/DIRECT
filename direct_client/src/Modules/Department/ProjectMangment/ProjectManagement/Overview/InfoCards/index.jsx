import { Card, Grid, Stack, Typography } from "@mui/material";
function InfoCards({ dataCards }) {
  if (!dataCards) {
    return;
  }
  return (
    <Card
      elevation={4}
      sx={{
        height: "100%",
        p: 3,
        borderTop: "5px solid" + dataCards.borderColor,
        borderRadius: "7px",
      }}
    >
      <Grid container gap={1}>
        <Grid item xs={12}>
          <Stack
            direction={"row"}
            alignItems={"flex-start"}
            justifyContent={"space-between"}
          >
            <Typography fontWeight={500} variant={"body2"}>
              {dataCards?.title}
            </Typography>
            {dataCards?.icon}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack flexWrap="wrap" direction="row" gap={1} alignItems="flex-end">
            <Typography variant="h2">{dataCards?.subTitleOne}</Typography>
            <Typography color="text.grey" fontWeight={600} variant="caption">
              {dataCards?.subTitleTwo}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}

export default InfoCards;

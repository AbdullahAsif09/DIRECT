import { useFormattedNumber } from "@hooks/index";
import { Card, Grid, Stack, Typography } from "@mui/material";
function InfoCards({ dataCards }) {
  if (!dataCards) {
    return;
  }
  const info = dataCards?.info ?? [];
  const fn = useFormattedNumber();
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
            alignItems={"center"}
            justifyContent={"space-between"}
            mt={-1}
          >
            <Typography fontWeight={600} variant={"body2"}>
              {dataCards?.title}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontSize: "18px",
                fontWeight: "700",
              }}
            >
              {fn(dataCards?.number, false)}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} mt={0.5}>
          <Stack gap={1}>
            {info?.map((item, index) => {
              return (
                <Stack
                  direction={"row"}
                  key={index}
                  gap={1}
                  alignItems={"center"}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      color: index === 0 ? "#1074D0" : "#02B2AF",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    {item?.number}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: "13px",
                      fontWeight: "400",
                      color: "black",
                    }}
                  >
                    {item?.text}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}

export default InfoCards;

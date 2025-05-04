import { AccountBox, Delete, Face } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  Typography,
  styled,
} from "@mui/material";
const ButtonDelete = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.bg.slightlyLightRed,
  "&:hover": {
    backgroundColor: theme.palette.bg.normalRed,
  },
}));
function Cards({ dataCards, sectionName }) {
  return (
    <Card
      sx={{
        m:1,
        pb: 6,
        pt: 7.5,
        pr: 4,
        pl: 4,
        boxShadow: "0px 0px 10px 0px rgba(7, 6, 18, 0.20)",
      }}
    >
      <Grid container gap={2}>
        <Grid item xs={12}>
          <Stack
            gap={2}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Avatar sx={{ width: "100px", height: "100px", mb: 1.5 }}></Avatar>
            <Typography textAlign={"center"} variant="h3" fontWeight={500}>
              {dataCards.name}
            </Typography>
            {sectionName === "Management Team" && (
              <Typography variant="body1" color={"GrayText"}>
                {dataCards.admin}
              </Typography>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Divider></Divider>
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={1.5}
          >
            <Button variant="contained" startIcon={<Face />}>
              Profile
            </Button>
            <ButtonDelete variant="contained" startIcon={<Delete />}>
              Remove
            </ButtonDelete>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Cards;

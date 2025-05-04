import { LogoWrapper } from "@common/Logo";
import { Grid } from "@mui/material";

function InfoText({ text = "Forgot Password" }) {
  return (
    <Grid
      item
      xs={12}
      className={"itemOne"}
      sx={{ mb: 3 }}
      justifyContent={"center"}
      display={"flex"}
      alignItems={"center"}
      gap={2}
    >
      <LogoWrapper width={"100px"} height={"100px"} />
      <h1>{text}</h1>
    </Grid>
  );
}

export default InfoText;

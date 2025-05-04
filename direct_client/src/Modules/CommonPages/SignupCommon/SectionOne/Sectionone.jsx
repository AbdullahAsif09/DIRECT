import { Button, Grid, styled } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate } from "react-router-dom";
const ButtonBack = styled(Button)(({ theme }) => ({
  // color: theme.palette.bg.green,
  color: "#949494",
  marginTop: "-100px",
}));
function Sectionone() {
  const navigate = useNavigate();
  return (
    <Grid container justifyContent={"center"} className={"signupSectionOne"}>
      <Grid item xs={11}>
        <ButtonBack
          onClick={() => navigate("/")}
          startIcon={<ArrowBackRoundedIcon />}
        >
          Back to home
        </ButtonBack>
      </Grid>
      <Grid item xs={12} className={"itemOne"}>
        <img src={"/assets/logo.svg"} alt="loading..." />
        <h1>Signup for Account</h1>
      </Grid>
      <Grid item xs={12} className={"itemTwo"}>
        <span>Became member ,you’ll get exclusive treatment</span>
      </Grid>
    </Grid>
  );
}

export default Sectionone;

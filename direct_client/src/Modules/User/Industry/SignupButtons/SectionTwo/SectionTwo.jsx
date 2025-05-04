import { Button, Grid, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SignupForm } from "@common/Forms/SignupForm";

function Sectiontwo() {
  const FlexBox = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }));
  const LoginText = styled("span")(({ theme }) => ({
    color: "#666565",
    marginBottom: "20px",
  }));
  const Academiabtn = styled(Button)(({ theme }) => ({
    paddingBlock: "12px",
    fontSize: "1.1rem",
    color: "white",
    backgroundColor: "#098E6E",
    textTransform: "capitalize",
    marginTop: "20px",
    "&:hover": {
      backgroundColor: "#098E6E",
    },
  }));
  const Industrybtn = styled(Button)(({ theme }) => ({
    paddingBlock: "12px",
    fontSize: "1.1rem",
    color: "#098E6E",
    backgroundColor: "transparent",
    border: "1px solid #098E6E",
    borderRadius: "10px",
    textTransform: "capitalize",
    marginTop: "20px",
  }));
  const LoginLink = styled(Link)(({ theme }) => ({
    color: "#075B2B",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "pointer",
  }));
  return (
    <Grid rowGap={4} container justifyContent={"center"} alignItems={"center"}>
      <Grid item xs={7}>
        <Industrybtn fullWidth>Industry</Industrybtn>
      </Grid>
      <Grid item xs={7}>
        <Academiabtn fullWidth>Academia</Academiabtn>
      </Grid>
    </Grid>
  );
}

export default Sectiontwo;

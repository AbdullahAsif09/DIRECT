import { Button, Grid, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputsNumber from "./InputsNumber";

const Container = styled("div")(({ theme }) => ({
  height:"100%",
  [theme.breakpoints.down("sm")]: {},
}));
const OtpHeadings = styled(Typography)(({ theme }) => ({
  color: "#474646",
  fontSize: "37px",
  margin: "auto",
}));
const OtpText = styled("span")(({ theme }) => ({
  color: "#474646",
  fontSize: "20px",
  margin: "auto",
  textAlign: "center",
}));
const OtpNumber = styled("strong")(({ theme }) => ({
  fontSize: "20px",
  margin: "auto",
  textAlign: "center",
}));
const FlexBox = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
const FlexBoxColumn = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "3rem",
}));
const LoginText = styled("span")(({ theme }) => ({
  color: "#666565",
  marginBottom: "20px",
}));
const SubmitBtn = styled(Button)(({ theme }) => ({
  paddingBlock: "12px",
  fontSize: "1.1rem",
  backgroundColor: "#0E5036",
  textTransform: "capitalize",
  marginBottom: "50px",
  marginTop: "20px",
  "&:hover": {
    backgroundColor: "#098E6E",
  },
}));
const LoginLink = styled(Link)(({ theme }) => ({
  color: "#075B2B",
  fontWeight: "600",
  fontSize: "16px",
  cursor: "pointer",
}));
function Sectiontwo() {
  return (
    <Container>
      <Grid
        rowGap={4}
        container
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item xs={11}>
          <FlexBoxColumn>
            <OtpHeadings variant="h4">OTP Verification</OtpHeadings>
            <OtpText>
              We Will send you a one time password on this Mobile Number
            </OtpText>
            <OtpNumber>+92 303000000</OtpNumber>
          </FlexBoxColumn>
        </Grid>
        <Grid item xs={11}>
          <InputsNumber />
        </Grid>
        <Grid item xs={11}>
          <Grid container justifyContent={"center"} alignItems={"center"}>
            <Grid item xs={9} sm={6}>
              <FlexBox>
                <SubmitBtn fullWidth variant="contained">
                  Submit
                </SubmitBtn>
              </FlexBox>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Sectiontwo;

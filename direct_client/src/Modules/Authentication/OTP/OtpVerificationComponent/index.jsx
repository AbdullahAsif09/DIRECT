import { Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputsNumber from "./InputsNumber";
import { useState } from "react";
import { setAlert } from "@store/Features/AlertSlice";
import { useDispatch } from "react-redux";
import { useAxios } from "@hooks";

const Container = styled("div")(({ theme }) => ({
  height: "100%",
  [theme.breakpoints.down("sm")]: {},
}));

const FlexBox = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
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

function OtpVerificationComponent({ API, data, loading }) {
  const { API: VerifyOtp, loading: verficationLoading } = useAxios();
  const dispatch = useDispatch();

  const [number, setnumber] = useState(null);
  const email = sessionStorage.getItem("email");

  const handleLogin = async () => {
    try {
      if (loading) return;
      const valuess = { otp: number, email };

      const dataa = await API({
        url: `account/verifyforgotpasswordotp`,
        method: "POST",
        object: valuess,
      });

      if (dataa?.token) {
        dispatch(
          setAlert({ status: "success", text: dataa?.result || "OTP Verified" })
        );
      } else {
        dispatch(
          setAlert({
            status: "error",
            text: dataa?.result || "Couldn't verify OTP!",
          })
        );
      }
    } catch (e) {
      const data = e?.response?.data;
      dispatch(
        setAlert({
          status: "error",
          text: data?.result || e?.message,
        })
      );
      console.log(e);
    }
  };
  return (
    <Container>
      <Grid
        rowGap={4}
        container
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item xs={11}>
          <InputsNumber
            VerifyOtp={VerifyOtp}
            setnumber={setnumber}
            number={number}
            verficationLoading={verficationLoading}
          />
        </Grid>
        <Grid item xs={11}>
          <Grid container justifyContent={"center"} alignItems={"center"}>
            <Grid item xs={9} sm={6}>
              <FlexBox>
                <SubmitBtn fullWidth variant="contained" onClick={handleLogin}>
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

export default OtpVerificationComponent;

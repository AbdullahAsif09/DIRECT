import OTPInput, { ResendOTP } from "otp-input-react";
import { styled } from "@mui/material/styles";
import { setAlert } from "@store/Features/AlertSlice";
import { useDispatch } from "react-redux";

const FlexBox = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "2rem",
}));
function InputsNumber({ setnumber, number, VerifyOtp, verficationLoading }) {
  const dispatch = useDispatch();
  const resendOTP = async () => {
    try {
      if (verficationLoading) return;
      const data = await VerifyOtp({
        url: `account/forgotpassword`,
        object: { email: sessionStorage.getItem("email") },
        method: "POST",
      });
      if (data?.result) {
        dispatch(
          setAlert({ status: "success", text: "OTP Sent Successfully" })
        );
        sessionStorage.setItem("email", sessionStorage.getItem("email"));
      } else {
        dispatch(
          setAlert({
            status: "error",
            text: data?.result || "Couldn't Send OTP!",
          })
        );
      }
    } catch (e) {
      const data = e?.response?.data;
      dispatch(
        setAlert({
          status: "error",
          text: data?.result || e?.message || "Couldn't Login!",
        })
      );
      console.log(e);
    }
  };
  return (
    <FlexBox>
      <OTPInput
        value={number}
        onChange={setnumber}
        autoFocus
        OTPLength={4}
        otpType="number"
        disabled={false}
      />
      <ResendOTP
        maxTime={60}
        className={"otp-resendbtn"}
        style={{
          cursor: "pointer",
          display: "flex",
          gap: "2rem",
          justifyContent: "center",
          alignItems: "center",
        }}
        onResendClick={() => {
          if (verficationLoading) return;
          resendOTP();
        }}
      />
    </FlexBox>
  );
}

export default InputsNumber;

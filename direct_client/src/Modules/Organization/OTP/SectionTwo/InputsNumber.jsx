import React, { useState } from "react";
import OTPInput, { ResendOTP } from "otp-input-react";
import { styled } from "@mui/material/styles";

const FlexBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection:"column",
  justifyContent: "center",
  alignItems: "center",
  gap:"2rem"
}));
function InputsNumber() {
  const [OTP, setOTP] = useState("");
  return (
    <FlexBox>
      <OTPInput
        value={OTP}
        onChange={setOTP}
        autoFocus
        OTPLength={4}
        otpType="number"
        disabled={false}
      />
      <ResendOTP
        className={"otp-resendbtn"}
        style={{ display: "flex", gap: "2rem", justifyContent:"center", alignItems:"center" }}
        onResendClick={() => console.log("Resend clicked")}
      />
    </FlexBox>
  );
}

export default InputsNumber;

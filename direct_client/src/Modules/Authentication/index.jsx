import { Routes, Route } from "react-router-dom";
import AuthLayout from "./Layout";
import AuthResetPassword from "./OTP";
import { ErrorContentAtCenterOfView } from "@common/UI";
const Authentication = () => {
  return (
    <>
      <Routes>
        <Route path={"signup"} element={<AuthLayout />} />
        <Route path={"/login"} element={<AuthLayout />} />
        <Route path={"/resetpassword"} element={<AuthResetPassword />} />
        <Route path={"/forgotpassword"} element={<AuthResetPassword />} />
        <Route
          path="*"
          element={
            <ErrorContentAtCenterOfView
              code={404}
              message="Resource Not Found!"
            />
          }
        />
      </Routes>
    </>
  );
};

export default Authentication;

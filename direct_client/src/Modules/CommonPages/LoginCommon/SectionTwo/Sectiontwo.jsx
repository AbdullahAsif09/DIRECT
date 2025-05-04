import { Button, Grid, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SigninForm } from "@common/Forms/SigninForm";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { formLoginSchema } from "@utils/FormValidation";
import { Spinner } from "@common/UI";
import { useEffect, useState } from "react";
import { setAlert } from "@store/Features/AlertSlice";
import { useDispatch } from "react-redux";
import { setProfile } from "@store/Features/ProfileSlice";
import { useAxios } from "@hooks";

const FlexBox = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
const LoginText = styled("span")(({ theme }) => ({
  color: "#666565",
}));
const SignupBtn = styled(Button)(({ theme }) => ({
  paddingBlock: "12px",
  fontSize: "1.1rem",
  backgroundColor: "#098E6E",
  textTransform: "capitalize",
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

function Sectiontwo({ emailsent, setEmailsent }) {
  const path = window.location.pathname;
  const segments = path.split("/");
  const [routeForSignup, setRouteForSignup] = useState("/fundingagency/signup");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { API, loading } = useAxios();
  const handleFundingAgency = async (values) => {
    try {
      const data = await API({
        url: "fundingAgency/login",
        method: "POST",
        object: values,
      });

      if (data?.userDetails) {
        dispatch(setProfile({ ...data?.userDetails }));
        dispatch(setAlert({ status: "success", text: data?.result }));
        navigate("/fundingagency/");
      } else {
        dispatch(
          setAlert({
            status: "error",
            text: data?.response?.data?.result || "Couldn't Login!",
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setAlert({
          status: "error",
          text: error?.response?.data?.result || "Couldn't send Email!",
        })
      );
    }
  };
  const handleUserAgency = async (values) => {
    try {
      const data = await API({
        url: "userAgency/login",
        method: "POST",
        object: values,
      });

      if (data?.userDetails) {
        dispatch(setProfile(data?.userDetails));
        dispatch(setAlert({ status: "success", text: data?.result }));
        navigate("/useragency/");
      } else {
        dispatch(
          setAlert({
            status: "error",
            text: data?.response?.data?.result || "Couldn't Login!",
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setAlert({
          status: "error",
          text: error?.response?.data?.result || "Couldn't send Email!",
        })
      );
    }
  };

  const handleLogin = async (values) => {
    if (segments[1]?.toLowerCase() === "fundingagency") {
      handleFundingAgency(values);
    } else if (segments[1]?.toLowerCase() === "useragency") {
      handleUserAgency(values);
    }
  };
  const handleRouteForSignup = () => {
    if (segments[1] === "useragency") {
      setRouteForSignup("/useragency/signup");
    }
  };
  useEffect(() => {
    handleRouteForSignup();
  }, []);
  return (
    <>
      <Spinner isLoading={loading} />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleLogin}
        validationSchema={formLoginSchema}
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Grid rowGap={4} container justifyContent={"center"} alignItems={"center"}>
                <Grid item xs={9}>
                  <SigninForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container justifyContent={"center"} alignItems={"center"}>
                    <Grid item xs={6}>
                      <FlexBox>
                        {/* <LoginText> */}
                        <LoginLink onClick={() => navigate("/fundingagency/resetpassword")}>
                          Forgot Password?
                        </LoginLink>
                        {/* </LoginText> */}
                      </FlexBox>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={11}>
                  <Grid container justifyContent={"center"} alignItems={"center"}>
                    <Grid item xs={8}>
                      <FlexBox>
                        <SignupBtn
                          // onClick={() => navigate("/createprofile")}
                          fullWidth
                          type="submit"
                          variant="contained"
                        >
                          Login to Account
                        </SignupBtn>
                      </FlexBox>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={7}>
                  <FlexBox>
                    <LoginText>
                      Don't have an account?{" "}
                      <LoginLink onClick={() => navigate(routeForSignup)}>Signup</LoginLink>
                    </LoginText>
                  </FlexBox>
                </Grid>

                <Grid item xs={11}></Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </>
  );
}

export default Sectiontwo;

import { formSignupSchema } from "@utils/FormValidation";
import { setAlert } from "@store/Features/AlertSlice";
import { SignupForm } from "@common/Forms/SignupForm";
import { Button, Grid, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Spinner } from "@common/UI";
import { useAxios } from "@hooks";
import { Formik } from "formik";
import { useGetRole } from "@hooks/index";

const FlexBox = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const LoginText = styled("span")(({ theme }) => ({
  color: "#666565",
}));
const SignupBtn = styled(Button)(({ theme }) => ({
  fontSize: "1.1rem",
  paddingBlock: "12px",
  backgroundColor: "#098E6E",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#098E6E",
  },
}));
const LoginLink = styled(Link)(({ theme }) => ({
  color: "#075B2B",
  fontSize: "16px",
  cursor: "pointer",
  fontWeight: "600",
}));

function Sectiontwo({ emailsent, setEmailsent }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useGetRole();
  const { API, loading } = useAxios();
  const path = window.location.pathname;
  const segments = path.split("/");
  const [routeLogin, setRouteLogin] = useState("/fundingagency/login");
  const handleSignup = async (values) => {
    try {
      const valuess = {
        ...values,
        name: values?.firstName + "" + values?.lastName,
      };
      let url = "fundingAgency/create";
      if (segments[1].toLowerCase() === "useragency") {
        url = "userAgency/create";
      }
      const data = await API({
        method: "post",
        url: url,
        object: valuess,
      });
      // const data = res.data;
      if (data?.type === "success") {
        dispatch(setAlert({ status: "success", text: data?.result }));
        // setEmailsent(values.email);
      } else {
        dispatch(
          setAlert({
            status: "error",
            text: data?.response?.data?.result || "Couldn't Login!",
          })
        );
      }
    } catch (e) {
      const data = e?.response?.data;
      dispatch(
        setAlert({
          status: "error",
          text: data?.result || e?.message || "Couldn't SendEmail!",
        })
      );
      console.log(e);
    }
  };
  const handleRouteLogin = () => {
    if (segments[1].toLowerCase() === "useragency") {
      setRouteLogin("/useragency/login");
    }
  };
  useEffect(() => {
    handleRouteLogin();
  }, []);

  return (
    <>
      <Spinner isLoading={loading} />
      <Formik
        initialValues={{
          email: "",
          phone: "",
          lastName: "",
          password: "",
          firstName: "",
          confirmpassword: "",
        }}
        onSubmit={handleSignup}
        validationSchema={formSignupSchema}
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Grid rowGap={4} container justifyContent={"center"} alignItems={"center"}>
                <Grid item xs={9}>
                  <SignupForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                  />
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
                          Signup for Account
                        </SignupBtn>
                      </FlexBox>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={7}>
                  <FlexBox>
                    <LoginText>
                      Have an account?
                      <LoginLink onClick={() => navigate(routeLogin)}>Login</LoginLink>
                    </LoginText>
                  </FlexBox>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </>
  );
}

export default Sectiontwo;

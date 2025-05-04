import { Formik } from "formik";
import { useAxios } from "@hooks/index";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { LogoWrapper } from "@common/Logo";
import { Grid, styled } from "@mui/material";
import { BackArrowButtonComp } from "@common/MUI";
import { SigninForm } from "@common/Forms/SigninForm";
import { SignupForm } from "@common/Forms/SignupForm";
import { setAlert } from "@store/Features/AlertSlice";
import { setProfile } from "@store/Features/ProfileSlice";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { formLoginSchema, formSignupSchema } from "@utils/FormValidation";

const FormComponent = () => {
  return (
    <div>
      <InfoComponent />
      <FormComp />
    </div>
  );
};

export default FormComponent;

const InfoComponent = () => {
  const { pathname } = useLocation();
  const isLogin = pathname.includes("login");
  const sentence = !isLogin ? "Signup" : "Login";

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"flex-start"}
      className={"signupSectionOne"}
      style={{ marginTop: "0px" }}
    >
      <Grid item xs={11}>
        <BackArrowButtonComp
          route={"/"}
          text="Back to Home"
          marginBottom={"50px"}
        />
      </Grid>
      <Grid item xs={12} className={"itemOne"} sx={{ mb: 3 }}>
        <LogoWrapper width={"100px"} height={"100px"} />
        <h1>{sentence}</h1>
      </Grid>
    </Grid>
  );
};
``;

const FormComp = () => {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const dispatch = useDispatch();
  const isLogin = pathname.includes("login");

  const { API, loading } = useAxios();

  const handlePost = async (values) => {
    const dataToSend = {
      email: values.email,
      password: values.password,
      name: values.firstName + " " + values.lastName,
      confirmpassword: values.confirmpassword,
      phone: values.phone,
    };

    try {
      dispatch(setAlert({ status: null, text: null }));
      const path = `account/${isLogin ? "signin" : "create"}`;
      const data = await API({
        url: path,
        object: dataToSend,
        method: "POST",
      });
      const response = data?.response?.data;
      if (response) {
        return dispatch(
          setAlert({
            status: "error",
            text: response?.result,
          })
        );
      }
      if (data?.type === "failure") {
        return dispatch(
          setAlert({
            status: "error",
            text: data?.result ?? "couldn't perform action",
          })
        );
      }
      dispatch(
        setAlert({
          status: "success",
          text:
            typeof data?.result == "string"
              ? data?.result
              : `${isLogin ? "Login" : "Signup"} Successfull!`,
        })
      );

      if (isLogin) {
        dispatch(setProfile(data.userDetails));
        const urlToGo = state?.from || state?.url;

        if (urlToGo?.startsWith("/user")) {
          /* if user is redirected from another page */
          navigate(state.from, { replace: true });
        } else navigate("/user/projects");
      } else {
        navigate("/login");
      }
    } catch (e) {
      dispatch(setAlert({ status: null, text: null }));
    }
  };

  const object = {
    email: "",
    password: "",
  };
  if (!isLogin) {
    object.password = "";
    object.firstName = "";
    object.lastName = "";
    object.phone = "";
  }
  const linkSignup = "/signup";
  const linkLogin = "/login";
  const linkresetPass = "/forgotpassword";

  return (
    <Formik
      initialValues={object}
      onSubmit={handlePost}
      validationSchema={isLogin ? formLoginSchema : formSignupSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Grid
              rowGap={4}
              mb={4}
              container
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Grid item xs={12} sm={12} lg={11} md={12}>
                {isLogin ? (
                  <SigninForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                  />
                ) : (
                  <SignupForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                  />
                )}
              </Grid>
              {isLogin ? (
                <Grid item xs={12}>
                  <Grid
                    container
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Grid item xs={6}>
                      <FlexBox>
                        <LoginLink to={linkresetPass}>
                          Forgot Password?
                        </LoginLink>
                      </FlexBox>
                    </Grid>
                  </Grid>
                </Grid>
              ) : null}
              <Grid item xs={12}>
                <Grid container justifyContent={"center"} alignItems={"center"}>
                  <Grid item xs={12} sm={7.4}>
                    <FlexBox>
                      <ButtonSolidLoading
                        fullWidth
                        type="submit"
                        variant="contained"
                        loading={loading}
                      >
                        {isLogin ? " Login to Account" : "Signup your account"}
                      </ButtonSolidLoading>
                    </FlexBox>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={7}>
                <FlexBox>
                  <LoginText>
                    {isLogin
                      ? "Don't have an account"
                      : "Already have an account"}
                    ?{" "}
                    <LoginLink to={isLogin ? linkSignup : linkLogin}>
                      {isLogin ? "Signup" : "Login"}
                    </LoginLink>
                  </LoginText>
                </FlexBox>
              </Grid>
            </Grid>
          </form>
        );
      }}
    </Formik>
  );
};

const FlexBox = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
const LoginText = styled("span")(({ theme }) => ({
  color: "#666565",
}));

const ButtonSolidLoading = styled(LoadingButton)(({ theme }) => ({
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

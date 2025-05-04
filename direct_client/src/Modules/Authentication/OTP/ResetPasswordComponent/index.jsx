import { Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SigninForm } from "@common/Forms/SigninForm";
import { Formik } from "formik";
import { setAlert } from "@store/Features/AlertSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const FlexBox = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const SignupBtn = styled(Button)(() => ({
  paddingBlock: "12px",
  fontSize: "1.1rem",
  backgroundColor: "#098E6E",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#098E6E",
  },
}));

function ResetPasswordComponent({ API, data, loading }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleApi = async (values) => {
    try {
      if (loading) return;
      if (!data?.token) {
        return dispatch(
          setAlert({
            status: "error",
            text: "Invalid Token",
          })
        );
      }
      if (!sessionStorage.getItem("email")) {
        return dispatch(
          setAlert({
            status: "error",
            text: "Please enter your email",
          })
        );
      }
      if (!values?.password) {
        return dispatch(
          setAlert({
            status: "error",
            text: "Please enter your password",
          })
        );
      }
      if (data?.token) {
        values["token"] = data?.token;
        values["email"] = sessionStorage.getItem("email");
        values["password"] = values?.password;
      }
      const dataa = await API({
        url: `account/resetPassword`,
        object: values,
        method: "POST",
      });
      if (dataa?.result && dataa) {
        dispatch(
          setAlert({
            status: "success",
            text: ` "Password changed Successfully`,
          })
        );
        sessionStorage.removeItem("email");
        navigate("/login");
      } else {
        dispatch(
          setAlert({
            status: "error",
            text: dataa?.result || "Couldn't Send OTP!",
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
    <>
      <Formik initialValues={{ password: "" }} onSubmit={handleApi}>
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
                container
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Grid item xs={12} sm={12} lg={8}>
                  <SigninForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    onlyPassword
                  />
                </Grid>

                <ButtonWrapper text={"Reset Password"} />
              </Grid>
            </form>
          );
        }}
      </Formik>
    </>
  );
}

const ButtonWrapper = ({ text }) => {
  return (
    <Grid item xs={11}>
      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Grid item xs={8}>
          <FlexBox>
            <SignupBtn fullWidth type="submit" variant="contained">
              {text}
            </SignupBtn>
          </FlexBox>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ResetPasswordComponent;

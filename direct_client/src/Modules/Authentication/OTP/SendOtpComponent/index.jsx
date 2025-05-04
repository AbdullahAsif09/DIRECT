import { Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

import { setAlert } from "@store/Features/AlertSlice";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { SigninForm } from "@common/Forms/SigninForm";

function SendOtpComponent({ API, loading }) {
  const dispatch = useDispatch();
  const handleSendOTP = async (values) => {
    try {
      if (loading) return;
      const valuess = values;

      const dataa = await API({
        url: `account/forgotpassword`,
        object: valuess,
        method: "POST",
      });
      if (dataa?.result && dataa && dataa?.type !== "failure") {
        dispatch(
          setAlert({
            status: "success",
            text: `OTP Sent  Successfully`,
          })
        );
        sessionStorage.setItem("email", values.email);
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
    <Container>
      <Grid
        rowGap={4}
        container
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item xs={11}>
          <Formik initialValues={{ email: "" }} onSubmit={handleSendOTP}>
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
                        onlyEmail
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} lg={8}>
                      <FlexBox>
                        <SubmitBtn
                          fullWidth
                          variant="contained"
                          type="submit"
                          sx={{ margin: 0 }}
                        >
                          Submit
                        </SubmitBtn>
                      </FlexBox>
                    </Grid>
                  </Grid>
                </form>
              );
            }}
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SendOtpComponent;

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

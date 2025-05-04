import { formEmailSchema } from "@utils/FormValidation";
import { SigninForm } from "@common/Forms/SigninForm";
import { setAlert } from "@store/Features/AlertSlice";
import SectionEmail from "../SectionEmail/Sectiontwo";
import { styled } from "@mui/material/styles";
import { Button, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { Spinner } from "@common/UI";
import { useAxios } from "@hooks";
import { useState } from "react";
import { Formik } from "formik";

const FlexBox = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
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

function EmailForm() {
  const [otpsent, setotpsent] = useState(false);
  const dispatch = useDispatch();
  const { loading, API } = useAxios();
  const handleLogin = async (values) => {
    try {
      const valuess = { ...values, type: "admin" };
      const data = await API({
        method: "post",
        url: "admin/otpsend",
        object: valuess,
      });

      if (data?.type === "success") {
        dispatch(
          setAlert({ status: "success", text: "OTP Sent Successfully" })
        );
        sessionStorage.setItem("email", values.email);
        setotpsent(true);
      } else {
        dispatch(
          setAlert({
            status: "error",
            text: data?.result || "Couldn't Send OTP!",
          })
        );
        setotpsent(false);
      }
    } catch (e) {
      const data = e?.response?.data;
      setotpsent(false);
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
      <Spinner isLoading={loading} />
      {otpsent ? (
        <SectionEmail setIsLoadng={loading} />
      ) : (
        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={handleLogin}
          validationSchema={formEmailSchema}
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
                  container
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Grid item xs={9}>
                    <SigninForm
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      onlyEmail
                    />
                  </Grid>

                  <Grid item xs={11}>
                    <Grid
                      container
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Grid item xs={8}>
                        <FlexBox>
                          <SignupBtn
                            fullWidth
                            type="submit"
                            variant="contained"
                          >
                            Send OTP
                          </SignupBtn>
                        </FlexBox>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={11}></Grid>
                </Grid>
              </form>
            );
          }}
        </Formik>
      )}
    </>
  );
}

export default EmailForm;

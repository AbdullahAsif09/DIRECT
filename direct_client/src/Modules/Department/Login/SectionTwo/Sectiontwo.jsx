import { Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SigninForm } from "@common/Forms/SigninForm";
import { Formik } from "formik";
import { formLoginSchema } from "../../../../utils/FormValidation";
import { Spinner } from "@common/UI";

import { setAlert } from "@store/Features/AlertSlice";
import { useDispatch } from "react-redux";
import { useAxios } from "@hooks";

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

function Sectiontwo({ emailsent, setEmailsent }) {
  const { API, loading } = useAxios();
  const dispatch = useDispatch();

  const handleLogin = async (values) => {
    try {
      const valuess = { ...values };

      const data = await API({
        method: "POST",
        url: "departments/login",
        object: valuess,
      });

      if (data?.type === "success") {
        dispatch(setAlert({ status: "success", text: data?.result }));
        setEmailsent(values.email);
      } else {
        dispatch(
          setAlert({
            status: "error",
            text:
              data?.response?.data?.result ??
              data?.result ??
              "Couldn't SendEmail!",
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
                        <SignupBtn fullWidth type="submit" variant="contained">
                          Login to Account
                        </SignupBtn>
                      </FlexBox>
                    </Grid>
                  </Grid>
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

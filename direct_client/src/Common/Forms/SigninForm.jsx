import { Grid } from "@mui/material";
import InputFields from "../InputFields/InputFields";
export const SigninForm = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  onlyEmail,
  onlyPassword,
}) => {
  const isCondition = onlyEmail || onlyPassword;

  const check = (condition) => {
    return isCondition
      ? condition == "email"
        ? onlyEmail && !onlyPassword
        : onlyPassword && !onlyEmail
      : true;
  };

  return (
    <Grid
      container
      rowGap={4}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      {check("email") ? (
        <Grid item xs={12}>
          <InputFields
            label={"Email"}
            required={true}
            placeholder={"Enter Your Email"}
            type={"email"}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values?.email}
            error={!!touched?.email && !!errors.email}
            helperText={touched?.email && errors.email}
          />
        </Grid>
      ) : null}
      {check("password") ? (
        <Grid item xs={12}>
          <InputFields
            required={true}
            label={"Password"}
            placeholder={"Enter Your Password"}
            type={"password"}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values?.password}
            error={!!touched?.password && !!errors.password}
            helperText={touched?.password && errors.password}
          />
        </Grid>
      ) : null}
    </Grid>
  );
};

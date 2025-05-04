import { Grid } from "@mui/material";
import InputFields from "../InputFields/InputFields";
export const SignupForm = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,

  focusarea,
}) => (
  <Grid
    container
    rowGap={4}
    columnGap={5}
    justifyContent={"center"}
    alignItems={"center"}
  >
    <Grid item xs={12} sm={9} md={5.2} lg={5.5} xl={5.5}>
      <InputFields
        required={true}
        type={"firstName"}
        name={"firstName"}
        label={"First Name"}
        placeholder={"Enter Your First Name"}
        value={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={!!touched.firstName && !!errors.firstName}
        helperText={touched.firstName && errors.firstName}
      />
    </Grid>
    <Grid item xs={12} sm={9} md={5.2} lg={5.5} xl={5.5}>
      <InputFields
        required={true}
        type={"lastName"}
        label={"Last Name"}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.lastName}
        placeholder={"Enter Your Last Name"}
        error={!!touched.lastName && !!errors.lastName}
        helperText={touched.lastName && errors.lastName}
      />
    </Grid>
    <Grid item xs={12} sm={9} md={5.2} lg={5.5} xl={5.5}>
      <InputFields
        type={"email"}
        label={"Email"}
        required={true}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.email}
        placeholder={"Enter Your Email"}
        error={!!touched.email && !!errors.email}
        helperText={touched.email && errors.email}
      />
    </Grid>
    <Grid item xs={12} sm={9} md={5.2} lg={5.5} xl={5.5}>
      <InputFields
        type={"phone"}
        required={true}
        onBlur={handleBlur}
        label={"Phone Number"}
        onChange={handleChange}
        value={values.phone}
        placeholder={"Enter Your Number"}
        error={!!touched.phone && !!errors.phone}
        helperText={touched.phone && errors.phone}
      />
    </Grid>
    <Grid item xs={12} sm={9} md={5.2} lg={5.5} xl={5.5}>
      <InputFields
        required={true}
        type={"password"}
        label={"Password"}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.password}
        placeholder={"Enter Your Password"}
        error={!!touched.password && !!errors.password}
        helperText={touched.password && errors.password}
      />
    </Grid>
    <Grid item xs={12} sm={9} md={5.2} lg={5.5} xl={5.5}>
      <InputFields
        required={true}
        onBlur={handleBlur}
        onChange={handleChange}
        type={"confirmpassword"}
        label={"Confirm Password"}
        value={values.confirmpassword}
        placeholder={"Enter Your Confirm Password"}
        error={!!touched.confirmpassword && !!errors.confirmpassword}
        helperText={touched.confirmpassword && errors.confirmpassword}
      />
    </Grid>
    {focusarea ? (
      <Grid
        item
        xs={12}
        sm={9}
        md={5.2}
        lg={5.5}
        xl={5.5}
        justifyContent={"flex-start"}
      >
        <InputFields
          required={true}
          onBlur={handleBlur}
          onChange={handleChange}
          type={"focusarea"}
          label={"Focus Area"}
          value={values.focusarea}
          placeholder={"Select Your Focus Area"}
          error={!!touched.focusarea && !!errors.focusarea}
          helperText={touched.focusarea && errors.focusarea}
        />
      </Grid>
    ) : null}
  </Grid>
);

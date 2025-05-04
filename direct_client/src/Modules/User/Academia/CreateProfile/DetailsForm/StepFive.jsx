import { Grid, Typography } from "@mui/material";
import { Organized, attended } from "./data";
import MultiInputSection from "@common/MultiInputSection";

function StepFive({ values, errors, touched, handleBlur, handleChange }) {
  return (
    <Grid container gap={4} sx={{ paddingBottom: "20px" }}>
      <Grid item xs={12}>
        <Typography sx={{ mb: 4 }} variant={"h1"}>
          Training
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <MultiInputSection
          sectionName={"attendedSection"}
          LableHeadings={attended}
          values={values.attendedSection}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          headingSection={"Training/ Attended"}
        />
      </Grid>
      <Grid item xs={12}>
        <MultiInputSection
          sectionName={"organizedSection"}
          LableHeadings={Organized}
          values={values.organizedSection}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          headingSection={"Training / Organized"}
        />
      </Grid>
    </Grid>
  );
}

export default StepFive;

import { Grid, Typography } from "@mui/material";
import { masters, phd } from "./data";
import MultiInputSection from "@common/MultiInputSection";

function StepSix({ values, errors, touched, handleBlur, handleChange }) {
  return (
    <Grid container gap={4} sx={{ paddingBottom: "20px" }}>
      <Grid item xs={12}>
        <Typography sx={{ mb: 4 }} variant={"h1"}>
          Supervisions
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <MultiInputSection
          sectionName={"phdSection"}
          LableHeadings={phd}
          values={values.phdSection}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          headingSection={"Supervisions/ PHD Supervisions"}
        />
      </Grid>
      <Grid item xs={12}>
        <MultiInputSection
          sectionName={"mastersSection"}
          LableHeadings={masters}
          values={values.mastersSection}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          headingSection={"Supervisions / MS Supervisions"}
        />
      </Grid>
    </Grid>
  );
}

export default StepSix;

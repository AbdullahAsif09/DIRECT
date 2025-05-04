import { Grid, Typography } from "@mui/material";
import { industrialProjects, researchProjects } from "./data";
import MultiInputSection from "@common/MultiInputSection";

function StepTwo({ values, errors, touched, handleBlur, handleChange }) {
  return (
    <Grid container gap={4} sx={{ paddingBottom: "20px" }}>
      <Grid item xs={12}>
        <Typography sx={{ mb: 4 }} variant={"h1"}>
          Projects
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <MultiInputSection
          sectionName={"researchProjectsSection"}
          LableHeadings={researchProjects}
          values={values.researchProjectsSection}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          headingSection={"Project/ Research Projects"}
        />
      </Grid>
      <Grid item xs={12}>
        <MultiInputSection
          sectionName={"industrialProjectsSection"}
          LableHeadings={industrialProjects}
          values={values.industrialProjectsSection}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          headingSection={"Project/ Industrial Projects"}
        />
      </Grid>
    </Grid>
  );
}

export default StepTwo;

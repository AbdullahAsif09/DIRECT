import { Grid, Typography } from "@mui/material";
import {
  book,
  bookChap,
  conference,
  editorial,
  researchArticles,
} from "./data";
import MultiInputSection from "@common/MultiInputSection";

function StepThree({ values, errors, touched, handleBlur, handleChange }) {
  return (
    <Grid container gap={4} sx={{ paddingBottom: "20px" }}>
      <Grid item xs={12}>
        <Typography sx={{ mb: 4 }} variant={"h1"}>
          Publications
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <MultiInputSection
          sectionName={"researchArticlesSection"}
          LableHeadings={researchArticles}
          values={values.researchArticlesSection}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          headingSection={"Publications/ Research Articles"}
        />
      </Grid>
      <Grid item xs={12}>
        <MultiInputSection
          sectionName={"conferenceSection"}
          LableHeadings={conference}
          values={values.conferenceSection}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          headingSection={"Publications/ Conference Proceedings"}
        />
      </Grid>
      <Grid item xs={12}>
        <MultiInputSection
          sectionName={"bookChapSection"}
          LableHeadings={bookChap}
          values={values.bookChapSection}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          headingSection={"Publications/ Book Chapter"}
        />
      </Grid>
      <Grid item xs={12}>
        <MultiInputSection
          sectionName={"bookSection"}
          LableHeadings={book}
          values={values.bookSection}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          headingSection={"Publications/ Book"}
        />
      </Grid>
      <Grid item xs={12}>
        <MultiInputSection
          sectionName={"editorialSection"}
          LableHeadings={editorial}
          values={values.editorialSection}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          headingSection={"Publications/ Editorial"}
        />
      </Grid>
    </Grid>
  );
}

export default StepThree;

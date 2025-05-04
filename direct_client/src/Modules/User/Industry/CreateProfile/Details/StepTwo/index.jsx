import { Grid } from "@mui/material";
import TablesSecTwo from "./TablesSecTwo";
import { SecFourArray, SecOneArray, SecSixArray, SecTwoArray } from "./data";

function StepTwo({ values, errors, touched, handleBlur, handleChange }) {
  return (
    <Grid container rowGap={10} sx={{ paddingBottom: "20px" }}>
      <Grid item xs={12}>
        <TablesSecTwo
          values={values.partnerFirm}
          sectionName={"partnerFirm"}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          ttext={
            "Indicate partnership with any other firm as JV, consortium or  association etc:"
          }
          headerArray={SecOneArray}
        />
      </Grid>
      <Grid item xs={12}>
        <TablesSecTwo
          values={values?.localBank}
          sectionName={"localBank"}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          headerArray={SecTwoArray}
          ttext={
            "Local Bank Accounts. Indicate in ‘Remarks’ whether account is in local or foreign currency"
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TablesSecTwo
          values={values.foreignBank}
          sectionName={"foreignBank"}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          headerArray={SecTwoArray}
          ttext={
            "Foreign Bank Accounts. Indicate in ‘Remarks’ whether account is in local or foreign currency"
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TablesSecTwo
          values={values.registerWithGov}
          sectionName={"registerWithGov"}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          headerArray={SecFourArray}
          ttext={
            "Are you registered with any Government or Semi-Government set-up (other than the Defence Establishment)? If so, please indicate:"
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TablesSecTwo
          values={values.pastContract}
          sectionName={"pastContract"}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          headerArray={SecSixArray}
          ttext={
            "Indicate past performance of your firm with all types of Govt, semi-Govt, Civil and Military Organizations (attach list if required):"
          }
        />
      </Grid>
    </Grid>
  );
}

export default StepTwo;

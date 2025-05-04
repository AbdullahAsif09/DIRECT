import { Grid } from "@mui/material";
import InputFields from "@common/InputFields/InputFields";

function StepThree({
  values,
  errors,
  touched,
  handleBlur,
  setFieldValue,
  handleChange,
}) {
  return (
    <Grid container gap={6}>
      <Grid item xs={12}>
        <InputFields
          rows={5}
          label={"Description:"}
          type={"textbox"}
          placeholder={"Enter Your Company Description"}
          name={"description"}
          value={values?.description}
          onBlur={handleBlur}
          onChange={handleChange}
          error={!!touched.description && !!errors.description}
          helperText={touched.description && errors.description}
        />
      </Grid>
      <Grid item xs={12}>
        <InputFields
          rows={5}
          label={
            "Was your firm previously registered with any Defence Establishment including MoDP under any other name and defaulted in any Defence Contract? If so, please furnish details below (or attach a list of contracts separately):"
          }
          type={"textbox"}
          placeholder={"Enter Your Company Description"}
          name={"pasProjectDefence"}
          value={values?.pasProjectDefence}
          onBlur={handleBlur}
          onChange={handleChange}
          error={!!touched.pasProjectDefence && !!errors.pasProjectDefence}
          helperText={touched.pasProjectDefence && errors.pasProjectDefence}
        />
      </Grid>
      <Grid item xs={12}>
        <InputFields
          rows={5}
          label={
            "Has your firm ever been blacklisted / debarred by any of the Defence Establishment or Government / Semi-Government entities? If yes, please indicate the type of legal / administrative action taken against the firm and duration of such action:"
          }
          type={"textbox"}
          placeholder={"Enter Your Company Description"}
          name={"blacklisted"}
          value={values?.blacklisted}
          onBlur={handleBlur}
          onChange={handleChange}
          error={!!touched.blacklisted && !!errors.blacklisted}
          helperText={touched.blacklisted && errors.blacklisted}
        />
      </Grid>
      <Grid item xs={12}>
        <InputFields
          rows={5}
          label={
            "Is there any case against the firm in the court of law and any other:"
          }
          type={"textbox"}
          placeholder={"Enter Your Company Description"}
          name={"caseAgainstFirm"}
          value={values?.caseAgainstFirm}
          onBlur={handleBlur}
          onChange={handleChange}
          error={!!touched.caseAgainstFirm && !!errors.caseAgainstFirm}
          helperText={touched.caseAgainstFirm && errors.caseAgainstFirm}
        />
      </Grid>
      {/* <Grid item xs={12}>
        <Typography variant="body1">
          Certified that I have deposited an amount of Rs{" "}
        </Typography>
        <TextField size="small" />
        <Typography variant="body1">
          in State / National Bank of Pakistan into Major Head C02501-20, Main
          Head-12, Sub Head ‘A’ Misc Code Head (1/845/30) and a copy of the
          Chalan number dated is attached.
        </Typography>
      </Grid> */}
    </Grid>
  );
}

export default StepThree;

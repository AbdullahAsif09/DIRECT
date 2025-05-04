import { FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import SelectFields from "../../../SelectFields";

const arrayFields = ["None", "Artificial Intelligence", "Data Sciences"];
function Filters({
  academia,
  handleRadioChange,
  selectedValue,
  selectedValueField,
  handleValueFieldChange,
}) {
  return (
    <Grid container gap={2}>
      <Grid item xs={12}>
        <SelectFields
          value={selectedValueField}
          onChange={handleValueFieldChange}
          array={arrayFields}
          label={"Select Field"}
        />
      </Grid>

      <Grid item xs={12}>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={selectedValue}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="byName"
            control={<Radio />}
            label="By Name"
          />
          <FormControlLabel
            value={"byInstitute"}
            control={<Radio />}
            label={academia ? "By Institute" : "Company"}
          />
        </RadioGroup>
      </Grid>
    </Grid>
  );
}

export default Filters;

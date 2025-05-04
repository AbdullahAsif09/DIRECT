import TooltipMui from "@common/AnimationMui/TooltipMui";
import { Quiz } from "@mui/icons-material";
import { FormLabel, Grid, MenuItem, Select, styled } from "@mui/material";
const LabelForInput = styled(FormLabel)(({ theme }) => ({
  color: "black",
  fontSize: "1.1rem",
  "& .MuiFormLabel-asterisk": {
    color: "red",
  },
}));

function SelectMui({
  value,
  label,
  onChange,
  required,
  menuItems,
  tooltipText,
  defaultValue,
  menuArrayItems,
}) {
  return (
    <Grid container gap={1}>
      <Grid item xs={12}>
        <LabelForInput
          color="error"
          required={required ? true : false}
          className="emailInputLabel"
        >
          {label}
        </LabelForInput>
        {tooltipText && (
          <TooltipMui
            text={tooltipText}
            icon={<Quiz sx={{ color: "bg.darkBlue", cursor: "pointer" }} />}
          />
        )}
      </Grid>
      <Grid item xs={12}>
        <Select
          fullWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          defaultValue={defaultValue}
          label="Age"
          onChange={onChange}
        >
          {menuItems &&
            menuItems?.map((e) => <MenuItem value={e}>{e}</MenuItem>)}
          {menuArrayItems?.length > 0 ? (
            menuArrayItems?.map((e, i) => (
              <MenuItem key={i} value={e?._id}>
                {e?.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem>No Data Found</MenuItem>
          )}
        </Select>
      </Grid>
    </Grid>
  );
}

export default SelectMui;

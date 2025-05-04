import { Cancel, CheckBox, CheckCircle, Done } from "@mui/icons-material";
import {
  Collapse,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Zoom,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import { TransitionGroup } from "react-transition-group";
const LabelForInput = styled(FormLabel)(({ theme }) => ({
  color: "black",
  fontSize: "1.2rem",
  "& .MuiFormLabel-asterisk": {
    color: "red",
  },
}));
const ValueStyles = styled("div")(({ theme }) => ({
  padding: "5px 10px",
  borderRadius: "10px",
  backgroundColor: "#E6E6E6",
  fontSize: "13px",
}));
function SelectFields({
  label,
  required,
  type,
  placeholder,
  error,
  onBlur,
  onChange,
  value,
  valueArray,
  array,
  setFieldValue,
  multiple,
}) {
  const [SelectionValue, setSelectionValue] = useState([]);
  useEffect(() => {
    if (valueArray?.length === 0) {
      setSelectionValue([]);
    }
  }, [valueArray]);
  return (
    <Grid container rowGap={1}>
      <Grid item xs={12}>
        <LabelForInput
          color="error"
          required={required ? true : false}
          className="emailInputLabel"
        >
          {label}
        </LabelForInput>
      </Grid>
      {multiple ? (
        <Grid item xs={12}>
          <Select
            multiple
            fullWidth
            id={type}
            name={type}
            value={valueArray}
            error={error}
            onBlur={onBlur}
            onChange={(event) =>
              setFieldValue("categories", event.target.value)
            }
            renderValue={(selected) => (
              <div
                style={{
                  display: "flex",
                  gap: ".5rem",
                  flexWrap: "wrap",
                }}
              >
                {setSelectionValue(selected)}
                {selected.map((option) => (
                  <ValueStyles key={option}>{option}</ValueStyles>
                ))}
              </div>
            )}
          >
            {array?.map((e, i) => (
              <MenuItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                value={e}
                key={i}
              >
                {e}
                {SelectionValue.includes(e) ? (
                  <TransitionGroup>
                    <Zoom timeout={200}>
                      <IconButton>
                        <Cancel />
                      </IconButton>
                    </Zoom>
                  </TransitionGroup>
                ) : null}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Select
            fullWidth
            id={type}
            name={type}
            value={value}
            error={error}
            onBlur={onBlur}
            onChange={onChange}
            placeholder="i am select"
          >
            {array?.map((e, i) => (
              <MenuItem value={e} key={i}>
                {e}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      )}
    </Grid>
  );
}

export default SelectFields;

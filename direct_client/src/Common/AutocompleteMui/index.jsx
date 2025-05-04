import {
  Autocomplete,
  Chip,
  FormLabel,
  Grid,
  Stack,
  TextField,
  styled,
} from "@mui/material";
import { useState } from "react";
import TooltipMui from "../AnimationMui/TooltipMui";
const LabelForInput = styled(FormLabel)(({ theme }) => ({
  color: "black",
  fontSize: "1.1rem",
  "& .MuiFormLabel-asterisk": {
    color: "red",
  },
}));
function AutocompleteMui({
  label,
  Content,
  onChange,
  required,
  multiple,
  renderTags,
  dataSearch = [],
  tooltipIcon,
  tooltipText,
  placeholder,
  renderOption,
  filterSelect,
  labelForInput,
  selectedValue,
  onInputChange,
  getOptionLabel,
  simple,
  ...rest
}) {
  const [selectedValues, setSelectedValues] = useState([]);
  const handleAutocompleteChange = (event, newValue) => {
    setSelectedValues(newValue);
  };

  return (
    <Grid container gap={1}>
      {labelForInput && (
        <Grid item xs={12}>
          <Stack alignItems={"center"} direction={"row"} gap={1}>
            <LabelForInput
              color="error"
              required={required ? true : false}
              className="emailInputLabel"
            >
              {labelForInput}
            </LabelForInput>
            {tooltipText && (
              <TooltipMui text={tooltipText} icon={tooltipIcon} />
            )}
          </Stack>
        </Grid>
      )}
      <Grid item xs={12}>
        <Autocomplete
          {...rest}
          multiple={multiple}
          fullWidth
          options={dataSearch}
          onInputChange={onInputChange ? onInputChange : () => {}}
          value={selectedValue ? selectedValue : selectedValues}
          onChange={onChange ? onChange : handleAutocompleteChange}
          getOptionLabel={getOptionLabel}
          renderOption={renderOption}
          renderInput={(params) => (
            <>
              <TextField {...params} label={label} placeholder={placeholder} />
            </>
          )}
          renderTags={
            renderTags
              ? renderTags
              : (value, getTagProps) => {
                  return value?.map((option, index) => (
                    <Chip
                      key={index}
                      label={
                        option?.name
                          ? option?.name
                          : option?.firstName + " " + option?.lastName
                      }
                      {...getTagProps({ index })}
                      onDelete={() => {
                        const newValue = [...value];
                        newValue?.splice(index, 1);
                        setSelectedValues(newValue);
                      }}
                    />
                  ));
                }
          }
        />
      </Grid>
    </Grid>
  );
}

export default AutocompleteMui;

// previous use of AutocompleteMui:
//  <Grid item xs={12}>
//       <Autocomplete
//         multiple
//         options={dataSearch}
//         disableCloseOnSelect
//         fullWidth
//         value={selectedValues}
//         onChange={handleAutocompleteChange}
//         getOptionLabel={(option) =>
//           filterSelect === "byName" ? option?.name : option?.institute
//         }
//         renderOption={(props, option, { selected }) =>
//           Content ? (
//             <li {...props}>
//               <Checkbox
//                 icon={icon}
//                 checkedIcon={checkedIcon}
//                 style={{ marginRight: 2 }}
//                 checked={selected}
//               />
//               <Content dataUsers={option} />
//             </li>
//           ) : (
//             <li {...props}>
//               <Checkbox
//                 icon={icon}
//                 checkedIcon={checkedIcon}
//                 style={{ marginRight: 8 }}
//                 checked={selected}
//               />
//               {option?.name}
//             </li>
//           )
//         }
//         renderInput={(params) => (
//           <>
//             {console.log(params, "params")}
//             <TextField {...params} label={label} placeholder={placeholder} />
//           </>
//         )}
//         renderTags={(value, getTagProps) =>
//           value.map((option, index) => (
//             <Chip
//               label={option.name}
//               {...getTagProps({ index })}
//               onDelete={() => {
//                 const newValue = [...value];
//                 newValue?.splice(index, 1);
//                 setSelectedValues(newValue);
//               }}
//             />
//           ))
//         }
//       />
//     </Grid>

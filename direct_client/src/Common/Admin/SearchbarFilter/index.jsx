import { Checkbox, Chip, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import DisplayUsers from "./DisplayUsers";
import AutocompleteMui from "../../AutocompleteMui";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
const namesList = [
  { name: "Abdul", field: "Manfacturer", institute: "Foji Cements" },
  {
    name: "Abdullah",
    field: "Artificial Inteligence",
    institute: "Intelgency Ltd",
  },
  { name: "Abdul Aziz", field: "Data Sciences", institute: "Rapidev" },
  { name: "Ali", field: "Artificial Inteligence", institute: "Rapidev Games" },
  {
    name: "Osama",
    field: "Artificial Inteligence",
    institute: "Rapidev Games",
  },
  {
    name: "Hamid",
    field: "Artificial Inteligence",
    institute: "Rapidev Games",
  },
];

function SearchbarFilter({
  selectValues,
  dataToDisplay,
  setSelectValues,
  setCategoryFilter,
  handleAutocompleteChange,
}) {
  const checkedIcon = <CheckBox fontSize="small" />;
  const icon = <CheckBoxOutlineBlank fontSize="small" />;

  const [DataArray, setDataArray] = useState([namesList]);
  const [selectedValue, setSelectedValue] = useState("byName");
  const [selectedValueField, setSelectedValueField] = useState("None");

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleValueField = (event) => {
    setCategoryFilter(event.target.value);
  };

  useEffect(() => {
    const SearchFilterByFields = () => {
      if (selectedValueField !== "None") {
        const FilteredData = namesList?.filter(
          (e) => e?.field === selectedValueField
        );
        setDataArray(FilteredData);
      } else {
        setDataArray(namesList);
      }
    };

    SearchFilterByFields(namesList);
  }, []);

  return (
    <Grid container gap={2}>
      {/* <Grid item xs={12}>
        <Filters
          academia={academia}
          selectedValue={selectedValue}
          selectedValueField={categoryFilter}
          handleRadioChange={handleRadioChange}
          handleValueFieldChange={handleValueField}
        />
      </Grid> */}
      <Grid item xs={12}>
        {dataToDisplay?.length > 0 && (
          <AutocompleteMui
            disableCloseOnSelect
            multiple={true}
            dataSearch={dataToDisplay}
            onInputChange={(event, newInputValue) => {}}
            placeholder={"Search..."}
            selectedValue={selectValues}
            onChange={handleAutocompleteChange}
            getOptionLabel={(option) =>
              selectedValue === "byName"
                ? option?.firstName
                  ? option?.firstName
                  : option?.name
                : option?.currentUniversity
                ? option?.currentUniversity
                : option?.companyName ?? ""
            }
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 2 }}
                  checked={selected}
                />
                <DisplayUsers dataUsers={option} />
              </li>
            )}
            renderTags={(value, getTagProps) =>
              value?.map((option, index) => (
                <Chip
                  label={
                    option?.name
                      ? option?.name
                      : option?.firstName + " " + option?.lastName
                  }
                  {...getTagProps({ index })}
                  onDelete={() => {
                    const newValue = [...value];
                    newValue?.splice(index, 1);
                    setSelectValues(newValue);
                  }}
                />
              ))
            }
          />
        )}
      </Grid>
    </Grid>
  );
}

export default SearchbarFilter;

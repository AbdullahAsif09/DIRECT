import {
  Autocomplete,
  Checkbox,
  TextField,
  Chip,
  Grid,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { useMemo, useState } from "react";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { useAxios } from "@hooks/index";

const Wrapper = ({ setData, data }) => {
  const [selectedValues, setSelectedValues] = useState(data?.assignedTo ?? []);

  const { data: d = [] } = useAxios("admin/getSubAdmins?type=projectManager");
  const { loading, API } = useAxios();
  const arr = d?.result ?? [];

  /* you need to memorie the list otherwise checkbox will not work as expected   */
  const toRender = useMemo(() => {
    return arr?.map((item) => ({
      firstName: item.firstName,
      lastName: item?.lastName,
      _id: item?._id,
    }));
  }, [d]);

  const handleEdit = async () => {
    if (loading) return;
    try {
      const response = await API({
        url: "projects/updateProjectManger",
        method: "PUT",
        object: {
          _id: data?._id,
          assignedTo: selectedValues.map((e) => e?._id),
        },
      });
      if (response.result) setData(response);
      return console.log(data);
    } catch (e) {
      console.error("Error editing project managers: ", e);
    }
  };

  const handleChange = (event, newValue) => {
    setSelectedValues(newValue);
  };

  const checkedIcon = <CheckBox fontSize="small" />;
  const icon = <CheckBoxOutlineBlank fontSize="small" />;
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h2" fontSize={"1.8rem"} mb={2}>
          Assign Project Mangers
        </Typography>
        <Autocomplete
          multiple
          sx={{ width: "100%" }}
          disableCloseOnSelect
          options={toRender ?? []}
          value={selectedValues}
          onChange={handleChange}
          getOptionLabel={(option) =>
            option?.firstName + " " + option?.lastName
          }
          renderOption={({ key, ...rest }, option, { selected }) => (
            <li {...rest} key={option?._id}>
              {/* {console.log({ rest })}
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                checked={selected}
                style={{ marginRight: 8 }}
              /> */}
              {option?.firstName + " " + option?.lastName}
            </li>
          )}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                key={option?._id}
                label={option?.firstName + " " + option.lastName}
                {...getTagProps({ index })}
                onDelete={() => {
                  const newSelectedValues = [...selectedValues];
                  newSelectedValues.splice(index, 1);
                  setSelectedValues(newSelectedValues);
                }}
              />
            ))
          }
        />
      </Grid>

      <Grid item xs={12}>
        <Stack gap={2} direction={"row"}>
          <Button onClick={handleEdit} variant="contained" color="success">
            {loading ? "Updating..." : "Update Project Manger for Project"}
          </Button>
        </Stack>
      </Grid>
    </>
  );
};

export default Wrapper;

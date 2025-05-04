import { Button, Grid, Stack, Typography } from "@mui/material";
import InputFields from "../../InputFields/InputFields";
import SearchbarFilter from "../SearchbarFilter";
import { motion } from "framer-motion";
import { useAxios } from "@hooks";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAlert } from "@store/Features/AlertSlice";
function PublishSearch({
  title,
  academia,
  noTextBox,
  dateTitle,
  projectID,
  researcher,
  dataToDisplay,
  categoryFilter,
  handleCloseModal,
  setCategoryFilter,
}) {
  const dispatch = useDispatch();
  const { API } = useAxios();
  const [selectValues, setSelectValues] = useState([]);
  const [selectSubmissionDate, setSelectSubmissionDate] = useState();
  const handleAutocompleteChange = (event, newValue) => {
    setSelectValues(newValue);
  };
  const handleSubmitUsers = async () => {
    const arrayToSend = selectValues.map((item) => ({
      id: item?._id,
      model: item?.role[0],
      submissionDate: selectSubmissionDate,
    }));
    const dataToSend = {
      projectID: projectID,
      userIDs: arrayToSend,
    };
    try {
      const response = await API({
        url: "projects/sendProjectsForViewingDetials",
        method: "patch",
        object: dataToSend,
      });
      if (response?.message === "success") {
        dispatch(
          setAlert({
            status: "success",
            text: "Users are assigned!",
          })
        );
      } else {
        dispatch(
          setAlert({
            status: "error",
            text: response?.message || "Users are not assigned!",
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(selectValues);

  return (
    <Grid container gap={2}>
      <Grid item xs={12}>
        <Typography variant="h2" fontSize={"1.8rem"}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <SearchbarFilter
          academia={academia}
          selectValues={selectValues}
          dataToDisplay={dataToDisplay}
          categoryFilter={categoryFilter}
          setSelectValues={setSelectValues}
          setCategoryFilter={setCategoryFilter}
          handleAutocompleteChange={handleAutocompleteChange}
        />
      </Grid>
      {/* {noTextBox === false && (
        <Grid item xs={12}>
          <Editor label={"Description"} />
        </Grid>
      )} */}
      {noTextBox === false && (
        <Grid item xs={6}>
          <InputFields
            onChange={(e) => setSelectSubmissionDate(new Date(e?.$d))}
            type={"date"}
            label={dateTitle}
          />
        </Grid>
      )}
      {handleCloseModal && (
        <Grid item sx={{ mt: 2 }} xs={12}>
          <Stack
            gap={1}
            direction={"row"}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <Button
              component={motion.div}
              whileTap={{ scale: 0.9 }}
              onClick={handleCloseModal}
              sx={{
                backgroundColor: "bg.slightlyLightRed",
                "&:hover": {
                  backgroundColor: "bg.normalRed",
                },
              }}
              variant="contained"
            >
              Cancel
            </Button>
          </Stack>
        </Grid>
      )}
      <Grid item xs={12}>
        <Button
          component={motion.div}
          whileTap={{ scale: 0.9 }}
          variant="contained"
          onClick={handleSubmitUsers}
        >
          Assign
        </Button>
      </Grid>
    </Grid>
  );
}

export default PublishSearch;

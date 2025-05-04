import {
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Grid,
  Stack,
} from "@mui/material";
import SelectFields from "@common/SelectFields";
import InputFields from "@common/InputFields/InputFields";
import TypographyMUI from "@common/MUI/TypographyMUI";
import AutocompleteMui from "@common/AutocompleteMui";
import DisplayUsers from "./DisplayUsers";
import { useState } from "react";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setAlert } from "@store/Features/AlertSlice";
import { useAxios } from "@hooks";

function ModalResearcher({
  proposalID,
  reviewerData,
  handleCloseModal,
  setCategoryFilter,
}) {
  const dispatch = useDispatch();
  const { API, loading } = useAxios();
  const icon = <CheckBoxOutlineBlank fontSize="small" />;
  const checkedIcon = <CheckBox fontSize="small" />;
  const [newValReviewer, setNewValReviewer] = useState(null);
  const [dateOfSubmission, setDateOfSubmission] = useState(null);
  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isoString = dateOfSubmission.toISOString();
    const submitArray = newValReviewer.map((e) => {
      // over here we are assigning the reviewerID to proposal

      return {
        reviewerID: { id: e.userID?.id?._id, model: e.userID?.model },
        submissionDate: isoString,
      };
    });
    try {
      const data = await API({
        url: "proposal/assignProposalToReviewer",
        method: "post",
        object: { proposalId: proposalID, data: submitArray },
      });

      if (data?.result) {
        dispatch(
          setAlert({
            status: "success",
            text: "Projects Assigned to Reviewer!",
          })
        );
      }
    } catch (error) {
      dispatch(
        setAlert({
          status: "error",
          text: "couldn't assigne proposal to reviewer",
        })
      );
      console.log(error);
    }
  };
  const arraySelect = ["None", "Artificial Intelligence", "Data Sciences"];
  return (
    <form onSubmit={handleSubmit}>
      <Grid container gap={2}>
        <Grid item sx={{ mb: 3 }} xs={12}>
          <TypographyMUI variant="h2">Assign Proposal</TypographyMUI>
        </Grid>
        <Grid item xs={12}>
          <SelectFields
            label={"Select Field"}
            onChange={(e) => setCategoryFilter(e.target.value)}
            array={arraySelect}
          />
        </Grid>
        <Grid item xs={12}>
          <AutocompleteMui
            labelForInput={"Search Reviewer"}
            disableCloseOnSelect
            multiple={true}
            dataSearch={reviewerData}
            onInputChange={(newValue) => {}}
            onChange={(event, newValue) => {
              setNewValReviewer(newValue);
            }}
            options={reviewerData}
            selectedValue={newValReviewer}
            placeholder={"Search..."}
            select={"None"}
            filterSelect={"byName"}
            getOptionLabel={(option) =>
              option?.userID?.id?.firstName
                ? option?.userID?.id?.firstName +
                  " " +
                  option?.userID?.id?.lastName
                : option?.userID?.id?.name
            }
            renderOption={(props, option, { selected }) =>
              DisplayUsers?.length > 0 ? (
                <li {...props} key={option?._id + option?.email}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 2 }}
                    checked={selected}
                  />
                  <DisplayUsers dataUsers={option} />
                </li>
              ) : null
            }
            renderTags={(value, getTagProps) =>
              value?.map((option, index) => (
                <Chip
                  label={
                    option?.userID?.id?.firstName
                      ? option?.userID?.id?.firstName +
                        " " +
                        option?.userID?.id?.lastName
                      : option?.userID?.id?.name
                  }
                  {...getTagProps({ index })}
                  onDelete={() => {
                    const newValue = [...value];
                    newValue?.splice(index, 1);
                    setNewValReviewer(newValue);
                  }}
                />
              ))
            }
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <InputFields
            label={"Select Submission Date"}
            type={"date"}
            onChange={(e) => setDateOfSubmission(e)}
          />
        </Grid>
        <Grid item sx={{ mt: 2 }} xs={12}>
          <Stack
            gap={1}
            direction={"row"}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <Button
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
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Assign"}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
}
export default ModalResearcher;

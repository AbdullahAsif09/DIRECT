import {
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import SelectFields from "@common/SelectFields";
import InputFields from "@common/InputFields/InputFields";
import TypographyMUI from "@common/MUI/TypographyMUI";
import AutocompleteMui from "@common/AutocompleteMui";
import DisplayUsers from "./DisplayUsers";
import { useEffect, useState } from "react";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setAlert } from "@store/Features/AlertSlice";
import { useGetProfiles, useAxios } from "@hooks";
import DisplayAdmin from "./DisplayAdmin";

function ModalResearcher({
  proposalID,
  categoryFilter,
  handleCloseModal,
  setCategoryFilter,
}) {
  const profilesGetter = useGetProfiles();
  const usersValues = profilesGetter.users;
  const industryValues = profilesGetter.industry;
  const academiaValues = profilesGetter.academia;
  const adminValues = profilesGetter.adminProfiles;
  const fundingAgencyValues = profilesGetter.fundingAgency;
  const userAgencyValues = profilesGetter.userAgency;
  const icon = <CheckBoxOutlineBlank fontSize="small" />;
  const checkedIcon = <CheckBox fontSize="small" />;
  const dispatch = useDispatch();
  const [newValReviewer, setNewValReviewer] = useState(null);
  const [dateOfSubmission, setDateOfSubmission] = useState(null);
  const { API, loading } = useAxios();
  const [selectedValue, setSelectedValue] = useState("admin");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });
  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isoString = dateOfSubmission.toISOString();
    const submitArray = newValReviewer?.map((e) => {
      // over here we are assigning the reviewerID to proposal
      return {
        reviewerID: {
          id: e?._id,
          model: e?.role?.[0]
            ? e?.role?.[0]
            : e?.type == "super"
            ? "admin"
            : e?.type,
        },
        submissionDate: isoString,
      };
    });
    try {
      const data = await API({
        url: "proposal/assignProposalToReviewer",
        method: "post",
        object: { proposalId: proposalID, data: submitArray },
      });
      if (data?.message === "success") {
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
  useEffect(() => {
    profilesGetter.getAllProfiles();
  }, []);

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
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              {...controlProps("industry")}
              value="industry"
              control={<Radio />}
              label="Industry"
            />
            <FormControlLabel
              {...controlProps("academia")}
              value="academia"
              control={<Radio />}
              label="Academia"
            />
            <FormControlLabel
              {...controlProps("user")}
              value="user"
              control={<Radio />}
              label="User"
            />
            <FormControlLabel
              {...controlProps("admin")}
              value="admin"
              control={<Radio />}
              label="Admin"
            />
            <FormControlLabel
              {...controlProps("fundingAgency")}
              value="fundingAgency"
              control={<Radio />}
              label="Funding Agency"
            />
            <FormControlLabel
              {...controlProps("userAgency")}
              value="userAgency"
              control={<Radio />}
              label="User Agency"
            />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <AutocompleteMui
            labelForInput={"Search Reviewer"}
            disableCloseOnSelect
            multiple={true}
            dataSearch={
              selectedValue === "industry"
                ? industryValues
                : selectedValue === "academia"
                ? academiaValues
                : selectedValue === "user"
                ? usersValues
                : selectedValue === "admin"
                ? adminValues
                : selectedValue === "fundingAgency"
                ? fundingAgencyValues
                : userAgencyValues
            }
            onInputChange={(newValue) => {}}
            onChange={(event, newValue) => {
              setNewValReviewer(newValue);
            }}
            options={
              selectedValue === "industry"
                ? industryValues
                : selectedValue === "academia"
                ? academiaValues
                : selectedValue === "user"
                ? usersValues
                : selectedValue === "admin"
                ? adminValues
                : selectedValue === "fundingAgency"
                ? fundingAgencyValues
                : userAgencyValues
            }
            selectedValue={newValReviewer}
            placeholder={"Search..."}
            select={"None"}
            filterSelect={"byName"}
            getOptionLabel={(option) =>
              option?.name
                ? option?.name
                : option?.account?.name
                ? option?.account?.name
                : option?.firstName
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
                  {selectedValue === "admin" && (
                    <DisplayAdmin dataUsers={option} />
                  )}
                  {selectedValue === "fundingAgency" && (
                    <DisplayAdmin dataUsers={option} />
                  )}
                  {selectedValue === "userAgency" && (
                    <DisplayAdmin dataUsers={option} />
                  )}
                  {selectedValue === "industry" && (
                    <DisplayUsers dataUsers={option} />
                  )}
                  {selectedValue === "academia" && (
                    <DisplayUsers dataUsers={option} />
                  )}
                  {selectedValue === "user" && (
                    <DisplayUsers dataUsers={option} />
                  )}
                </li>
              ) : null
            }
            renderTags={(value, getTagProps) =>
              value?.map((option, index) => (
                <Chip
                  label={
                    option?.name
                      ? option?.name
                      : option?.account?.name
                      ? option?.account?.name
                      : option?.firstName
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

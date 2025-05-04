import { Button, Divider, Grid, Stack } from "@mui/material";
import PublishSearch from "@common/Admin/PublishSearch";
import ProjectName from "@common/Admin/ProjectName";
import { useEffect, useState } from "react";
import EditProject from "../EditProject";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setAlert } from "@store/Features/AlertSlice";
import { Spinner } from "@common/UI";
import { useGetProfiles, useAxios } from "@hooks/index";
import AssignProjectManger from "./AssignProjectManger";

// state updater function
const updateState = (setter) => (newValue) => {
  setter(newValue);
};

function PublishReq() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // declare states
  const [Tabs, setTabs] = useState(0);
  const [categoryIndustry, setCategoryIndustry] = useState("");
  const [categoryAcademia, setCategoryAcademia] = useState("");

  // declare state updaters
  const updateTabs = updateState(setTabs);
  const updateCategoryAcademia = updateState(setCategoryAcademia);
  const updateCategoryIndustry = updateState(setCategoryIndustry);

  const { data, loading, setData } = useAxios(
    `projects/getOneProject?id=${id}`
  );
  const DataProject = data?.result;

  const profilesGetter = useGetProfiles();

  const industryValues = profilesGetter.industry;
  const academiaValues = profilesGetter.academia;

  // const { data } = useAxios(`projects/getOneProject?id=${id}`);
  const { API } = useAxios();

  const handleChange = (e, v) => updateTabs(v);

  const handlePublish = async () => {
    try {
      const data = await API({
        url: `projects/publishproject?id=${id}`,
        method: "PUT",
      });
      if (data?.result) {
        dispatch(
          setAlert({
            status: "success",
            text: "Project is updated",
          })
        );
        navigate("/directportal/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // fetch industry data
  const fetchIndustries = async () => {
    profilesGetter.getIndustry(`category=${categoryIndustry}`);
  };

  // fetch academia data
  const fetchAcademia = async () => {
    profilesGetter.getAcademia(`category=${categoryAcademia}`);
  };

  useEffect(() => {
    fetchAcademia();
  }, [categoryAcademia]);

  useEffect(() => {
    fetchIndustries();
  }, [categoryIndustry]);

  const profile = useSelector((state) => state.profile.profile);
  const arrayTabs = ["Summary", "Select Industry/Academia", ,];
  if (profile?.role?.[0] === "super") {
    arrayTabs.push("assign Project Manager");
  }

  return (
    <Grid container gap={6} sx={{ mt: 0, mb: 4 }}>
      <Spinner isLoading={loading} />
      <Grid item xs={12}>
        <ProjectName
          details={{
            image: DataProject?.image,
            title: DataProject?.title,
            description: DataProject?.description,
          }}
          value={Tabs}
          arrayTabs={arrayTabs}
          handleChange={handleChange}
        />
      </Grid>
      {Tabs === 0 && DataProject && (
        <Grid item xs={12}>
          <EditProject ProjectDetails={DataProject} inTabs={true} />
        </Grid>
      )}
      {Tabs === 1 && (
        <>
          <Grid item xs={12}>
            {academiaValues.length > 0 && (
              <PublishSearch
                projectID={id}
                academia={true}
                noTextBox={false}
                title={"Choose Academia"}
                dataToDisplay={academiaValues}
                categoryFilter={categoryAcademia}
                dateTitle={"Review Submission Date"}
                setCategoryFilter={updateCategoryAcademia}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <Divider></Divider>
          </Grid>
          <Grid item xs={12}>
            {industryValues.length > 0 && (
              <PublishSearch
                projectID={id}
                noTextBox={false}
                researcher={false}
                title={"Choose Industry"}
                dataToDisplay={industryValues}
                categoryFilter={categoryIndustry}
                dateTitle={"Proposal Submission Date"}
                setCategoryFilter={updateCategoryIndustry}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <Divider></Divider>
          </Grid>
          <Grid item xs={12}>
            <Stack gap={2} direction={"row"}>
              <Button
                // onClick={() => navigate("/directportal/dashboard")}
                variant="contained"
              >
                Save
              </Button>
              <Button
                onClick={async (e) => {
                  e.preventDefault();
                  await handlePublish();
                  // navigate("/directportal/dashboard");
                }}
                variant="contained"
                color="success"
              >
                Publish
              </Button>
            </Stack>
          </Grid>
        </>
      )}
      {Tabs === 2 && (
        <AssignProjectManger setData={setData} data={data?.result} />
      )}
    </Grid>
  );
}

export default PublishReq;

import { Grid, Stack } from "@mui/material";
import TabFeedbackModal from "./TabFeedbackModal";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TasksProject } from "../../../utils/ProjectsData";
import TypographyMUI from "@common/MUI/TypographyMUI";
import BackButtons from "@common/UI/ButtonsUI/BackButtons";
import { useAxios, useGetQueryParam } from "@hooks";
function ViewMilestone() {
  const { id: milestoneID } = useParams();
  const [dataProject, setDataProject] = useState(null);
  const [milestoneData, setMilestoneData] = useState(null);
  const milestoneIndex = useGetQueryParam("no");
  const {
    data: dataMilestones,
    loading: loadingMilestones,
    error: errorMilestones,
  } = useAxios(`milestone/getMilestone`, "post", { id: milestoneID });

  const ExtractData = () => {
    let FilteredData = TasksProject.filter((e) => e.id == 1);
    if (FilteredData.length !== 0) {
      setDataProject(FilteredData[0]);
    }
  };
  const reStructureData = async () => {
    const restructureData = dataMilestones?.result?.details?.filter(
      (e, i) => milestoneIndex == i
    );
    setMilestoneData(restructureData[0]);
  };
  useEffect(() => {
    reStructureData();
    ExtractData();
  }, [dataMilestones]);
  if (!dataProject) {
    return;
  }
  return (
    <Grid
      container
      gap={2}
      sx={{ height: "100%", overflow: "auto", marginTop: 6, marginBottom: 6 }}
    >
      <Grid item sx={{ mb: 0 }} xs={12}>
        <BackButtons
          onClick={() => window.history.back()}
          sx={{ m: 2, color: "grey", cursor: "pointer" }}
          variant="body1"
        >
          Back
        </BackButtons>
        <Stack direction={"row"} gap={2} alignItems={"center"}>
          <TypographyMUI sx={{ m: 2 }} variant="h1">
            {milestoneData?.title}
          </TypographyMUI>
          <TypographyMUI variant="h3" fontWeight={500}>
            (Task Number {parseInt(milestoneIndex) + 1})
          </TypographyMUI>
        </Stack>
      </Grid>
      {/* <Grid sx={{ mt: 2 }}>
        <TabsCommon
          handleChange={handleChange}
          value={Tabs}
          arrayTabs={arrayTabs}
        />
      </Grid> */}
      <TabFeedbackModal dataCard={milestoneData} />
      {/* {Tabs === 2 && <TabChat />} */}
    </Grid>
  );
}

export default ViewMilestone;

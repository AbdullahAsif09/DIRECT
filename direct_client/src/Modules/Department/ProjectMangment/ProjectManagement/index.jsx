import { Fade, Grid } from "@mui/material";
import MainHeadings from "@common/AnimationMui/MainHeadings";
import ProjectName from "./ProjectName";
import Overview from "./Overview";
import Milestones from "./Milestones";
import { useState } from "react";
import { TransitionGroup } from "react-transition-group";
import UploadedFiles from "./UploadedFiles";
import ChatApp from "@common/mileStoneChat";
import { useParams } from "react-router-dom";
import { useGetQueryParam, useAxios } from "@hooks";
import { BackArrowButtonComp } from "@common/MUI";

function ProjectManagement() {
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const milestoneID = useGetQueryParam("milestones");

  const handleChange = (event, newValue) => setValue(newValue);

  // Fetching data using custom hook with structured data and error handling if needed.
  const { data: projectData } = useAxios(`projects/getOneProject?id=${id}`);
  const { data: dataMilestones } = useAxios(`milestone/getMilestone`, "post", {
    id: milestoneID,
  });
  const { data: dataMilestonesFiles } = useAxios(
    `milestone/getFilesofSingleMilestone`,
    "post",
    {
      milestoneID: milestoneID,
    }
  );

  // Data transformation to add unique ids, memoized to prevent unnecessary recalculations.
  const MilestonesData =
    dataMilestones?.result?.details?.map((e, i) => ({
      ...e,
      id: i + 1,
    })) ?? [];

  const FilesData =
    dataMilestonesFiles?.result?.map((e, i) => ({
      ...e,
      id: i + 1,
    })) ?? [];

  // Mapping value to its respective component for cleaner conditional rendering.
  const renderContent = [
    <Overview
      key="overview"
      milestoneFilesData={FilesData}
      milestoneDetails={MilestonesData}
      milestoneData={dataMilestones?.result}
    />,
    <Milestones
      key="milestones"
      milestoneFilesData={FilesData}
      milestoneDetails={MilestonesData}
    />,
    <UploadedFiles key="uploadedFiles" milestoneFilesData={FilesData} />,
  ];

  return (
    <Grid container gap={4} sx={{ pt: 2, pb: 2 }}>
      <Grid item xs={12}>
        <BackArrowButtonComp
          route={`/department/dashboard/projectmangent/${id}`}
          marginBottom={"20px"}
          marginTop={"0px"}
        />
        <MainHeadings text="Project Management" />
      </Grid>
      <Grid item xs={12}>
        <ProjectName
          projectData={projectData?.result}
          value={value}
          handleChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TransitionGroup>
          <Fade in timeout={500}>
            <div>{renderContent[value]}</div>
          </Fade>
        </TransitionGroup>
      </Grid>
      <Grid item xs={12}>
        <ChatApp />
      </Grid>
    </Grid>
  );
}

export default ProjectManagement;

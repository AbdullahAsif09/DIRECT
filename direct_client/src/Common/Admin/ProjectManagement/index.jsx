import { Fade, Grid } from "@mui/material";
import MainHeadings from "@common/AnimationMui/MainHeadings";
import ProjectName from "./ProjectName";
import Overview from "./Overview";
import Milestones from "./Milestones";
import { useEffect, useState } from "react";
import { TransitionGroup } from "react-transition-group";
import Members from "./Members";
import UploadedFiles from "./UploadedFiles";
import ChatApp from "@common/mileStoneChat";
import { useParams } from "react-router-dom";
import { useGetQueryParam, useAxios } from "@hooks";
function ProjectManagement() {
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [FilesData, setFilesData] = useState([]);
  const milestoneID = useGetQueryParam("milestones");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { data, loading, error } = useAxios(`projects/getOneProject?id=${id}`);
  const {
    data: dataMilestones,
    loading: loadingMilestones,
    error: errorMilestones,
  } = useAxios(`milestone/getMilestone`, "post", { id: milestoneID });
  const {
    data: dataMilestonesFiles,
    loading: loadingMilestonesFiles,
    error: errorMilestonesFiles,
  } = useAxios(`milestone/getFilesofSingleMilestone`, "post", {
    milestoneID: milestoneID,
  });

  const [MilestonesData, setMilestonesData] = useState([]);
  const fetchProject = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  const restructureMilestones = async () => {
    try {
      const restructureData = dataMilestones?.result?.details?.map((e, i) => {
        return { ...e, id: i + 1 };
      });
      setMilestonesData(restructureData);
    } catch (error) {}
  };
  const restructureDataFiles = () => {
    if (dataMilestonesFiles) {
      const files = dataMilestonesFiles?.result?.map((e, i) => {
        return { ...e, id: i + 1 };
      });
      setFilesData(files);
    }
  };
  useEffect(() => {
    restructureMilestones();
    restructureDataFiles();
    fetchProject();
  }, [dataMilestones, dataMilestonesFiles]);
  return (
    <Grid container gap={4} sx={{ pt: 6, pb: 2 }}>
      <Grid item xs={12}>
        <MainHeadings text={"Project Management"} />
      </Grid>
      <Grid item xs={12}>
        <ProjectName
          projectData={data?.result}
          value={value}
          handleChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        {value === 0 && (
          <TransitionGroup>
            <Fade in timeout={500}>
              <div>
                <Overview
                  milestoneFilesData={FilesData}
                  milestoneDetails={MilestonesData}
                  milestoneData={dataMilestones?.result}
                />
              </div>
            </Fade>
          </TransitionGroup>
        )}
        {value === 1 && (
          <TransitionGroup>
            <Fade in timeout={500}>
              <div>
                <Milestones
                  milestoneFilesData={FilesData}
                  milestoneDetails={MilestonesData}
                />
              </div>
            </Fade>
          </TransitionGroup>
        )}
        {value === 2 && (
          <TransitionGroup>
            <Fade in timeout={500}>
              <div>
                <Members />
              </div>
            </Fade>
          </TransitionGroup>
        )}
        {value === 3 && (
          <TransitionGroup>
            <Fade in timeout={500}>
              <div>
                <UploadedFiles milestoneFilesData={FilesData} />
              </div>
            </Fade>
          </TransitionGroup>
        )}
      </Grid>
      <Grid item xs={12}>
        <ChatApp />
      </Grid>
    </Grid>
  );
}

export default ProjectManagement;

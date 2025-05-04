import Overview from "./Overview";
import { Fade, Grid } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { useGetQueryParam, useAxios } from "@hooks/index";
import MainHeadings from "@common/AnimationMui/MainHeadings";

const transformedData = (arr = []) => {
  return arr?.map((e, i) => {
    return {
      ...e,
      id: i + 1,
    };
  });
};

function ProjectsAnalytics() {
  const mid = useGetQueryParam("milestones");

  const { data: Milestones } = useAxios(`milestone/getMilestone`, "post", {
    id: mid,
  });
  const { data: Files } = useAxios(
    `milestone/getFilesofSingleMilestone`,
    "post",
    {
      milestoneID: mid,
    }
  );

  const FilesData = transformedData(Files?.result);
  const MilestonesData = transformedData(Milestones?.result?.details);

  return (
    <Grid container gap={4} sx={{ pb: 2 }}>
      <Grid item xs={12}>
        <MainHeadings text={"Analytics"} />
      </Grid>

      <Grid item xs={12}>
        <TransitionGroup>
          <Fade in timeout={500}>
            <div>
              <Overview
                milestoneFilesData={FilesData ?? []}
                milestoneDetails={MilestonesData ?? []}
                milestoneData={Milestones?.result}
              />
            </div>
          </Fade>
        </TransitionGroup>
      </Grid>
    </Grid>
  );
}

export default ProjectsAnalytics;

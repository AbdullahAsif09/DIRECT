import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import Cards from "@common/ViewProjects/Cards";
import { Skeletons, TabsCommon } from "@common/UI";
import MainHeadings from "@common/AnimationMui/MainHeadings";
import { useAxios, useGetRole } from "@hooks";
import { useSelector } from "react-redux";

function Projects() {
  const [Tabs, setTabs] = useState(0);
  const handleChangeTabs = (e, v) => setTabs(v);
  const role = useGetRole();
  const arrayTabs = ["All", "Recommended"];
  const profile = useSelector((state) => state.profile?.profile);
  const { data } = useAxios("projects/getProjectsUnclassified");
  let profileID;
  if (role === "industry") {
    profileID = profile?.industry?._id;
  }
  if (role === "academia") {
    profileID = profile?.academia?._id;
  }
  const { data: recommendedProjects } = useAxios(
    "projects/getProjectsForUser",
    "post",
    { userId: profileID }
  );
  return (
    <div>
      <Grid sx={{ mt: 5 }} container gap={4}>
        <Grid item xs={12}>
          <MainHeadings text={"Projects"} />
        </Grid>
        <Grid item xs={12}>
          <TabsCommon
            arrayTabs={arrayTabs}
            handleChange={handleChangeTabs}
            value={Tabs}
          />
        </Grid>
        {Tabs === 0 && (
          <Grid item xs={12}>
            {!data?.result?.length ? (
              <Typography variant={"h2"} sx={{ color: "gray" }}>
                No Projects Found
              </Typography>
            ) : data?.result?.length > 0 ? (
              <Cards cardsData={data?.result} />
            ) : (
              <Grid container gap={1}>
                {Array(4)
                  .fill(null)
                  .map((e, i) => (
                    <Grid
                      key={i}
                      item
                      xs={12}
                      sm={12}
                      md={5.86}
                      lg={3.85}
                      xl={2.86}
                    >
                      <Skeletons />
                    </Grid>
                  ))}
              </Grid>
            )}
          </Grid>
        )}
        {Tabs === 1 && (
          <Grid item xs={12}>
            {!recommendedProjects?.result?.length ? (
              <Typography variant={"h2"} sx={{ color: "gray" }}>
                No Projects Found
              </Typography>
            ) : recommendedProjects?.result?.length > 0 ? (
              <Cards recommended cardsData={recommendedProjects?.result} />
            ) : (
              <Grid container gap={1}>
                {Array(4)
                  .fill(null)
                  .map((e, i) => (
                    <Grid
                      key={i}
                      item
                      xs={12}
                      sm={12}
                      md={5.86}
                      lg={3.85}
                      xl={2.86}
                    >
                      <Skeletons />
                    </Grid>
                  ))}
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default Projects;

import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainHeadings from "@common/AnimationMui/MainHeadings";
import FormMilestone from "./FormMilestone";
import { useGetQueryParam, useAxios } from "@hooks";
import { TabsCommon } from "@common/UI";
import TypographyMUI from "@common/MUI/TypographyMUI";
import RejectedMilestone from "./RejectedMilestone";

function ViewMilestone() {
  const { id: milestoneID } = useParams();
  const milestoneIndex = useGetQueryParam("no");
  const { data: dataMilestones } = useAxios(`milestone/getMilestone`, "post", {
    id: milestoneID,
  });
  const arrayTabs = ["Current Milestone", "Rejected Milestone"];
  const [Tabs, setTabs] = useState(0);
  const handleChangeTabs = (event, newValue) => {
    setTabs(newValue);
  };

  const rejectedMilestone = dataMilestones?.result?.newDetails?.filter(
    (e) => e?.milestoneIndex == milestoneIndex && e?.inReview === false
  );
  useEffect(() => {}, []);

  return (
    <Grid container gap={6} sx={{ pt: 8, pb: 4 }}>
      <Grid item xs={12}>
        <MainHeadings text={"Milestone"} />
      </Grid>
      <TabsCommon
        arrayTabs={arrayTabs}
        handleChange={handleChangeTabs}
        value={Tabs}
      />
      {Tabs === 0 && (
        <Grid item xs={12}>
          <FormMilestone
            milestoneID={milestoneID}
            milestoneIndex={milestoneIndex}
          />
        </Grid>
      )}
      {Tabs === 1 && rejectedMilestone.length > 0 ? (
        <Grid item xs={12}>
          <RejectedMilestone milestoneData={rejectedMilestone[0]} />
        </Grid>
      ) : (
        <Grid item xs={12}>
          <TypographyMUI variant={"h4"}>No changes are rejected</TypographyMUI>
        </Grid>
      )}
    </Grid>
  );
}

export default ViewMilestone;

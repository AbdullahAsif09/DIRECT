import { Grid, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import ProjectName from "./ProjectName";
import DetailComp from "./Detail";
import ProjectTask from "./Tasks";
import Members from "./Members";
import ProjectFile from "./Files";
import Activity from "./Activity";
import { useParams } from "react-router-dom";
import { useGetQueryParam, useAxios } from "@hooks";
import { Spinner } from "../../UI";
import ChatApp from "@common/mileStoneChat";
import ButtonMui from "@common/MUI/ButtonMUI";
import TooltipMui from "@common/AnimationMui/TooltipMui";
import { Info } from "@mui/icons-material";
const staticProjectData = {
  title:
    "Virtual reality training simulator for critical multi-operator vehicle (Indigenous Development of Virtual Reality Simulator Tank VT4)",
  description:
    "R&D project proposals, including a proposed VR training simulator for VT4 MBT, were presented to VCGS(A) at CGS Sectt, GHQ on 27 Aug 21. After several interactions and discussions, Form DP-10 was initiated by AC Dte in Jan 22. A number of IHDs were then held at AC Dte and SA&amp;MW with NUST Team to finalize the General Staff Requirements. On 22 Apr 22, the GSR was finalized at AC...",
  status: "Completed",
  image: "/assets/pmgtd-logo.svg",
  // tabs: ["Project Details", "Milestone", "Members", "Files", "Activity"],
  tabs: ["Project Details", "Milestone", "Members", "Files"],
};
export const ProjectDetail = () => {
  const { id } = useParams();
  const milestoneID = useGetQueryParam("milestones");

  const [Tab, setTab] = useState(0);

  /* project */
  const { data, loading } = useAxios(`projects/getOneProject?id=${id}`);
  /* milestones */
  const { data: dataMilestones } = useAxios(`milestone/getMilestone`, "post", {
    id: milestoneID,
  });
  /* project files */
  const { data: dataMilestonesFiles, loading: loadingMilestonesFiles } =
    useAxios(`milestone/getFilesofSingleMilestone`, "post", {
      milestoneID: milestoneID,
    });

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  /* milestone restrcuted */
  const MilestonesData = dataMilestones?.result?.details?.map((e, i) => {
    return { ...e, id: i + 1 };
  });

  /* milestone files restrucuted */
  const milestoneFiles =
    dataMilestonesFiles?.result?.map((e, i) => {
      return {
        ...e,
        id: i + 1,
        data: e?.date
          ? new Date(e?.date)?.toDateString()
          : new Date()?.toDateString(),
      };
    }) ?? [];
  return (
    <Fragment>
      <Spinner isLoading={loading} />
      <Grid container pt={2} pb={5}>
        <Grid
          item
          xs={12}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h3" py={2}>
            Projects
          </Typography>

          {/* <ButtonMui variant={"contained"} endIcon={<Info />}>
            Complete Project
          </ButtonMui> */}
        </Grid>
        <Grid item xs={12} pt={2}>
          <ProjectName
            projectData={data?.result}
            value={Tab}
            handleChange={handleChange}
            arrayTabs={staticProjectData.tabs}
            buttonContent={"Send Proposal"}
            navigationButton={"/static/navigation/path"}
          />
        </Grid>
        <Grid item xs={12}>
          {Tab === 0 && (
            <DetailComp
              MilestonesData={MilestonesData}
              dataMilestones={dataMilestones}
              milestoneFiles={milestoneFiles}
            />
          )}
          {Tab === 1 && <ProjectTask MilestonesData={MilestonesData} />}
          {Tab === 2 && <Members id={id} />}
          {Tab === 3 && <ProjectFile milestoneID={milestoneID} />}
          {Tab === 4 && <Activity />}
        </Grid>
      </Grid>
      <ChatApp />
    </Fragment>
  );
};

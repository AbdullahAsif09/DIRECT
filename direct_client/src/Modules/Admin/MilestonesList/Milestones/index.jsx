import MainHeadings from "@common/AnimationMui/MainHeadings";
import { Card, Grid, Stack } from "@mui/material";
import DataGrids from "@common/TableMui/DataGrids";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import data from "./data";
// import { useSelector } from "react-redux";
import { useAxios } from "@hooks";

function Milestones() {
  // const socket = useSelector((state) => state.socket.socket);
  const { id: projectID } = useParams();
  const { data: d } = useAxios(`admin/getProjectMilestones`, "post", {
    projectID,
  });
  const projectData = d?.result?.map((e, i) => ({
    ...e,
    id: i + 1,
  }));

  const columns = data(projectID);
  // for new values coming from mongodb stream
  const handleNewProposalValues = (data) => {
    setProposalData((prev) => [...prev, { ...data, id: prev.length + 1 }]);
  };

  // for updated specified  values coming from mongodb stream
  const handleEmitFeedbackPropsosal = (data) => {
    setProposalData((prev) =>
      prev.map((e) =>
        e._id === data._id
          ? { ...e, reviewByReviewer: data?.reviewByReviewer }
          : e
      )
    );
  };

  const handleUpdatedProposal = (data) => {
    setProposalData((prev) =>
      prev.map((e) => (e._id === data._id ? { ...data, id: e?.id } : e))
    );
  };

  // get proposals from database

  useEffect(() => {
    // socket?.on("emitFeedbackPropsosal", handleEmitFeedbackPropsosal);
    // socket?.on("newProposalCreated", handleNewProposalValues);
    // socket?.on("updatedProposalOverView", handleUpdatedProposal);
    return () => {
      // socket?.off("emitFeedbackPropsosal", handleEmitFeedbackPropsosal);
      // socket?.off("newProposalCreated", handleNewProposalValues);
      // socket?.off("updatedProposalOverView", handleNewProposalValues);
    };
  }, []);
  return (
    <Grid container gap={4}>
      <Grid item xs={12}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        ></Stack>
      </Grid>
      <Grid item xs={12}>
        <Card elevation={6}>
          <MainHeadings
            style={{
              paddingTop: "20px",
              paddingLeft: "20px",
              paddingBottom: "20px",
            }}
            variant={"h2"}
            text={"Milestones"}
          />
          <DataGrids toolBarGrid dataRow={projectData} dataColumn={columns} />
        </Card>
      </Grid>
    </Grid>
  );
}

export default Milestones;

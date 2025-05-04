import { Card, Grid, Stack } from "@mui/material";
import DataGrids from "@common/TableMui/DataGrids";
import MainHeadings from "@common/AnimationMui/MainHeadings";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import data from "./data";
import { useSelector } from "react-redux";
import { useAxios } from "@hooks";

function Proposals() {
  const socket = useSelector((state) => state.socket.socket);
  const { id: ParamsId } = useParams();

  const columns = data(ParamsId);
  const [proposalData, setProposalData] = useState([]);
  const { API } = useAxios();

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
  const GetProposals = async () => {
    try {
      const data = await API({
        url: `proposal/getProposalInfo?id=${ParamsId}`,
      });
      console.log(data, "data");
      const restructureData = data?.result.map((e, i) => ({
        ...e,
        id: i + 1,
      }));
      setProposalData(restructureData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket?.on("emitFeedbackPropsosal", handleEmitFeedbackPropsosal);
    socket?.on("newProposalCreated", handleNewProposalValues);
    socket?.on("updatedProposalOverView", handleUpdatedProposal);
    GetProposals();
    return () => {
      socket?.off("emitFeedbackPropsosal", handleEmitFeedbackPropsosal);
      socket?.off("newProposalCreated", handleNewProposalValues);
      socket?.off("updatedProposalOverView", handleNewProposalValues);
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
            text={"Proposals"}
          />
          <DataGrids toolBarGrid dataRow={proposalData} dataColumn={columns} />
        </Card>
      </Grid>
    </Grid>
  );
}

export default Proposals;

import { Grid, Typography } from "@mui/material";
import React from "react";
import { AcceptedProposals } from "@common/Project";
import MainHeadings from "@common/AnimationMui/MainHeadings";
import { useAxios, useGetRole } from "@hooks/index";
import { useSelector } from "react-redux";

const Proposals = () => {
  const role = useGetRole();
  const profile = useSelector((state) => state?.profile?.profile);
  let userID;
  if (role === "industry") {
    userID = profile?.industry?._id;
  }
  if (role === "academia") {
    userID = profile?.academia?._id;
  }
  const { data, loading, error } = useAxios(
    `admin/getProposalsForIndustryAcademia`,
    "post",
    { userID: userID }
  );
  console.log(data, "DATA");
  return (
    <Grid container pt={5} pb={5} sx={{ gap: "10px" }}>
      <MainHeadings text={"Proposals"} />
      {data?.result && <AcceptedProposals data={data?.result} />}
    </Grid>
  );
};

export default Proposals;

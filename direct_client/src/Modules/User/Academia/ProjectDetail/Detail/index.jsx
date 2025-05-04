import React from "react";
import { TabDetailCards } from "../../../../../utils/ProjectsData";
import { Grid } from "@mui/material";
import TopCard from "./Card/Card";
import AgnecyCard from "./Card/AgnecyCard";
import LatesTask from "./Card/LatesTask";
import LatestFiles from "./Card/LatestFiles";
const DetailComp = () => {
  return (
    <Grid container pt={1} pb={1}>
      <Grid container spacing={2} mt={1}>
        {TabDetailCards.map((data, index) => (
          <TopCard data={data} key={index} />
        ))}
      </Grid>
      <AgnecyCard />

      <Grid container justifyContent={"space-between"} mt={3} width={"100%"}>
        <Grid item lg={6} md={6} sm={12} xs={12} p={1}>
          <LatesTask />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} p={1}>
          <LatestFiles />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DetailComp;

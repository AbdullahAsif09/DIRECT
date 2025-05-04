import React from "react";
import { Grid } from "@mui/material";
import TopCard from "./Card/Card";
import LatesTask from "./Card/LatesTask";
import LatestFiles from "./Card/LatestFiles";
const DetailComp = ({ MilestonesData, dataMilestones, milestoneFiles }) => {
  let totalAmount = dataMilestones?.result?.details?.reduce((acc, current) => {
    return acc + current?.cost;
  }, 0);
  const TabDetailCards = [
    {
      name: "Due Date",
      title: new Date(dataMilestones?.result?.endDate).toDateString(),
      // discription: "(completed on time)",
      icon: "/assets/calendarMonth.svg",
    },
    {
      name: "Budget",
      title: totalAmount + " " + "PKR",
      // discription: "(spended PKR 50,000,000)",
      icon: "/assets/dollar.svg",
    },
    {
      name: "Tasks",
      title: MilestonesData?.length,
      // discription: "(8 task completed)",
      icon: "/assets/ccheck.svg",
    },
  ];
  return (
    <Grid container pt={1} pb={1}>
      <Grid container spacing={2} mt={1}>
        {TabDetailCards.map((data, index) => (
          <TopCard data={data} key={index} />
        ))}
      </Grid>
      {/* <AgnecyCard /> */}

      <Grid container justifyContent={"space-between"} mt={3} width={"100%"}>
        <Grid item lg={6} md={6} sm={12} xs={12} p={1}>
          <LatesTask MilestonesData={MilestonesData} />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} p={1}>
          <LatestFiles milestoneFiles={milestoneFiles} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DetailComp;

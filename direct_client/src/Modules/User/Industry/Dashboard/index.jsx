import { Card, Grid, Typography } from "@mui/material";
import React from "react";
import DashCard from "./Cards/DashCard";
import ProposalCard from "./Cards/Proposals";
import { Cardsdata } from "./Data/data";
import DashBarChart from "./Charts/DashBarChart";
import ActiveProjects from "./Cards/ActiveProjects";

const Dashboard = () => {
  return (
    <Grid container pt={5} pb={5}>
      <Typography variant="h3">Dashboard</Typography>
      {/* top cards  */}
      <Grid container spacing={2} mt={4}>
        {Cardsdata.map((data, index) => (
          <DashCard data={data} key={index} />
        ))}
      </Grid>
      {/* middle cards  */}
      <Grid container spacing={2} mt={4}>
        <Grid item xs={12} lg={5} md={6}>
          <Card
            sx={{
              boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              borderRadius: "8px",
            }}
          >
            <ProposalCard />
          </Card>
        </Grid>
        <Grid item xs={12} lg={7} md={6}>
          <Card
            sx={{
              boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              borderRadius: "8px",
            }}
          >
            <DashBarChart />
          </Card>
        </Grid>
      </Grid>

      {/* last card  */}
      <Grid container spacing={2} mt={4}>
        <Grid item xs={12} lg={12} md={12}>
          <Card
            sx={{
              boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              borderRadius: "8px",
            }}
          >
            <ActiveProjects />
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;

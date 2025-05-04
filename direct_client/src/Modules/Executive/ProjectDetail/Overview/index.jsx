import { Grid, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import styled from "styled-components";
 import { CardData } from "./data";
import { LineChart } from "@mui/x-charts";
import SubAdmins from "./Cards/SubAdmins";
import LatestTasks from "./Cards/LatestTasks";
import LatestFiles from "./Cards/LatestFiles";

const Overview = () => {
  return (
    <Box width={"100%"}>
      <Grid container marginTop={2} justifyContent={"space-between"}>
        {/* top cards */}
        {CardData.map((item, index) => (
          <CardStyled
            key={index}
            item
            xs={12}
            sm={12}
            md={6}
            lg={3.8}
            padding={1.5}
          >
            <Stack
              width={"100%"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"start"}
            >
              <Stack gap={2}>
                <Typography>{item.title}</Typography>
                <Typography variant="h2">
                  {item.description}
                  <Box component={"span"} fontSize={"13px"} fontWeight={"500"}>
                    {item.detail}
                  </Box>{" "}
                </Typography>
              </Stack>
              <Box component={"img"} src={item.icon} />
            </Stack>
          </CardStyled>
        ))}
      </Grid>

      {/* middle cards  */}

      <Grid container marginTop={"20px"} justifyContent={"space-between"}>
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          lg={7.2}
          sx={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", padding: 1.5 }}
        >
          <Typography variant="h2">Revenue</Typography>
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            width={850}
            height={300}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          lg={4.5}
          sx={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", padding: 1.5 }}
        >
          <SubAdmins />
        </Grid>

        {/* bottom cards  */}
        <Grid container marginTop={"20px"} justifyContent={"space-between"}>
          <Grid
            item
            xs={12}
            sm={12}
            md={5}
            lg={5.8}
            sx={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", padding: 1.5 }}
          >
            <LatestTasks />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={5}
            lg={5.8}
            sx={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", padding: 1.5 }}
          >
            <LatestFiles />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Overview;

const CardStyled = styled(Grid)({
  borderRadius: "7px",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
});

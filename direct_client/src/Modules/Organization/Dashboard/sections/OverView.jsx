import { Avatar, Box, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { styled } from "@mui/material";
import Data from "../data";
import { Email as EmailIcon, Person as PersonIcon } from "@mui/icons-material";
import { LineChart } from "@mui/x-charts/LineChart";
import { keys } from "@config";
import { useAxios } from "@hooks/index";
import { useSelector } from "react-redux";
const OverView = ({ data }) => {
  const { CardData, LastCardsData } = Data(data);
  const profile = useSelector((state) => state?.profile?.profile);
  const id = profile?.organization;

  const url = `organizations/getOrganizationStats/${id}?id=${profile?._id}`;
  const { data: stats } = useAxios(url, "get");

  return (
    <Grid
      container
      marginTop={2}
      justifyContent={"space-between"}
      gap={2}
      mb={2}
    >
      {/* top cards */}
      {CardData.map((item, index) => {
        const info = stats?.projects?.[item?.type];

        return (
          <CardStyled
            key={index}
            item
            xs={12}
            sm={12}
            md={12}
            lg={3.8}
            xl={3.9}
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
                  {info}
                  <Box component={"span"} fontSize={"13px"} fontWeight={"500"}>
                    {item.detail}
                  </Box>{" "}
                </Typography>
              </Stack>
              <Box component={"img"} src={item.icon} />
            </Stack>
          </CardStyled>
        );
      })}

      <CardStyled xs={12} md={12} lg={3} p={2} item>
        {data?.admin?.name ? (
          <Fragment>
            <Stack
              width={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
              paddingY={1}
            >
              <Avatar
                src={keys.rootserver + data?.admin?.image}
                sx={{ width: "120px", height: "120px" }}
              />
            </Stack>
            <Typography fontWeight={500} textAlign={"center"} m={1}>
              Organization Admin{" "}
            </Typography>
            <Divider sx={{ marginTop: 1 }} />

            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={1}
              marginTop={1}
            >
              <PersonIcon />
              <Stack>
                <Typography color={"#959FA3"} variant="body2">
                  NAME
                </Typography>
                <Typography>{data?.admin?.name}</Typography>
              </Stack>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={1}
              marginTop={1}
            >
              <EmailIcon />
              <Stack>
                <Typography color={"#959FA3"} variant="body2">
                  EMAIL
                </Typography>
                <Typography>{data?.admin?.email}</Typography>
              </Stack>
            </Stack>
          </Fragment>
        ) : (
          "No admin assinged yet!"
        )}
      </CardStyled>

      {/* statistic card  */}
      <CardStyled xs={12} md={12} lg={8.8} item>
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
              area: true,
            },
          ]}
          height={300}
          sx={{ width: { xs: "auto", lg: "auto" } }}
        />
      </CardStyled>

      {/* bottom cards */}
      {LastCardsData.map((item, index) => {
        const projects = stats?.projects[item?.type];

        return (
          <CardStyled
            key={index}
            item
            xs={12}
            sm={12}
            md={12}
            lg={5.91}
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
                <Typography variant="h2">{projects}</Typography>
              </Stack>
              <Box component={"img"} src={item.icon} />
            </Stack>
          </CardStyled>
        );
      })}
    </Grid>
  );
};

export default OverView;

const CardStyled = styled(Grid)({
  borderRadius: "7px",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
});

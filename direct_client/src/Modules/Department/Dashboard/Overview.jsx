import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Stack, Avatar } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import DepartmentProjects from "../Projects";
import AdminCard from "./AdminCard";
import { keys } from "@config";
import { useAxios } from "@hooks/index";
import { useSelector } from "react-redux";

const chartSetting = {
  yAxis: [
    {
      label: "Projects Created",
    },
  ],
  series: [{ dataKey: "count", label: "Projects" }],
  height: 300,
  sx: {},
};
const months = [
  { month: "January", count: 0 },
  { month: "February", count: 0 },
  { month: "March", count: 0 },
  { month: "April", count: 0 },
  { month: "May", count: 0 },
  { month: "June", count: 0 },
  { month: "July", count: 0 },
  { month: "August", count: 0 },
  { month: "September", count: 0 },
  { month: "October", count: 0 },
  { month: "November", count: 0 },
  { month: "December", count: 0 },
];
const Overview = ({
  dataProjects,
  dataDepartment,
  dataDepartmentsProjectsCount,
  dataDepartmentsProjectsGraph,
}) => {
  const profile = useSelector((state) => state.profile?.profile);
  const id = profile?.department;
  const { data: dataDepAdmin } = useAxios(`departments/getDepartmentSuperAdmin?id=${id}`);
  const { data: dataDepExe } = useAxios(`departments/getDepartmentExecutiveAdmin?id=${id}`);
  const [GraphData, setGraphData] = useState(months);

  const restructureGraphData = () => {
    dataDepartmentsProjectsGraph?.forEach((element) => {
      const monthIndex = element?._id?.month - 1;
      months[monthIndex].count = element?.count;
    });
    setGraphData(months);
  };
  useEffect(() => {
    restructureGraphData();
  }, [dataDepartmentsProjectsGraph]);

  return (
    <Grid container marginTop={2} gap={2} paddingY={2}>
      <Grid item xs={12}>
        <Box
          sx={{
            width: "100%",
            borderRadius: "16px",
            overflow: "hidden",
            bgcolor: "whitesmoke",
            position: "relative",
          }}
        >
          <Box>
            <Box
              sx={{
                width: "100%",
                height: 160,
                bgcolor: "#d0e2f4",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
                "@media screen and (max-width: 992px)": {
                  height: 100,
                },
              }}
            />
            <Avatar
              src={keys?.rootserver + dataDepartment?.image?.[0]}
              sx={{
                width: 120,
                height: 120,
                borderRadius: "10px",
                border: "4px solid white",
                position: "absolute",
                top: "34%",
                left: "7%",
                transform: "translateX(-50%)",
                zIndex: 10,
                "@media screen and (max-width: 992px)": {
                  width: 90,
                  height: 90,
                  left: "60px",
                  top: "20%",
                },
              }}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              paddingY: 2,
              paddingTop: 2,
              display: "flex",
              justifyContent: "end",
              bgcolor: "whitesmoke",
              borderBottomLeftRadius: "16px",
              borderBottomRightRadius: "16px",
            }}
          >
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              width={"calc(100% - 120px - 4%)"}
              sx={{
                "@media screen and (max-width: 992px)": {
                  flexDirection: "column",
                  width: "calc(100% - 2.5%)",
                  marginTop: "35px",
                  alignItems: "flex-start",
                  gap: 1,
                },
              }}
              marginRight={1}
            >
              <Stack direction={"row"} alignItems={"center"} gap={2}>
                <Stack>
                  <Typography variant="h3">{dataDepartment?.name}</Typography>
                  <Typography>Function</Typography>
                </Stack>
              </Stack>

              <Stack
                rowGap={1}
                columnGap={4}
                flexWrap={"wrap"}
                direction={"row"}
                alignItems={"center"}
              >
                <Stack>
                  <Typography variant="h4">{dataDepAdmin?.result?.name ?? "----"}</Typography>
                  <Typography>Dpt Admin</Typography>
                </Stack>
                <Stack>
                  <Typography variant="h4">{dataDepartmentsProjectsCount ?? 0}</Typography>
                  <Typography>Total Projects</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Grid>

      <AdminCard
        title="Department Admin"
        details={{
          name: dataDepAdmin?.result?.name ?? "----",
          email: dataDepAdmin?.result?.email ?? "----",
          phone: dataDepAdmin?.result?.phone ?? "----",
          password: "----",
        }}
      />
      <AdminCard
        title="Executive Admin"
        details={{
          name: dataDepExe?.result?.name ?? "----",
          email: dataDepExe?.result?.email ?? "----",
          phone: dataDepExe?.result?.phone ?? "----",
          password: "----",
        }}
      />

      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        xl={6}
        sx={{
          borderRadius: "7px",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
        }}
      >
        <BarChart
          dataset={GraphData}
          xAxis={[{ scaleType: "band", dataKey: "month" }]}
          {...chartSetting}
        />
      </Grid>

      <DepartmentProjects dataProjects={dataProjects} />
    </Grid>
  );
};

export default Overview;

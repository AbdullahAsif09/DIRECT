import { useEffect, useState } from "react";
import { Grid, Stack, ButtonGroup } from "@mui/material";
import StatsCard from "./Cards/StatsCard";
import { BarChart } from "@mui/x-charts";
import { useAxios } from "../../../Hooks";
import {
  analytic_icon1,
  analytic_icon2,
  analytic_icon3,
} from "../../../../public/assets/icons";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { useSelector } from "react-redux";
import ButtonMui from "@common/MUI/ButtonMUI";
import MainHeadings from "@common/AnimationMui/MainHeadings";
import TypographyGrow from "@common/AnimationMui/TypographyGrow";
import { useNavigate } from "react-router-dom";
import TypographyMUI from "@common/MUI/TypographyMUI";
const Dashboard = () => {
  const navigate = useNavigate();
  const socket = useSelector((state) => state.socket?.socket);
  const [graphData, setGraphData] = useState([]);
  const [graphSeriesData, setGraphSeriesData] = useState([]);
  const {
    data: dataDashboard,
    error: errorDashboard,
    loading: loadingDashboard,
  } = useAxios("executive/getDashboardDetails");
  const {
    data: dataProjectByOrganization,
    error: errorProjectByOrganization,
    loading: loadingProjectByOrganization,
  } = useAxios("executive/getprojectsDataByOrganization");

  const statsData = [
    {
      icon: analytic_icon1,
      title: "Total Projects",
      value: dataDashboard?.data?.totalProjects,
      change: -2.86,
    },
    {
      icon: analytic_icon2,
      title: "Total Organizations",
      value: dataDashboard?.data?.totalOrganizations ?? 0,
      change: -2.86,
    },
    {
      icon: analytic_icon3,
      title: "Total Completed Projects",
      value: dataDashboard?.data?.totalCompletedProjects ?? 0,
      change: -2.86,
    },
  ];
  const chartSetting = {
    yAxis: [
      {
        label: "Projects Created",
      },
    ],
    height: 400,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };

  const valueFormatter = (value) => `${value}`;
  const transformData = (data) => {
    const result = [];
    const yearMap = {};

    data?.forEach((item) => {
      const { year, organization, totalProjects } = item;

      if (!yearMap[year]) {
        yearMap[year] = { year, [organization]: totalProjects };
      } else {
        yearMap[year][organization] =
          (yearMap[year][organization] || 0) + totalProjects;
      }
    });

    for (const year in yearMap) {
      result?.push(yearMap[year]);
    }

    return result;
  };
  const convertData = (data) => {
    const result = data?.map((item) => {
      return {
        dataKey: item?.organization, // Create a dataKey, e.g., 'organizationA'
        label: item?.organization, // Use organization name as label
        valueFormatter: valueFormatter, // Attach the valueFormatter
      };
    });

    return result;
  };

  const restructureData = () => {
    const transformedData = transformData(dataProjectByOrganization?.data);
    const convertedData = convertData(dataProjectByOrganization?.data);
    setGraphData(transformedData);
    setGraphSeriesData(convertedData);
  };
  useEffect(() => {
    restructureData();
  }, [dataProjectByOrganization]);

  return (
    <Grid container pt={5} pb={5}>
      <Grid container alignItems="center" justifyContent="space-between">
        <MainHeadings variant="h1" text={"Executive Dashbaord"} />
      </Grid>
      <Grid container marginTop={"20px"} gap={8}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {statsData.map((stat, index) => (
              <Grid item xs={12} sm={4} md={4} lg={4} key={index}>
                <StatsCard {...stat} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* charts  */}

        <Grid container xs={12} marginTop={"20px"}>
          <Stack
            sx={{ width: "100%" }}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <TypographyGrow
              textAlign={"left"}
              variant={"h2"}
              text={"Total Projects"}
            />
          </Stack>
          <Stack flexDirection={"row"} gap={2}>
            <TypographyMUI></TypographyMUI>
          </Stack>
          {graphSeriesData?.length > 0 && graphData?.length > 0 && (
            <BarChart
              onItemClick={(e, d) => {
                const number = parseInt(d?.seriesId.slice(-1));
                const req = Object.keys(graphData?.[d?.dataIndex])?.filter(
                  (e, i) => i === number + 1
                );
                const reqOrgID = dataProjectByOrganization?.data?.filter(
                  (e) => e?.organization === req[0]
                );
                navigate(
                  `/executive/organization/${reqOrgID?.[0]?._id?.organization}`
                );
              }}
              dataset={graphData ?? []}
              series={graphSeriesData ?? []}
              tooltip={{ trigger: "axis" }}
              xAxis={[{ scaleType: "band", dataKey: "year" }]}
              {...chartSetting}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;

{
  /* <Grid item xs={12} marginTop={"20px"}>
            <Grid container spacing={2}>
              {departmentData.map((dept, index) => (
                <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                  <DepartmentCard {...dept} />
                </Grid>
              ))}
            </Grid>
          </Grid> */
}

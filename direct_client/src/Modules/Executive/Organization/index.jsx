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
import { useNavigate, useParams } from "react-router-dom";
import TypographyMUI from "@common/MUI/TypographyMUI";
const Organization = () => {
  const navigate = useNavigate();
  const { id: organizationID } = useParams();
  const socket = useSelector((state) => state.socket?.socket);
  const [ViewMonthlyGraphData, setViewMonthlyGraphData] = useState(false);
  const [graphData, setGraphData] = useState([]);
  const [graphSeriesData, setGraphSeriesData] = useState([]);
  const {
    data: dataSummaryOrganization,
    error: errorSummaryOrganization,
    loading: loadingSummaryOrganization,
  } = useAxios(`executive/getDashboardSummaryByOrganization/${organizationID}`);
  const {
    data: dataGraphyOrganization,
    error: errorGraphyOrganization,
    loading: loadingGraphyOrganization,
  } = useAxios(`executive/getOrganizationProjectData/${organizationID}`);
  console.log(dataGraphyOrganization, "dataGraphyOrganization");
  const statsData = [
    {
      icon: analytic_icon1,
      title: "Total Projects",
      value: dataSummaryOrganization?.data?.totalProjects ?? 0,
      change: -2.86,
    },
    {
      icon: analytic_icon2,
      title: "Total Departments",
      value: dataSummaryOrganization?.data?.totalDepartments ?? 0,
      change: -2.86,
    },
    {
      icon: analytic_icon3,
      title: "Total Completed Projects",
      value: dataSummaryOrganization?.data?.totalCompletedProjects ?? 0,
      change: -2.86,
    },
  ];
  const datasetMonthly = [
    {
      london: 59,
      paris: 57,
      newYork: 86,
      seoul: 21,
      month: "Jan",
    },
    {
      london: 50,
      paris: 52,
      newYork: 78,
      seoul: 28,
      month: "Feb",
    },
    {
      london: 47,
      paris: 53,
      newYork: 106,
      seoul: 41,
      month: "Mar",
    },
    {
      london: 54,
      paris: 56,
      newYork: 92,
      seoul: 73,
      month: "Apr",
    },
    {
      london: 57,
      paris: 69,
      newYork: 92,
      seoul: 99,
      month: "May",
    },
    {
      london: 60,
      paris: 63,
      newYork: 103,
      seoul: 144,
      month: "June",
    },
    {
      london: 59,
      paris: 60,
      newYork: 105,
      seoul: 319,
      month: "July",
    },
    {
      london: 65,
      paris: 60,
      newYork: 106,
      seoul: 249,
      month: "Aug",
    },
    {
      london: 51,
      paris: 51,
      newYork: 95,
      seoul: 131,
      month: "Sept",
    },
    {
      london: 60,
      paris: 65,
      newYork: 97,
      seoul: 55,
      month: "Oct",
    },
    {
      london: 67,
      paris: 64,
      newYork: 76,
      seoul: 48,
      month: "Nov",
    },
    {
      london: 61,
      paris: 70,
      newYork: 103,
      seoul: 25,
      month: "Dec",
    },
  ];
  const datasetYearly = [
    {
      london: 50,
      paris: 15,
      newYork: 18,
      seoul: 21,
      month: "2010",
    },
    {
      london: 10,
      paris: 22,
      newYork: 48,
      seoul: 18,
      month: "2011",
    },
    {
      london: 17,
      paris: 23,
      newYork: 16,
      seoul: 51,
      month: "2012",
    },
    {
      london: 94,
      paris: 86,
      newYork: 72,
      seoul: 63,
      month: "2013",
    },
    {
      london: 67,
      paris: 59,
      newYork: 42,
      seoul: 39,
      month: "2014",
    },
    {
      london: 20,
      paris: 13,
      newYork: 13,
      seoul: 14,
      month: "2015",
    },
    {
      london: 25,
      paris: 16,
      newYork: 15,
      seoul: 19,
      month: "2016",
    },
    {
      london: 5,
      paris: 6,
      newYork: 1,
      seoul: 19,
      month: "2017",
    },
    {
      london: 11,
      paris: 21,
      newYork: 35,
      seoul: 41,
      month: "2018",
    },
    {
      london: 40,
      paris: 35,
      newYork: 27,
      seoul: 15,
      month: "2019",
    },
    {
      london: 17,
      paris: 44,
      newYork: 36,
      seoul: 28,
      month: "2020",
    },
    {
      london: 11,
      paris: 30,
      newYork: 13,
      seoul: 25,
      month: "2021",
    },
  ];
  const chartSetting = {
    yAxis: [
      {
        label: "rainfall (mm)",
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
      const { year, department, totalProjects } = item;

      if (!yearMap[year]) {
        yearMap[year] = { year, [department]: totalProjects };
      } else {
        yearMap[year][department] =
          (yearMap[year][department] || 0) + totalProjects;
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
        dataKey: item?.department, // Create a dataKey, e.g., 'organizationA'
        label: item?.department, // Use organization name as label
        valueFormatter: valueFormatter, // Attach the valueFormatter
      };
    });

    return result;
  };

  const restructureData = () => {
    const transformedData = transformData(dataGraphyOrganization?.data);
    const convertedData = convertData(dataGraphyOrganization?.data);
    setGraphData(transformedData);
    setGraphSeriesData(convertedData);
  };
  useEffect(() => {
    restructureData();
  }, [dataGraphyOrganization]);
  return (
    <Grid container pt={5} pb={5}>
      <Grid container alignItems="center" justifyContent="space-between">
        <MainHeadings variant="h1" text={"Executive Dashbaord"} />
      </Grid>
      <Grid container alignItems="center" justifyContent="space-between">
        <TypographyMUI sx={{ my: 4 }} variant={"h2"}>
          Organization Name:{" "}
          {dataSummaryOrganization?.data?.OrganizationName?.name ?? "..."}
        </TypographyMUI>
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
        {graphSeriesData?.length > 0 && graphData?.length > 0 && (
          <Grid container xs={12} marginTop={"20px"}>
            <BarChart
              onItemClick={(e, d) => {
                const number = parseInt(d?.seriesId.slice(-1));
                const req = Object.keys(graphData?.[d?.dataIndex])?.filter(
                  (e, i) => i === number + 1
                );
                const reqOrgID = dataGraphyOrganization?.data?.filter(
                  (e) => e?.department === req[0]
                );
                navigate(
                  `/executive/department/${reqOrgID?.[0]?._id?.department}`
                );
              }}
              tooltip={{ trigger: "axis" }}
              xAxis={[{ scaleType: "band", dataKey: "year" }]}
              dataset={graphData ?? []}
              series={graphSeriesData ?? []}
              {...chartSetting}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Organization;

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

import React, { useEffect, useState } from "react";
import { Grid, Typography, Tabs, Tab, Box, Stack } from "@mui/material";
import { departmentData } from "./Cards/data";
import StatsCard from "./Cards/StatsCard";
import DepartmentCard from "./Cards/DepartmentCard";
import {
  BarChart,
  ChartsOnAxisClickHandler,
  PieChart,
  ResponsiveChartContainer,
} from "@mui/x-charts";
import SubAdmins from "./Cards/SubAdmins";
import Projects from "../Projects";
import { useAxios } from "../../../Hooks";
import {
  analytic_icon1,
  analytic_icon2,
  analytic_icon3,
  analytic_icon4,
  analytic_icon5,
} from "../../../../public/assets/icons";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { useSelector } from "react-redux";
import ButtonMui from "@common/MUI/ButtonMUI";
import { useNavigate, useParams } from "react-router-dom";
import MainHeadings from "@common/AnimationMui/MainHeadings";
import TypographyMUI from "@common/MUI/TypographyMUI";
import InputFields from "@common/InputFields/InputFields";
import BackButton from "@common/BackButton";
const Departments = () => {
  const { id } = useParams();
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  const [CumulativeData, setCumulativeData] = useState(true);
  const [onTimeProjects, setOnTimeProjects] = useState([]);
  const socket = useSelector((state) => state.socket?.socket);
  const [switchChartTimeDelay, setSwitchChartTimeDelay] = useState(false);
  const [switchChartOnTime, setSwitchChartOnTime] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const {
    data: dataDepartmentsDashboard,
    error: errorDepartmentsDashboard,
    loading: loadingDepartmentsDashboard,
  } = useAxios(`executive/getDepartmentOverview/${id}`);

  const {
    data: dataDepartmentGraphy,
    error: errorDepartmentGraphy,
    loading: loadingDepartmentGraphy,
  } = useAxios(
    `executive/getProjectsDataForDepartments?departmentId=${id}&startDate=${startDate}&endDate=${endDate}`
  );
  const {
    data: dataDepartmentOngoingProjectsGraphy,
    error: errorDepartmentOngoingProjectsGraphy,
    loading: loadingDepartmentOngoingProjectsGraphy,
  } = useAxios(
    `executive/getProjectsOntimeDataForDepartments?departmentID=${id}`
  );
  console.log(
    dataDepartmentOngoingProjectsGraphy,
    "dataDepartmentOngoingProjectsGraphy"
  );
  const statsData = [
    {
      icon: analytic_icon1,
      title: "Total Projects",
      value: dataDepartmentsDashboard?.data?.totalProjects ?? 0,
      change: -2.86,
    },
    {
      icon: analytic_icon2,
      title: "Total Projects Completed",
      value: dataDepartmentsDashboard?.data?.totalCompletedProjects ?? 0,
      change: -2.86,
    },
    {
      icon: analytic_icon3,
      title: "Total Admins",
      value: dataDepartmentsDashboard?.data?.totalAdmins ?? 0,
      change: -2.86,
    },
  ];

  const updatedDatasetCumulative = [
    {
      "Initiated Projects": 0,
      "Pre-award Projects": 0,
      "Total In Progress Projects": 0,
      "Completed Projects": 0,
      month: "Jan",
    },
    {
      "Initiated Projects": 0,
      "Pre-award Projects": 0,
      "Total In Progress Projects": 0,
      "Completed Projects": 0,
      month: "Feb",
    },
    {
      "Initiated Projects": 0,
      "Pre-award Projects": 0,
      "Total In Progress Projects": 0,
      "Completed Projects": 0,
      month: "Mar",
    },
    {
      "Initiated Projects": 0,
      "Pre-award Projects": 0,
      "Total In Progress Projects": 0,
      "Completed Projects": 0,
      month: "Apr",
    },
    {
      "Initiated Projects": 0,
      "Pre-award Projects": 0,
      "Total In Progress Projects": 0,
      "Completed Projects": 0,
      month: "May",
    },
    {
      "Initiated Projects": 0,
      "Pre-award Projects": 0,
      "Total In Progress Projects": 0,
      "Completed Projects": 0,
      month: "June",
    },
    {
      "Initiated Projects": 0,
      "Pre-award Projects": 0,
      "Total In Progress Projects": 0,
      "Completed Projects": 0,
      month: "July",
    },
    {
      "Initiated Projects": 0,
      "Pre-award Projects": 0,
      "Total In Progress Projects": 0,
      "Completed Projects": 0,
      month: "Aug",
    },
    {
      "Initiated Projects": 0,
      "Pre-award Projects": 0,
      "Total In Progress Projects": 0,
      "Completed Projects": 0,
      month: "Sept",
    },
    {
      "Initiated Projects": 0,
      "Pre-award Projects": 0,
      "Total In Progress Projects": 0,
      "Completed Projects": 0,
      month: "Oct",
    },
    {
      "Initiated Projects": 0,
      "Pre-award Projects": 0,
      "Total In Progress Projects": 0,
      "Completed Projects": 0,
      month: "Nov",
    },
    {
      "Initiated Projects": 0,
      "Pre-award Projects": 0,
      "Total In Progress Projects": 0,
      "Completed Projects": 0,
      month: "Dec",
    },
  ];

  const chartSetting = {
    yAxis: [
      {
        label: "projects",
      },
    ],
    height: 350,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };

  const valueFormatter = (value) => `${value}`;

  const handleBarClick = (event, data) => {
    console.log(event, "event");
    console.log(data, "data");
    if (data && data.series.dataKey === "london") {
      // Here, data.datum contains the data for the clicked London bar
      const londonBarData = data.datum;
      console.log(londonBarData, "req data"); // Do something with the London bar data
    }
  };
  const transformData = (data) => {
    const result = data?.map((e) => ({ ...e, year: e?._id?.year }));
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
    const transformedData = transformData(
      dataDepartmentOngoingProjectsGraphy?.data
    );
    const convertedData = convertData(
      dataDepartmentOngoingProjectsGraphy?.data
    );
    setOnTimeProjects(transformedData);
    // setGraphSeriesData(convertedData);
    console.log(convertedData, "convertedData");
    console.log(transformedData, "transformedData");
  };
  useEffect(() => {
    restructureData();
  }, [dataDepartmentOngoingProjectsGraphy]);
  return (
    <Grid container pt={5} pb={5}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ pb: 5 }}
      >
        <BackButton message={"back to Home"} />
      </Grid>
      <Grid container alignItems="center" justifyContent="space-between">
        <MainHeadings variant="h1" text={"Executive Dashbaord"} />
      </Grid>
      <Grid container alignItems="center" justifyContent="space-between">
        <TypographyMUI mt={5} variant="h2">
          Department Name:{" "}
          {dataDepartmentsDashboard?.data?.departmentName?.name ?? "..."}
        </TypographyMUI>
      </Grid>
      <Grid container marginTop={"20px"}>
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

        <Grid container marginTop={"60px"}>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            mt={5}
            gap={1}
            sx={{ width: "100%" }}
          >
            <TypographyMUI variant={"h2"}>Projects</TypographyMUI>
            {/* <ButtonMui
              variant={"contained"}
              onClick={() => setCumulativeData(!CumulativeData)}
            >
              {CumulativeData
                ? "View Timeframe-Specific Data"
                : "View Cumulative Data"}
            </ButtonMui> */}
          </Stack>
          <Stack
            flexDirection={"row"}
            mt={5}
            gap={1}
            sx={{ width: "30%", marginLeft: "auto" }}
          >
            <InputFields
              type={"date"}
              labelDate={"Start Date"}
              size={"small"}
              onChange={(e) => setStartDate(new Date(e))}
            />
            <InputFields
              type={"date"}
              labelDate={"End Date"}
              onChange={(e) => setEndDate(new Date(e))}
            />
          </Stack>
          {dataDepartmentGraphy?.data?.length > 0 && (
            <BarChart
              dataset={
                dataDepartmentGraphy?.data?.length > 0
                  ? dataDepartmentGraphy?.data
                  : updatedDatasetCumulative
              }
              colors={["#ee5253", "#ff9f43", "#8c7ae6", "#54a0ff"]}
              xAxis={[{ scaleType: "band", dataKey: "year" }]}
              series={[
                {
                  dataKey: "initiatedProjects",
                  label: "Initiated Projects",
                  valueFormatter,
                },
                {
                  dataKey: "preAwardProjects",
                  label: "Pre-award Projects",
                  valueFormatter,
                },
                {
                  dataKey: "inProgressProjects",
                  label: "Total In Progress Projects",
                  valueFormatter,
                },
                {
                  dataKey: "completedProjects",
                  label: "Completed Projects",
                  valueFormatter,
                },
              ]}
              {...chartSetting}
            />
          )}
          {/* </ChartsOnAxisClickHandler> */}
        </Grid>
        <Grid item xs={12} mt={8} px={5}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <TypographyMUI variant={"h2"}>
              Project With Delay Time-line
            </TypographyMUI>
            {/* <ButtonMui
              variant={"contained"}
              onClick={() => setSwitchChartTimeDelay(!switchChartTimeDelay)}
            >
              {switchChartTimeDelay === false
                ? "Switch To PieChart"
                : "Switch To Bar Chart"}
            </ButtonMui> */}
          </Stack>
          <Stack
            flexDirection={"row"}
            gap={1}
            mt={5}
            sx={{ width: "30%", marginLeft: "auto" }}
          >
            {/* <InputFields type={"date"} label={"Start Date"} />
            <InputFields type={"date"} label={"End Date"} /> */}
          </Stack>
          {switchChartTimeDelay === false ? (
            <BarChart
              onItemClick={(e, d) => {
                navigate(`/executive/projects/:id`);
              }}
              dataset={updatedDatasetCumulative}
              xAxis={[{ scaleType: "band", dataKey: "month" }]}
              borderRadius={10}
              series={[
                {
                  dataKey: "london",
                  label: "Delay-Timeline Projects",
                  valueFormatter,
                },
              ]}
              {...chartSetting}
            />
          ) : (
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 60, label: "Jan" },
                    { id: 1, value: 15, label: "Feb" },
                    { id: 2, value: 20, label: "March" },
                    { id: 3, value: 10, label: "April" },
                    { id: 4, value: 13, label: "May" },
                    { id: 5, value: 24, label: "June" },
                    { id: 6, value: 15, label: "July" },
                    { id: 7, value: 6, label: "August" },
                    { id: 8, value: 7, label: "Sep" },
                    { id: 9, value: 18, label: "Oct" },
                    { id: 10, value: 10, label: "Nov" },
                    { id: 11, value: 1, label: "Dec" },
                  ],
                },
              ]}
              height={600}
            />
          )}
        </Grid>
        <Grid item xs={12} mt={8}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <TypographyMUI variant={"h2"}>Project On-Time</TypographyMUI>
            {/* <ButtonMui
              variant={"contained"}
              onClick={() => setSwitchChartOnTime(!switchChartOnTime)}
            >
              {switchChartOnTime === false
                ? "Switch To PieChart"
                : "Switch To Bar Chart"}
            </ButtonMui> */}
          </Stack>
          <Stack
            flexDirection={"row"}
            gap={1}
            mt={5}
            sx={{ width: "30%", marginLeft: "auto" }}
          >
            {/* <InputFields type={"date"} label={"Start Date"} />
            <InputFields type={"date"} label={"End Date"} /> */}
          </Stack>
          {switchChartOnTime === false ? (
            <BarChart
              onItemClick={(e, d) => {
                navigate(`/executive/projects/${id}`);
              }}
              colors={["#feca57", "green"]}
              borderRadius={10}
              dataset={onTimeProjects ?? []}
              xAxis={[{ scaleType: "band", dataKey: "year" }]}
              series={[
                {
                  dataKey: "projectCount",
                  label: "Projects On-Time",
                  valueFormatter,
                },
              ]}
              {...chartSetting}
            />
          ) : (
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: "Jan" },
                    { id: 1, value: 15, label: "Feb" },
                    { id: 2, value: 21, label: "March" },
                    { id: 3, value: 22, label: "April" },
                    { id: 4, value: 23, label: "May" },
                    { id: 5, value: 24, label: "June" },
                    { id: 6, value: 25, label: "July" },
                    { id: 7, value: 26, label: "August" },
                    { id: 8, value: 27, label: "Sep" },
                    { id: 9, value: 28, label: "Oct" },
                    { id: 10, value: 10, label: "Nov" },
                    { id: 11, value: 1, label: "Dec" },
                  ],
                },
              ]}
              height={600}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Departments;

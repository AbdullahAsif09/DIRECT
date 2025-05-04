import { customTheme } from "@theme/theme";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

export const chartColumn = [
  {
    projects: 10,
    month: "Jan",
  },
  {
    projects: 12,
    month: "Feb",
  },
  {
    projects: 15,
    month: "Mar",
  },
  {
    projects: 8,
    month: "Apr",
  },
  {
    projects: 14,
    month: "May",
  },
  {
    projects: 20,
    month: "June",
  },
  {
    projects: 18,
    month: "July",
  },
  {
    projects: 25,
    month: "Aug",
  },
  {
    projects: 16,
    month: "Sept",
  },
  {
    projects: 22,
    month: "Oct",
  },
  {
    projects: 19,
    month: "Nov",
  },
  {
    projects: 23,
    month: "Dec",
  },
];

export const CardsData = [
  {
    title: "PROJECTS",
    number: 2324,
    borderColor: customTheme.palette.bg.slightlyLightRed,
    info: [
      {
        number: 12,
        text: "Total Projects",
      },
      {
        number: 12,
        text: "Completed",
      },
    ],
  },
  {
    title: "PROPOSALS",
    number: 2324,
    borderColor: customTheme.palette.bg.orange,
    info: [
      {
        number: 12,
        text: "Total Projects",
      },
      {
        number: 12,
        text: "Completed",
      },
    ],
  },
  {
    title: "REVENVUE",
    number: 2324,
    borderColor: customTheme.palette.bg.parrotGreen,
    info: [
      {
        number: 12,
        text: "Total Projects",
      },
      {
        number: 12,
        text: "Completed",
      },
    ],
  },
];

export const chartSetting = {
  yAxis: [],
  height: 330,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};

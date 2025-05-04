import { AccountBalance, CalendarMonth, TaskAlt } from "@mui/icons-material";
import { customTheme } from "@theme/theme";

export const CardsData = [
  {
    title: "Due Date",
    subTitleOne: "June 30, 2022",
    subTitleTwo: "(completed on time)",
    icon: (
      <CalendarMonth sx={{ fontSize: "35px", color: "bg.slightlyLightRed" }} />
    ),
    borderColor: customTheme.palette.bg.slightlyLightRed,
  },
  {
    title: "Budget",
    subTitleOne: "PKR 50 Million",
    subTitleTwo: "(spended PKR 50 Million)",
    icon: <AccountBalance sx={{ fontSize: "35px", color: "bg.orange" }} />,
    borderColor: customTheme.palette.bg.orange,
  },
  {
    title: "Progress",
    subTitleOne: "100%",
    subTitleTwo: "(completed)",
    icon: <TaskAlt sx={{ fontSize: "35px", color: "bg.parrotGreen" }} />,
    borderColor: customTheme.palette.bg.parrotGreen,
  },
];

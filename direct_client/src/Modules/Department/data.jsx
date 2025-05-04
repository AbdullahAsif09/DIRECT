import { BusinessCenter, Dashboard, Science } from "@mui/icons-material";

export const NavigationList = [
  {
    title: "Dashboard",
    type: "noChildren",
    navigate: "/department/dashboard",
    icon: <Dashboard sx={{ color: "#F1F1F1" }} />,
  },
  {
    title: "Projects",
    type: "noChildren",
    navigate: "/department/dashboard/projects",
    icon: <Science sx={{ color: "#F1F1F1" }} />,
  },
  {
    title: "Team",
    navigate: "/department/dashboard/team",
    type: "noChildren",
    icon: <BusinessCenter sx={{ color: "#F1F1F1" }} />,
  },
];

export const userMenuList = [ ];

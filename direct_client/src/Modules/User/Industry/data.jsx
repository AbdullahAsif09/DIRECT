import {
  AccountCircle,
  BusinessCenter,
  Chat,
  Pages,
  Science,
  Star,
} from "@mui/icons-material";

export const NavigationList = [
  {
    title: "Projects",
    type: "noChildren",
    navigate: "/user/industry/projects",
    icon: <Science sx={{ color: "#F1F1F1" }} />,
  },
  {
    title: "My Proposals",
    navigate: "/user/industry/proposals",
    type: "noChildren",
    icon: <BusinessCenter sx={{ color: "#F1F1F1" }} />,
  },

  {
    title: "My Projects",
    navigate: "/user/industry/projectstarted",
    type: "noChildren",
    icon: <Pages sx={{ color: "#F1F1F1" }} />,
  },
  {
    title: "Review Proposals",
    checkRole: true,
    type: "noChildren",
    navigate: "/user/industry/reviewer",
    icon: <Star sx={{ color: "#F1F1F1" }} />,
  },
  {
    title: "Direct Rooms",
    checkRole: true,
    type: "noChildren",
    navigate: "/user/industry/directrooms",
    icon: <Chat sx={{ color: "#F1F1F1" }} />,
  },
  {
    title: "My Profile",
    checkRole: true,
    type: "noChildren",
    navigate: "/user/industry/profile",
    icon: <AccountCircle sx={{ color: "#F1F1F1" }} />,
  },
];

export const industryMenuList = [
  { label: " Swtich to User", url: "/user", type: "link" },
  { label: " Swtich to Academia", url: "/user/academia", type: "link" },
];

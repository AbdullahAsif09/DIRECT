import {
  BusinessCenter,
  Chat,
  Pages,
  Science,
  Star,
  AccountCircle,
} from "@mui/icons-material";
export const NavigationList = [
  {
    title: "Projects",
    type: "noChildren",
    navigate: "/user/academia/projects",
    icon: <Science sx={{ color: "#F1F1F1" }} />,
  },
  {
    title: "My Proposals",
    navigate: "/user/academia/proposals",
    type: "noChildren",
    icon: <BusinessCenter sx={{ color: "#F1F1F1" }} />,
  },

  {
    title: "My Projects",
    navigate: "/user/academia/projectstarted",
    type: "noChildren",
    icon: <Pages sx={{ color: "#F1F1F1" }} />,
  },
  {
    title: "Review Proposals",
    checkRole: true,
    type: "noChildren",
    navigate: "/user/academia/reviewer",
    icon: <Star sx={{ color: "#F1F1F1" }} />,
  },
  {
    title: "Direct Rooms",
    checkRole: true,
    type: "noChildren",
    navigate: "/user/academia/directrooms",
    icon: <Chat sx={{ color: "#F1F1F1" }} />,
  },
  {
    title: "My Profile",
    checkRole: true,
    type: "noChildren",
    navigate: "/user/academia/profile",
    icon: <AccountCircle sx={{ color: "#F1F1F1" }} />,
  },
];
export const academiaMenuList = [
  { label: " Swtich to User", url: "/user/industry", type: "link" },
  { label: " Swtich to Industry", url: "/user/industry", type: "link" },
 ];

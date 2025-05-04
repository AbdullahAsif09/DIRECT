import {
  Analytics,
  BusinessCenter,
  Chat,
  CorporateFare,
  CreateNewFolder,
  Draw,
  Group,
  Key,
  Public,
  Science,
  Star,
  ViewAgenda,
  AnnouncementRounded as AnnouncementIcon,
} from "@mui/icons-material";

export const navigationList = [
  {
    title: "Projects",
    type: "noChildren",
    navigate: "/directportal/dashboard",
    icon: <Science sx={{ color: "#F1F1F1" }} />,
    children: [
      {
        title: "Create Projects",
        icon: <CreateNewFolder sx={{ color: "#919191" }} />,
        type: "noChildren",
      },
      {
        title: "Draft",
        icon: <Draw sx={{ color: "#919191" }} />,
        type: "noChildren",
      },
      {
        title: "View Projects",
        icon: <ViewAgenda sx={{ color: "#919191" }} />,
        type: "Children",
        children: [
          {
            title: "Classified",
            icon: <Key sx={{ color: "#919191" }} />,
            type: "noChildren",
          },
          {
            title: "Non-Classified",
            icon: <Public sx={{ color: "#919191" }} />,
            type: "noChildren",
          },
        ],
      },
    ],
  },
  {
    title: "User Requirements",
    navigate: "/directportal/dashboard/requirements",
    type: "noChildren",
    icon: <BusinessCenter sx={{ color: "#F1F1F1" }} />,
  },

  // {
  //   title: "Team",
  //   navigate: "/directportal/dashboard/teams",
  //   type: "noChildren",
  //   icon: <Group sx={{ color: "#F1F1F1" }} />,
  // },

  {
    title: "Review Proposals",
    checkRole: true,
    type: "noChildren",
    navigate: "/directportal/dashboard/reviewer",
    icon: <Star sx={{ color: "#F1F1F1" }} />,
  },
  {
    title: "Organizations",
    checkRole: true,
    type: "noChildren",
    navigate: "/directportal/dashboard/organizations",
    icon: <CorporateFare sx={{ color: "#F1F1F1" }} />,
  },
  {
    title: "Announcements",
    checkRole: true,
    type: "noChildren",
    navigate: "/directportal/dashboard/announcements",
    icon: <AnnouncementIcon sx={{ color: "#F1F1F1" }} />,
  },
  {
    title: "Direct Rooms",
    checkRole: true,
    type: "noChildren",
    navigate: "/directportal/dashboard/directrooms",
    icon: <Chat sx={{ color: "#F1F1F1" }} />,
  },
];
export const pmnavigationList = [
  {
    title: "Projects",
    type: "noChildren",
    navigate: "/directportal/dashboard",
    icon: <Science sx={{ color: "#F1F1F1" }} />,
  },

  {
    title: "Review Proposals",
    type: "noChildren",
    navigate: "/directportal/reviewer",
    icon: <Star sx={{ color: "#F1F1F1" }} />,
  },
  {
    title: "Direct Rooms",
    checkRole: true,
    type: "noChildren",
    navigate: "/directportal/dashboard/directrooms",
    icon: <Chat sx={{ color: "#F1F1F1" }} />,
  },
  {
    title: "Analytics",
    checkRole: true,
    type: "noChildren",
    navigate: "/directportal/dashboard/analytics",
    icon: <Analytics sx={{ color: "#F1F1F1" }} />,
  },
];
export const adminAgencyMenuList = [{ label: " Admin", type: "link" }];

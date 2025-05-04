import { Home, Quiz, Api, Chat } from "@mui/icons-material";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import InfoIcon from "@mui/icons-material/Info";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import { useGetRole } from "@hooks/index";

const adminBase = `/directportal/dashboard`;
const urls = {
  admin: {
    directrooms: adminBase + "/directrooms",
  },
  users: {
    projects: "/user/projects",
    directrooms: "/user/directrooms",
  },
  user: {
    directrooms: "/user/directrooms",
  },
  useragency: {
    directrooms: "/useragency/directrooms",
  },
  fundingagency: {
    directrooms: "/fundingagency/directrooms",
  },
  organizationAdmin: {
    directrooms: "/organization/directrooms",
  },
  departmentProjectManager: {
    directrooms: "/department/directrooms",
  },
  departmentAdmin: {
    directrooms: "/department/directrooms",
  },
  executive: {
    directrooms: "/executive/directrooms",
  },
};

export const useNavItems = () => {
  const role = useGetRole();

  const getLink = (url) => {
    return !role ? "/login" : urls?.[role]?.[url] ?? "/";
  };
  const items = [
    {
      label: "Home",
      url: "/",
      icon: <Home />,
    },
    {
      label: "Projects",
      url: "projects",
      icon: <InsertChartIcon />,
    },

    {
      label: "About Us",
      url: "/about",
      icon: <InfoIcon />,
    },

    {
      label: "Technology",
      url: "/technology",
      icon: <WorkspacesIcon />,
    },
    {
      label: "Core Values",
      url: "/missionvision",
      icon: <Api />,
    },

    {
      label: "Direct Rooms",
      url: getLink("directrooms"),
      icon: <Chat />,
    },

    {
      label: "FAQs",
      url: "/",
      removeOnNav: true,
      icon: <Quiz />,
    },
  ];
  return { items };
};

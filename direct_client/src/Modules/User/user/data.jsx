import { BusinessCenter, Chat, Science, Star } from "@mui/icons-material";
import { keys } from "@config";

export const mapperProjects = ({ data }) => {
  return data?.map((data, index) => {
    return {
      key: index,
      _id: data?._id,
      published: data?.published,
      proposals: data?.proposalsAmount,
      createdAt: data?.createdAt,
      status: data?.ongoing,
      projectName: {
        name: data?.title,
        icon: keys.rootserver + data?.image?.[0],
      },
      id: index + 1,
    };
  });
};
export const mapperFiles = ({ data }) => {
  return data?.map((data, index) => {
    const name = data?.originalname.split(".");
    return {
      id: index,
      key: data?._id,
      _id: data?._id,
      fileName: {
        name: name[0],
        ext: name[1],
      },
      name: data?.originalname,
      size: data?.size,
      date: new Date(data?.createdAt)?.toDateString(),
    };
  });
};

export const mapperSocketProjects = (newProject, projects) => {
  return {
    key: projects?.data?.length,
    _id: newProject?._id,
    published: newProject?.published,
    proposals: newProject?.proposalsAmount,
    createdAt: newProject?.createdAt,
    status: newProject?.ongoing,
    projectName: {
      name: newProject?.title,
      icon: keys.rootserver + newProject?.image?.[0],
    },
    id: projects?.data?.length + 1,
  };
};

export const NavigationList = [
  {
    title: "Projects",
    type: "noChildren",
    navigate: "/user/projects",
    icon: <Science sx={{ color: "#F1F1F1" }} />,
  },
  {
    title: "Submit Requirements",
    navigate: "/user/uploadusr",
    type: "noChildren",
    icon: <BusinessCenter sx={{ color: "#F1F1F1" }} />,
  },
  {
    title: "Review Proposals",
    checkRole: true,
    type: "noChildren",
    navigate: "/user/reviewer",
    icon: <Star sx={{ color: "#F1F1F1" }} />,
  },
  {
    title: "Direct Rooms",
    checkRole: true,
    type: "noChildren",
    navigate: "/user/directrooms",
    icon: <Chat sx={{ color: "#F1F1F1" }} />,
  },
];

export const userMenuList = [
  { label: " Swtich to Academia", url: "/user/academia", type: "link" },
  { label: " Swtich to Industry", url: "/user/industry", type: "link" },
];

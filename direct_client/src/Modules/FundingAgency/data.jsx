import { keys } from "@config";
import { BusinessCenter, Chat, Science, Star } from "@mui/icons-material";

export const mapperProjects = ({ data }) => {
  return data?.map((data, index) => {
    return {
      key: index,
      _id: data._id,
      published: data?.published,
      proposals: data?.proposalsAmount,
      createdAt: data?.createdAt,
      status: data?.ongoing,
      projectName: {
        name: data.title,
        icon: keys.rootserver + data.image?.[0],
      },
      id: index + 1,
    };
  });
};
export const mapperSocketProjects = (newProject, projects) => {
  return {
    key: projects?.data?.length,
    _id: newProject._id,
    published: newProject?.published,
    proposals: newProject?.proposalsAmount,
    createdAt: newProject?.createdAt,
    status: newProject?.ongoing,
    projectName: {
      name: newProject.title,
      icon: keys.rootserver + newProject.image?.[0],
    },
    id: projects?.data?.length + 1,
  };
};
export const mapperFiles = ({ data }) => {
  return data?.map((data, index) => {
    const name = data.originalname.split(".");
    return {
      id: index,
      key: data._id,
      _id: data._id,
      fileName: {
        name: name[0],
        ext: name[1],
      },
      name: data.originalname,
      size: data.size,
      date: new Date(data.createdAt).toDateString(),
    };
  });
};

export const FANavigationList = [
  {
    title: "Projects",
    type: "noChildren",
    navigate: "/fundingagency/projects",
    icon: <Science sx={{ color: "#F1F1F1" }} />,
  },
  {
    title: "Upload USR",
    navigate: "/fundingagency/uploadusr",
    type: "noChildren",
    icon: <BusinessCenter sx={{ color: "#F1F1F1" }} />,
  },
  {
    title: "Review Proposals",
    checkRole: true,
    type: "noChildren",
    navigate: "/fundingagency/reviewer",
    icon: <Star sx={{ color: "#F1F1F1" }} />,
  },
];

export const fundingAgencyMenuList = [
  { label: " FundingAgency", type: "link" },
];

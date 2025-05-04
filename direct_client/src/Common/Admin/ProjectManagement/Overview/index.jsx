import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
  Zoom,
  styled,
} from "@mui/material";
import InfoCards from "./InfoCards";
import DataGrids from "@common/TableMui/DataGrids";
import {
  AccountBalance,
  AdminPanelSettings,
  AttachFile,
  CalendarMonth,
  Cloud,
  Download,
  TaskAlt,
  TaskSharp,
} from "@mui/icons-material";
import IconsHeadings from "@common/AnimationMui/IconHeadings";
import { customTheme } from "@theme/theme";
import TypographyMUI from "@common/MUI/TypographyMUI";
import { keys } from "@config";
const columnsFiles = [
  {
    field: "id",
    headerName: "No.",
    width: 90,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "name",
    headerName: "Reviewer",
    width: 400,
    renderCell: (param) => (
      <TypographyMUI variant="body1">{param.row?.name}</TypographyMUI>
    ),
  },
  {
    field: "url",
    headerName: "Download",
    width: 300,

    align: "center",
    headerAlign: "center",
    renderCell: (param) => {
      const url = keys.rootserver;
      return (
        <a href={url + param?.row?.url}>
          <Button
            variant="contained"
            target="_blank"
            href={param.row?.url}
            startIcon={<Download />}
          >
            Download
          </Button>
        </a>
      );
    },
  },
];

const rowsFiles = [
  {
    id: 1,
    fileName: "Design & Development of a Smart Ball Based Surveil",
    size: "45KBs",
    upload: "Ali",
    type: "pdf",
    date: "Nov 18, 2023",
    download: {
      type: "pdf",
      fileName: "Design & Development of a Smart Ball Based Surveil",
      content: "/pdf/Design & Development of a Smart Ball Based Surveil.pdf",
    },
  },
  {
    id: 2,
    fileName: "Budget Breakdown",
    size: "45KBs",
    upload: "Ali",
    type: "pdf",
    date: "Nov 18, 2023",
    download: {
      type: "pdf",
      fileName: "Budget Breakdown",
      content: "/pdf/Annexure-C (Budget Breakdown) Financial.pdf",
    },
  },
  {
    id: 3,
    fileName: "Funds Utilization Report",
    size: "523KBs",
    upload: "Ali",
    type: "pdf",
    date: "Nov 20, 2023",
    download: {
      type: "pdf",
      fileName: "Funds Utilization Report",
      content: "/pdf/Annexure-Q (Funds Utilization Report ).pdf",
    },
  },
];
const columnsSubadmin = [
  {
    field: "id",
    headerName: "No.",
    width: 60,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,

    renderCell: (params) => (
      <Stack direction={"row"} alignItems={"center"} gap={1}>
        <Avatar sizes="small" alt={`${params.row.name}`} src={""} />
        <Typography variant="body2" fontWeight={500}>
          {params.row.name}
        </Typography>
      </Stack>
    ),
  },
  {
    field: "role",
    headerName: "Role",
    width: 150,
  },
  {
    field: "joinDate",
    headerName: "Present in Team Since",
    width: 200,

    align: "right",
    headerAlign: "right",
  },
];

const rowSubadmin = [
  {
    id: 1,
    name: "Snow",
    role: "Technical Evaluator",
    joinDate: "Nov 05, 2022",
  },
  {
    id: 2,
    name: "Lannister",
    role: "Project Manager",
    joinDate: "Nov 05, 2022",
  },
  {
    id: 3,
    name: "Adam",
    role: "Web Admin",
    joinDate: "Nov 05, 2022",
  },
];
const columnsTasks = [
  {
    field: "id",
    headerName: "No.",
    width: 60,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "title",
    headerName: "Task Name",
    width: 300,

    renderCell: (params) => (
      <Tooltip
        sx={{ cursor: "pointer" }}
        arrow
        TransitionComponent={Zoom}
        placement="bottom-start"
        title={params.row.title}
      >
        <Typography variant="body2" paddingRight={3} noWrap fontWeight={500}>
          {params.row.title}
        </Typography>
      </Tooltip>
    ),
  },
  {
    field: "progress",
    headerName: "Progress",

    align: "right",
    headerAlign: "right",
    renderCell: (params) => (
      <Box sx={{ width: "100%" }}>
        {params.row.progress ? (
          <LinearProgressWithLabel value={params.row.progress} />
        ) : (
          <LinearProgressWithLabel value={0} />
        )}
      </Box>
    ),
    width: 600,
  },
  {
    field: "duration",
    headerName: "Duration",
    width: 200,

    align: "right",
    headerAlign: "right",
    renderCell: (params) => (
      <TypographyMUI>
        {params.row.duration ? params.row.duration + " Month" : 1 + " Month"}
      </TypographyMUI>
    ),
  },
  // {
  //   field: "detail",
  //   headerName: "View Details",

  //   align: "center",
  //   headerAlign: "center",
  //   renderCell: (params) => <Button variant={"contained"}>View</Button>,
  //   width: 200,
  // },
];

const rowsTasks = [
  {
    id: 1,
    taskName: "Project Planning and Research",
    progress: 100,
    dueDate: "June 30, 2022",
    detail: "",
  },
  {
    id: 2,
    taskName: "Hardware and Prototype Development",
    progress: 100,
    dueDate: "September 18, 2022",
    detail: "",
  },
  {
    id: 3,
    taskName: "Software Development",
    progress: 100,
    dueDate: "January 1, 2023",
    detail: "",
  },
  {
    id: 4,
    taskName: "Prototype Testing and Refinement",
    progress: 100,
    dueDate: "Febuary 15, 2023",
    detail: "",
  },
  {
    id: 5,
    taskName: "Power Efficiency and Night Vision",
    progress: 100,
    dueDate: "March 12, 2023",
    detail: "",
  },
  {
    id: 6,
    taskName: "Image Analytics and Finalization",
    progress: 100,
    dueDate: "April 26, 2023",
    detail: "",
  },
  {
    id: 7,
    taskName: "Deployment and Training",
    progress: 100,
    dueDate: "May 11, 2023",
    detail: "",
  },
  {
    id: 8,
    taskName: "Future Application Development",
    progress: 100,
    dueDate: "July 25, 2023",
    detail: "",
  },
  {
    id: 9,
    taskName: "Final Documentation and Presentation",
    progress: 100,
    dueDate: "September 10, 2023",
    detail: "",
  },
];
const StyledIconCloud = styled(Cloud)(({ theme }) => ({
  color: theme.palette.bg.darkBlue,
  fontSize: "20px",
}));
const StyledIconAdminPanelSettings = styled(AdminPanelSettings)(
  ({ theme }) => ({
    color: theme.palette.bg.darkBlue,
    fontSize: "20px",
  })
);
const StyledIconTaskSharp = styled(TaskSharp)(({ theme }) => ({
  color: theme.palette.bg.darkBlue,
  fontSize: "20px",
}));
function Overview({ milestoneDetails, milestoneData, milestoneFilesData }) {
  let totalAmount = milestoneData?.details?.reduce((acc, current) => {
    return acc + current?.cost;
  }, 0);
  let totalProgress = milestoneData?.details?.reduce((acc, current) => {
    return acc + current?.progress;
  }, 0);
  const averageProgress = totalProgress / milestoneData?.details?.length;
  const CardsData = [
    {
      title: "Due Date",
      subTitleOne: new Date(milestoneData?.endDate).toDateString(),
      subTitleTwo: "",
      icon: (
        <CalendarMonth
          sx={{ fontSize: "35px", color: "bg.slightlyLightRed" }}
        />
      ),
      borderColor: customTheme.palette.bg.slightlyLightRed,
    },
    {
      title: "Budget",
      subTitleOne: totalAmount + " PKR",
      subTitleTwo: " ",
      icon: <AccountBalance sx={{ fontSize: "35px", color: "bg.orange" }} />,
      borderColor: customTheme.palette.bg.orange,
    },
    {
      title: "Progress",
      subTitleOne: averageProgress ? averageProgress + "%" : 0 + "%",
      subTitleTwo: " ",
      icon: <TaskAlt sx={{ fontSize: "35px", color: "bg.parrotGreen" }} />,
      borderColor: customTheme.palette.bg.parrotGreen,
    },
  ];
  return (
    <Grid container rowGap={2} justifyContent={"space-between"}>
      <Grid item xs={12}>
        <Grid
          alignItems="stretch"
          rowGap={2}
          container
          justifyContent={"space-between"}
        >
          {CardsData?.map((e, i) => (
            <Grid item sx={12} sm={12} md={12} lg={3.9} key={i}>
              <InfoCards dataCards={e} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={6.85}>
        <Card elevation={4} sx={{ pt: 2 }}>
          <IconsHeadings
            paddingLeft={2}
            paddingTop={1}
            paddingBottom={2}
            text={"Latest Attachments"}
            icons={
              <AttachFile
                sx={{
                  color: "bg.darkBlue",
                  fontSize: "20px",
                }}
              />
            }
          />
          <DataGrids dataRow={milestoneFilesData} dataColumn={columnsFiles} />
        </Card>
      </Grid>
      <Grid item xs={5}>
        <Card elevation={4} sx={{ pt: 2 }}>
          <IconsHeadings
            paddingLeft={2}
            paddingTop={1}
            paddingBottom={2}
            text={"Management Team"}
            icons={<StyledIconAdminPanelSettings />}
          />
          <DataGrids dataRow={rowSubadmin} dataColumn={columnsSubadmin} />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card elevation={4} sx={{ pt: 2 }}>
          <IconsHeadings
            paddingLeft={2}
            paddingTop={1}
            paddingBottom={2}
            text={"Tasks"}
            icons={<StyledIconTaskSharp />}
          />
          <DataGrids dataRow={milestoneDetails} dataColumn={columnsTasks} />
        </Card>
      </Grid>
    </Grid>
  );
}

export default Overview;

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          sx={{ borderRadius: "10px", height: "5px" }}
          variant="determinate"
          {...props}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

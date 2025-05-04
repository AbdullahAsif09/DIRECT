import {
  Box,
  Button,
  Card,
  Grid,
  LinearProgress,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import InfoCards from "./InfoCards";
import DataGrids from "@common/TableMui/DataGrids";
import IconsHeadings from "@common/AnimationMui/IconHeadings";
import TypographyMUI from "@common/MUI/TypographyMUI";
import { keys } from "@config";

import { BarChart } from "@mui/x-charts";
import { CardsData, chartColumn, chartSetting } from "./data";

const columnsProPosals = [
  {
    field: "id",
    headerName: "No.",
    width: 90,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "name",
    headerName: "Name",
    width: 180,
    renderCell: (param) => (
      <TypographyMUI variant="body1">{param.row?.name}</TypographyMUI>
    ),
  },
  {
    field: "noOfProposals",
    headerName: "No. Of Proposals",
    width: 300,

    align: "center",
    headerAlign: "center",
    renderCell: (param) => param.row?.noOfProposals,
  },

  {
    field: "view",
    headerName: "View",

    align: "center",
    headerAlign: "center",
    renderCell: (param) => {
      const url = keys.rootserver;
      return (
        <a href={url + param?.row?.url}>
          <Button variant="contained" target="_blank" href={param.row?.url}>
            view
          </Button>
        </a>
      );
    },
  },
];

const columnsProjects = [
  {
    field: "id",
    headerName: "No.",
    width: 80,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "project",
    headerName: "Project",
    width: 420,

    renderCell: (params) => (
      <Tooltip
        sx={{ cursor: "pointer" }}
        arrow
        TransitionComponent={Zoom}
        placement="bottom-start"
        title={params.row.project}
      >
        <Typography variant="body2" paddingRight={3} noWrap fontWeight={500}>
          {params.row.project}
        </Typography>
      </Tooltip>
    ),
  },
  {
    field: "date",
    headerName: "Date",
    width: 200,

    renderCell: (params) => (
      <Tooltip
        sx={{ cursor: "pointer" }}
        arrow
        TransitionComponent={Zoom}
        placement="bottom-start"
        title={params.row.date}
      >
        <Typography variant="body2" paddingRight={3} noWrap fontWeight={500}>
          {params.row.date}
        </Typography>
      </Tooltip>
    ),
  },
  {
    field: "milestones",
    headerName: "Milestones",
    width: 160,

    renderCell: (params) => (
      <Tooltip
        sx={{ cursor: "pointer" }}
        arrow
        TransitionComponent={Zoom}
        placement="bottom-start"
        title={params.row.milestones}
      >
        <Typography variant="body2" paddingRight={3} noWrap fontWeight={500}>
          {params.row.milestones}
        </Typography>
      </Tooltip>
    ),
  },
  {
    field: "progress",
    headerName: "Progress",
    width: 350,

    renderCell: (params) => (
      <Box sx={{ width: "100%" }}>
        {params.row.progress ? (
          <LinearProgressWithLabel value={params.row.progress} />
        ) : (
          <LinearProgressWithLabel value={0} />
        )}
      </Box>
    ),
  },
  {
    field: "view",
    headerName: "View",

    align: "center",
    headerAlign: "center",
    renderCell: (param) => {
      const url = keys.rootserver;
      return (
        <a href={url + param?.row?.url}>
          <Button variant="contained" target="_blank" href={param.row?.url}>
            view
          </Button>
        </a>
      );
    },
  },
];

const dataProposals = [
  {
    id: 1,
    name: "Project A",
    noOfProposals: "15 Proposals",
    url: "/project-a-proposals", // Replace with actual URL
  },
  {
    id: 2,
    name: "Project B",
    noOfProposals: "22 Proposals",
    url: "/project-b-proposals",
  },
  {
    id: 3,
    name: "Project C",
    noOfProposals: "8 Proposals",
    url: "/project-c-proposals",
  },
  {
    id: 4,
    name: "Project D",
    noOfProposals: "35 Proposals",
    url: "/project-d-proposals",
  },
];
const dataProjects = [
  {
    id: 1,
    project: "Project Alpha",
    date: "2023-11-15",
    milestones: "2",
    progress: 60,
    duration: 3,
  },
  {
    id: 2,
    project: "Project Beta",
    date: "2024-02-08",
    milestones: "5",
    progress: 85,
    duration: 2,
  },
  {
    id: 3,
    project: "Project Gamma",
    date: "2023-09-22",
    milestones: "4",
    progress: 30,
    duration: 4,
  },
  {
    id: 4,
    project: "Project Delta",
    date: "2024-05-12",
    milestones: "12",
    progress: 95,
    duration: 1,
  },
];

function Overview({ milestoneDetails, milestoneData, milestoneFilesData }) {
  const valueFormatter = (value) => `${value}`;

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
      <Grid item xs={4.9}>
        <Card elevation={4} sx={{ pt: 2 }}>
          <IconsHeadings
            paddingLeft={2}
            paddingTop={1}
            paddingBottom={2}
            text={"PROPOSALS"}
          />
          <DataGrids dataRow={dataProposals} dataColumn={columnsProPosals} />
        </Card>
      </Grid>
      <Grid item xs={6.95}>
        <Card elevation={4} sx={{ pt: 2 }}>
          <IconsHeadings
            paddingLeft={2}
            paddingTop={1}
            paddingBottom={2}
            text={"PROJECTS"}
          />

          <BarChart
            dataset={chartColumn}
            xAxis={[
              {
                scaleType: "band",
                dataKey: "month",
                barGapRatio: 0,
                categoryGapRatio: 0.7,
                zoom: true,
              },
            ]}
            borderRadius={2}
            series={[
              {
                dataKey: "projects",
                valueFormatter,
              },
            ]}
            {...chartSetting}
          />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card elevation={4} sx={{ pt: 2 }}>
          <IconsHeadings
            paddingLeft={2}
            paddingTop={1}
            paddingBottom={2}
            text={"ACTIVE PROJECTS"}
          />
          <DataGrids dataRow={dataProjects} dataColumn={columnsProjects} />
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

import {
  Button,
  Card,
  Chip,
  Fade,
  Grid,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import DataGrids from "../../../../TableMui/DataGrids";
import { useNavigate } from "react-router-dom";
import { customTheme } from "@theme/theme";
import IconsHeadings from "../../../../AnimationMui/IconHeadings";
import { Star, TaskAltSharp } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function CompletedProjects({ dataProject }) {
  const navigate = useNavigate();
  const filterData = dataProject.filter((e) => e?.completed === true);
  const [ProjectData, setProjectData] = useState(filterData);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "ProjectNames",
      headerName: "Project Names",
      width: 450,

      renderCell: (params) => (
        <Tooltip
          sx={{ cursor: "pointer" }}
          title={params.row.ProjectNames}
          placement="bottom-start"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 400 }}
        >
          <Typography paddingRight={3} noWrap variant="body1">
            {params.row.ProjectNames}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "fundingAgency",
      headerName: "Funding Agency",
      width: 300,

      renderCell: (params) => (
        <Tooltip
          sx={{ cursor: "pointer" }}
          title={params.row.fundingAgency}
          placement="bottom-start"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 400 }}
        >
          <Typography paddingRight={3} noWrap variant="body1">
            {params.row.fundingAgency}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "industry",
      headerName: "Industry Collaborator",
      width: 300,

      renderCell: (params) => (
        <Tooltip
          sx={{ cursor: "pointer" }}
          title={params.row.industry}
          placement="bottom-start"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 400 }}
        >
          <Typography paddingRight={3} noWrap variant="body1">
            {params.row.industry}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "Initiator",
      headerName: "Initiator",
      width: 200,
    },
    {
      field: "Category",
      headerName: "Category",
      width: 150,
    },
    {
      field: "StartDate",
      headerName: "Start Date",
      width: 150,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "EndDate",
      headerName: "End Date",
      width: 150,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "ProjectStatus",
      headerName: "Project Status",
      width: 200,
      align: "center",
      headerAlign: "center",

      renderCell: (param) => (
        <Chip color="success" clickable label={param.row.ProjectStatus} />
      ),
    },
    {
      field: "feedbackResearcher",
      headerName: "Feedback From Researcher",
      width: 300,

      renderCell: (params) => (
        <Stack direction="row" alignItems={"center"} gap={1}>
          <Rating
            name="text-feedback"
            value={4.3}
            readOnly
            precision={0.1}
            emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          <Typography letterSpacing={1} variant={"caption"}>
            (4.2)
          </Typography>
        </Stack>
      ),
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Proposals",
      headerName: "No. of Proposals",
      width: 150,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "approveByFundingAgency",
      headerName: "Approved By Funding Agency",
      width: 300,
      align: "center",
      headerAlign: "center",

      renderCell: (param) => (
        <Chip
          color="success"
          clickable
          label={param.row.approveByFundingAgency}
        />
      ),
    },
    {
      field: "approvelDoc",
      headerName: "Approval Document By Funding Agency",
      width: 300,
      align: "center",
      headerAlign: "center",

      renderCell: (param) => (
        <a target="_blank" href={param.row.approvelDoc}>
          <Button
            component={motion.div}
            whileTap={{ scale: 0.9 }}
            variant="contained"
            href={param.row.approvelDoc}
            color="primary"
            onClick={() => console.log(param.row.approvelDoc)}
          >
            View
          </Button>
        </a>
      ),
    },
    {
      field: "ViewProposals",
      headerName: "View Proposal",
      width: 150,
      align: "center",
      headerAlign: "center",

      renderCell: (params) => (
        <>
          <Button
            component={motion.div}
            whileTap={{ scale: 0.9 }}
            onClick={() =>
              navigate(`/directportal/dashboard/proposallist/${params?.value}`)
            }
            variant="contained"
            color="primary"
          >
            View
          </Button>
        </>
      ),
    },
    {
      field: "noMilestones",
      headerName: "No. of Milestones",
      width: 150,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "mileStones",
      headerName: "Milestones Details",
      width: 150,
      align: "center",
      headerAlign: "center",

      renderCell: (param) => (
        <Button
          component={motion.div}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/directportal/dashboard/projectmanagement/")}
          variant="contained"
          color="primary"
        >
          View
        </Button>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      ProjectNames:
        "Virtual reality training simulator for critical multi-operator vehicle (Indigenous Development of Virtual Reality Simulator Tank VT4)",
      Category: "AI",
      industry: "M/S Octathorn",
      Initiator: "Admin",
      StartDate: "June 16, 2024",
      EndDate: "December 26, 2024",
      Proposals: "1",
      ProposalsHighRating: "1/1",
      fundingAgency: "Defence",
      approveByFundingAgency: "success",
      feedbackResearcher: "",
      ViewProposals: `6611ee19968981b60ebfd4e7`,
      noMilestones: "13",
      ProjectStatus: "Completed",
      budget: "/pdf/approval of project by funding agency.pdf",
      milestones: "8",
      approvelDoc: "/pdf/approval of project by funding agency.pdf",
    },
  ];
  useEffect(() => {
    const filterData = dataProject.filter((e) => e?.completed === true);
    setProjectData(filterData);
  }, [dataProject]);
  return (
    <Grid container>
      <Grid item xs={12}>
        <Card
          sx={{
            boxShadow: customTheme.palette.boxShadows.boxShadowTable,
          }}
        >
          <IconsHeadings
            text={"Complted Projects"}
            paddingLeft={2.7}
            paddingTop={3}
            paddingBottom={2}
            icons={<TaskAltSharp sx={{ color: "bg.darkBlue" }} />}
          />
          <DataGrids dataRow={ProjectData} toolBarGrid dataColumn={columns} />
        </Card>
      </Grid>
    </Grid>
  );
}

export default CompletedProjects;

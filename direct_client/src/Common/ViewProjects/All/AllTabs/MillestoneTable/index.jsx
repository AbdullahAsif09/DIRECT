import { Button, Card, Fade, Grid, Tooltip, Typography } from "@mui/material";
import DataGrids from "../../../../TableMui/DataGrids";
import { useNavigate } from "react-router-dom";
import { customTheme } from "@theme/theme";
import IconsHeadings from "../../../../AnimationMui/IconHeadings";
import { Route, Star } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function MilestoneTable({ dataProject }) {
  const navigate = useNavigate();
  const filterData = dataProject.filter((e) => e?.milestones.length > 0);
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
      field: "title",
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
            {params?.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "fundingAgency",
      headerName: "Funding Agency / USER",
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
            {params.row?.usrBy}
          </Typography>
        </Tooltip>
      ),
    },
    // {
    //   field: "industry",
    //   headerName: "Industry/Researcher",
    //   width: 300,

    //   renderCell: (params) => (
    //     <Tooltip
    //       sx={{ cursor: "pointer" }}
    //       title={params.row.industry}
    //       placement="bottom-start"
    //       TransitionComponent={Fade}
    //       TransitionProps={{ timeout: 400 }}
    //     >
    //       <Typography paddingRight={3} noWrap variant="body1">
    //         {params.row.industry}
    //       </Typography>
    //     </Tooltip>
    //   ),
    // },
    {
      field: "Initiator",
      headerName: "Initiator",
      width: 200,
    },
    {
      field: "applicationField",
      headerName: "Category",
      width: 200,
    },
    // {
    //   field: "StartDate",
    //   headerName: "Start Date of Project",
    //   width: 250,
    //   align: "center",
    //   headerAlign: "center",
    //   renderCell: (params) => (
    //     <Tooltip
    //       sx={{ cursor: "pointer" }}
    //       title={params.row?.milestones?.startDate}
    //       placement="bottom-start"
    //       TransitionComponent={Fade}
    //       TransitionProps={{ timeout: 400 }}
    //     >
    //       {params.row?.milestones?.startDate && (
    //         <Typography paddingRight={3} noWrap variant="body1">
    //           {params.row?.milestones?.startDate}
    //         </Typography>
    //       )}
    //     </Tooltip>
    //   ),
    // },
    // {
    //   field: "EndDate",
    //   headerName: "End Date of Project",
    //   width: 250,
    //   align: "center",
    //   headerAlign: "center",
    //   renderCell: (params) => (
    //     <Tooltip
    //       sx={{ cursor: "pointer" }}
    //       title={params.row?.milestones?.endDate}
    //       placement="bottom-start"
    //       TransitionComponent={Fade}
    //       TransitionProps={{ timeout: 400 }}
    //     >
    //       {params.row?.milestones?.endDate && (
    //         <Typography paddingRight={3} noWrap variant="body1">
    //           {params.row?.milestones?.endDate}
    //         </Typography>
    //       )}
    //     </Tooltip>
    //   ),
    // },
    // {
    //   field: "approveByFundingAgency",
    //   headerName: "Approved By Funding Agency",
    //   width: 300,
    //   align: "center",
    //   headerAlign: "center",

    //   renderCell: (param) => (
    //     <Chip
    //       color="success"
    //       clickable
    //       label={param.row.approveByFundingAgency}
    //     />
    //   ),
    // },
    // {
    //   field: "approvelDoc",
    //   headerName: "Approval Document By Funding Agency",
    //   width: 300,
    //   align: "center",
    //   headerAlign: "center",

    //   renderCell: (param) => (
    //     <a target="_blank" href={param.row.approvelDoc}>
    //       <Button
    //         component={motion.div}
    //         whileTap={{ scale: 0.9 }}
    //         variant="contained"
    //         href={param.row.approvelDoc}
    //         color="primary"
    //         onClick={() => console.log(param.row.approvelDoc)}
    //       >
    //         View
    //       </Button>
    //     </a>
    //   ),
    // },
    // {
    //   field: "ViewProposals",
    //   headerName: "View Proposal",
    //   width: 150,
    //   align: "center",
    //   headerAlign: "center",

    //   renderCell: (params) => (
    //     <Button
    //       component={motion.div}
    //       whileTap={{ scale: 0.9 }}
    //       onClick={() =>
    //         navigate(`/directportal/dashboard/proposallist/${params?.value}`)
    //       }
    //       variant="contained"
    //       color="primary"
    //     >
    //       View
    //     </Button>
    //   ),
    //   align: "center",
    // },
    // {
    //   field: "noMilestones",
    //   headerName: "No. of Milestones",
    //   width: 150,

    //   align: "center",
    //   headerAlign: "center",
    // },
    {
      field: "mileStones",
      headerName: "View Details",
      width: 150,
      align: "center",
      headerAlign: "center",

      renderCell: (param) => (
        <Button
          component={motion.div}
          whileTap={{ scale: 0.9 }}
          onClick={() =>
            navigate(
              "/directportal/dashboard/milestoneslist/" + "" + param.row?._id
            )
          }
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
      industry: "Dr Shahzad Rasool",
      Initiator: "Admin",
      StartDate: "June 30, 2022",
      EndDate: "September 23, 2023",
      Proposals: "1",
      ProposalsHighRating: "1/1",
      approveByFundingAgency: "success",
      approvelDoc: "/pdf/ContractVirtual.pdf",
      ViewProposals: `6611ee19968981b60ebfd4e7`,
      ProjectStatus: "ongoing",
      noMilestones: "13",
      fundingAgency: "RDE MoDP",
      budget: "/pdf/approval of project by funding agency.pdf",
      milestones: "8",
      feedbackResearcher: "",
    },
  ];
  useEffect(() => {
    const filterData = dataProject.filter((e) => e?.milestones.length > 0);
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
            text={"Milestones"}
            paddingLeft={2.7}
            paddingTop={3}
            paddingBottom={2}
            icons={<Route sx={{ color: "bg.darkBlue" }} />}
          />
          <DataGrids dataRow={ProjectData} toolBarGrid dataColumn={columns} />
        </Card>
      </Grid>
    </Grid>
  );
}

export default MilestoneTable;

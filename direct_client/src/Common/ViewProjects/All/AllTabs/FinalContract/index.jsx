import { Button, Card, Fade, Grid, Tooltip, Typography } from "@mui/material";
import GavelIcon from "@mui/icons-material/Gavel";
import DataGrids from "../../../../TableMui/DataGrids";
import { useNavigate } from "react-router-dom";
import { customTheme } from "@theme/theme";
import IconsHeadings from "../../../../AnimationMui/IconHeadings";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
function FinalContract({ dataProject }) {
  const filterData = dataProject.filter(
    (e) => e?.finalProposalsChosenByAgency?.length > 0
  );
  const [ProjectData, setProjectData] = useState(filterData);
  const navigate = useNavigate();
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
          title={params.row?.title}
          placement="bottom-start"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 400 }}
        >
          <>
            <Typography paddingRight={3} noWrap variant="body1">
              {params.row?.title}
            </Typography>
          </>
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
          title={
            params.row?.fundingAgency
              ? params.row?.fundingAgency
              : params.row?.usrBy
          }
          placement="bottom-start"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 400 }}
        >
          <Typography paddingRight={3} noWrap variant="body1">
            {params.row?.fundingAgency
              ? params.row?.fundingAgency
              : params.row?.usrBy}
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
      field: "applicationField",
      headerName: "Category",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "Start Date of Project",
      width: 250,

      align: "center",
      headerAlign: "center",
    },

    {
      field: "proposalsAmount",
      headerName: "No. of Proposals",
      width: 150,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "ViewProposals",
      headerName: "View Details",
      width: 150,
      align: "center",
      headerAlign: "center",

      renderCell: (params) => (
        <Button
          component={motion.div}
          whileTap={{ scale: 0.9 }}
          onClick={() =>
            navigate(`/directportal/dashboard/proposallist/${params?.row?._id}`)
          }
          variant="contained"
          color="primary"
        >
          View
        </Button>
      ),
    },
  ];
  useEffect(() => {
    const filterData = dataProject.filter(
      (e) => e?.finalProposalsChosenByAgency?.length > 0
    );
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
            text={"Final Contract"}
            paddingLeft={2.7}
            paddingTop={3}
            paddingBottom={2}
            icons={<GavelIcon sx={{ color: "bg.darkBlue" }} />}
          />
          <DataGrids dataRow={ProjectData} toolBarGrid dataColumn={columns} />
        </Card>
      </Grid>
    </Grid>
  );
}

export default FinalContract;

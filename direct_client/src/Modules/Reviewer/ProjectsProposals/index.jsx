import {
  Button,
  Card,
  Chip,
  Fade,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import IconsHeadings from "@common/AnimationMui/IconHeadings";
import DataGrids from "@common/TableMui/DataGrids";
import { customTheme } from "@theme/theme";
import { useLocation, useNavigate } from "react-router-dom";
import { List } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import TypographyMUI from "@common/MUI/TypographyMUI";
import { useAxios, useGetRole } from "@hooks";
function PropjectsProposals() {
  const location = useLocation();
  const role = useGetRole();
  const profile = useSelector((state) => state.profile.profile);
  let profileID;
  if (role === "industry" || role === "academia") {
    profileID = profile?.[role]?._id;
  } else {
    profileID = profile?._id;
  }
  const { loading, data } = useAxios("reviewer/findAllProposals", "POST", {
    id: profileID,
  });
  const navigate = useNavigate();
  const columns = [
    {
      field: "id",
      headerName: "No",
      width: 90,
    },
    {
      field: "submittedBy",
      headerName: "Proposal Submitted By",
      width: 450,

      renderCell: (params) => (
        <Tooltip
          sx={{ cursor: "pointer" }}
          title={`${params.row?.submittedBy}`}
          placement="bottom-start"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 400 }}
        >
          <>
            <Typography paddingRight={3} noWrap variant="body2">
              {params.row.submittedBy?.id?.name
                ? params.row.submittedBy?.id?.name
                : "Abdullah Asif"}
            </Typography>
          </>
        </Tooltip>
      ),
    },
    {
      field: "ProjectNames",
      headerName: "Project Name",
      width: 450,

      renderCell: (params) => (
        <Tooltip
          sx={{ cursor: "pointer" }}
          title={`${params.row.ProjectNames}`}
          placement="bottom-start"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 400 }}
        >
          <>
            <Typography paddingRight={3} noWrap variant="body2">
              {params.row.ProjectNames}
            </Typography>
          </>
        </Tooltip>
      ),
    },

    {
      field: "submissionDate",
      headerName: "Submission End Date",
      width: 250,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <TypographyMUI variant={"body2"}>
            {console.log(params.row, "params.row?.submissionDate")}
            {new Date(params.row?.submissionDate).toDateString()}
          </TypographyMUI>
        );
      },
    },
    {
      field: "ProjectStatus",
      headerName: "Project Status",
      width: 200,
      align: "center",
      headerAlign: "center",

      renderCell: (param) =>
        param.row?.reviewByReviewer === true ? (
          <Chip color="success" clickable label={"Review Submitted"} />
        ) : (
          <Chip color="error" clickable label={"Review not Submitted"} />
        ),
    },
    {
      field: "ViewProposals",
      headerName: "View Proposals",
      width: 150,
      align: "center",
      headerAlign: "center",

      renderCell: (param) => {
        let userType = location.pathname.split("/")[1];
        if (userType === "directportal") {
          userType = "directPortal/dashboard";
        }
        if (role === "industry") {
          userType = "industry";
        }
        if (role === "academia") {
          userType = "academia";
        }
        return (
          <Button
            component={motion.div}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(`proposallists/${param.row?.projectId}`)}
            variant="contained"
            color="primary"
          >
            View
          </Button>
        );
      },
    },
  ];

  const ProposalsData =
    data?.result?.map((item, index) => {
      const myInfo = item?.assignedTo?.filter(
        (e) => e?.reviewerID?.id == profileID
      );
      return {
        _id: item._id,
        id: index + 1,
        projectId: item?.projectID?._id,
        submittedBy: item?.submittedBy,
        reviewByReviewer: item?.reviewByReviewer,
        ProjectNames: item?.projectID?.title,
        submissionDate: new Date(myInfo?.[0]?.submissionDate).toDateString(),
      };
    }) ?? [];
  return (
    <Grid container sx={{ mt: 6, mb: 4 }} gap={4}>
      <Grid item xs={12}>
        <IconsHeadings
          variantHeadings={"h2"}
          text={"Projects"}
          icons={<List sx={{ color: customTheme.palette.bg.darkBlue }} />}
        />
      </Grid>
      <Grid item xs={12}>
        <Card
          sx={{
            p: 2,
            boxShadow: customTheme.palette.boxShadows.boxShadowTable,
          }}
        >
          {ProposalsData.length > 0 ? (
            <DataGrids
              loading={loading}
              dataRow={ProposalsData}
              dataColumn={columns}
            />
          ) : (
            <Typography variant="h6">No Proposals Found</Typography>
          )}
        </Card>
      </Grid>
    </Grid>
  );
}

export default PropjectsProposals;

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
import { useNavigate } from "react-router-dom";
import { List } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { setLoading } from "@store/Features/loadingSlice";
import TypographyMUI from "@common/MUI/TypographyMUI";
import { useAxios } from "@hooks";
function PropjectsProposals() {
  const { API } = useAxios();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const [ProposalsData, setProposalsData] = useState([]);

  const fetchcall = useCallback(async () => {
    const data = API({
      url: `proposal/findAllProposalsForReviewer`,
      method: "POST",
      object: {
        reviewerId: profile?._id,
      },
    });
    if (data?.result) {
      if (data?.result?.length > 0) {
        const newValues = data.result.map((item, index) => {
          return {
            _id: item._id,
            id: index + 1,
            projectId: item?.projectID?._id,
            submittedBy: item?.submittedBy,
            reviewByReviewer: item?.reviewByReviewer,
            ProjectNames: item?.projectID?.title,
            submissionDate: item?.submissionDate,
          };
        });
        return newValues;
      }
    }
    return [];
  }, [profile]);
  const fetchData = async () => {
    dispatch(setLoading(true));
    try {
      const data = await fetchcall();
      setProposalsData(data);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
    }
  };
  const fetchDataInInterval = async () => {
    try {
      const data = await fetchcall();
      setProposalsData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchDataInInterval, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const navigate = useNavigate();
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      align: "center",
      headerAlign: "center",
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
              {params.row.submittedBy?.id?.companyName}
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
        const date = new Date(params.row?.submissionDate);
        const formattedDate = date.toLocaleDateString();
        return <TypographyMUI variant={"body2"}>{formattedDate}</TypographyMUI>;
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

      renderCell: (param) => (
        <Button
          component={motion.div}
          whileTap={{ scale: 0.9 }}
          onClick={() =>
            navigate(`/academia/proposallists/${param.row?.projectId}`)
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
      ProjectNames: "Throwable Ball Camera",
      Category: "Army",
      Initiator: "Admin",
      EndDate: "11th November 2024",
      ProjectStatus: "Review not Submitted",
      Proposals: "1",
      ViewProposals: "",
      fundingAgency: "Army",
    },
  ];
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
            <DataGrids dataRow={ProposalsData} dataColumn={columns} />
          ) : (
            <Typography variant="h6">No Proposals Found</Typography>
          )}
        </Card>
      </Grid>
    </Grid>
  );
}

export default PropjectsProposals;

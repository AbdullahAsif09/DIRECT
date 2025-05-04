import { Box, Chip } from "@mui/material";
import ButtonMui from "../../../MUI/ButtonMUI";
import { useUtils } from "../utils";
import { keys } from "@config";
import { useNavigate } from "react-router-dom";
import TypographyMUI from "@common/MUI/TypographyMUI";

export const useTableColumns = () => {
  const { redirectUrl } = useUtils();
  const navigate = useNavigate();

  const columns = [
    {
      field: "projectID",
      headerName: "Name",
      width: 420,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {params.value?.title}
        </Box>
      ),
    },
    {
      field: "awardedDocs",
      headerName: "Awarded Document",
      width: 220,
      renderCell: (params) => {
        if (params.row?.awardedDocs) {
          const url = keys.rootserver;
          return (
            <a href={url + params.row?.awardedDocs?.url}>
              <ButtonMui
                variant={"contained"}
                sx={{ display: "flex", alignItems: "center" }}
              >
                View Document
              </ButtonMui>
            </a>
          );
        } else {
          return (
            <TypographyMUI variant={"body1"}>
              Proposal not accepted
            </TypographyMUI>
          );
        }
      },
    },
    {
      field: "contractedDocs",
      headerName: "Contracted Document",
      width: 220,
      renderCell: (params) => {
        if (params.row?.contractedDocs) {
          const url = keys.rootserver;
          return (
            <a href={url + params.row?.contractedDocs?.url}>
              <ButtonMui
                variant={"contained"}
                sx={{ display: "flex", alignItems: "center" }}
              >
                View Document
              </ButtonMui>
            </a>
          );
        } else {
          return (
            <TypographyMUI variant={"body1"}>
              Proposal not accepted
            </TypographyMUI>
          );
        }
      },
    },
    {
      field: "Resubmit Proposal",
      headerName: "View Milestones",
      width: 200,
      headerAlign: "left",
      renderCell: (params) => (
        <ButtonMui
          onClick={() => {
            if (redirectUrl) {
              navigate(
                `/user/${redirectUrl}/project-detail/${params?.row?.projectID?._id}?milestones=${params?.row?.milestones?._id}`
              );
            }
          }}
        >
          View
        </ButtonMui>
      ),
    },
  ];
  return { columns };
};

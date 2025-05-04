import { Button } from "@mui/material";
import TypographyMUI from "@common/MUI/TypographyMUI";
import { useNavigate } from "react-router-dom";
import { keys } from "@config";
function data({ ParamsId }) {
  const navigate = useNavigate();
  const columns = [
    {
      field: "id",
      headerName: "No.",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "submittedBy",
      headerName: "Industry / Researcher",
      width: 300,
      renderCell: (params) => (
        <TypographyMUI variant={"body1"}>
          {params.row?.submittedBy?.id?.name}
        </TypographyMUI>
      ),
    },
    {
      field: "createdAt",
      headerName: "Start Date",
      width: 250,
      renderCell: (params) => {
        const date = new Date(params?.row?.createdAt);
        return (
          <TypographyMUI variant={"body1"}>{date.toDateString()}</TypographyMUI>
        );
      },
    },
    {
      field: "date",
      headerName: "End Date",
      width: 250,
      renderCell: (params) => {
        const date = new Date(params?.row?.createdAt);
        return (
          <TypographyMUI variant={"body1"}>{date.toDateString()}</TypographyMUI>
        );
      },
    },
    {
      field: "awardedDocs",
      headerName: "Awareded Document",
      width: 200,
      renderCell: (param) => (
        <>
          {param?.value ? (
            <a target="_blank" href={`${keys.rootserver}/${param.value?.url}`}>
              <Button
                whileTap={{ scale: 0.9 }}
                variant="contained"
                href={`${keys.rootserver}${param.value?.url}`}
                color="primary"
              >
                View
              </Button>
            </a>
          ) : (
            <TypographyMUI>No Document Found</TypographyMUI>
          )}
        </>
      ),
      align: "center",
      headerAlign: "center",
    },
    {
      field: "contractedDocs",
      headerName: "Contracted Document",
      width: 200,
      renderCell: (param) => (
        <>
          {param?.value ? (
            <a target="_blank" href={`${keys.rootserver}/${param.value?.url}`}>
              <Button
                whileTap={{ scale: 0.9 }}
                variant="contained"
                href={`${keys.rootserver}${param.value?.url}`}
                color="primary"
              >
                View
              </Button>
            </a>
          ) : (
            <TypographyMUI>No Document Found</TypographyMUI>
          )}
        </>
      ),
      align: "center",
      headerAlign: "center",
    },
    {
      field: "viewBtn",
      headerName: "View Milestones",
      width: 250,

      renderCell: (params) => (
        <Button
          onClick={() =>
            navigate(
              `/department/dashboard/projectmangent/${params?.row?.projectID}/${params?.row?.milestones?._id}`
            )
          }
          variant="contained"
        >
          View
        </Button>
      ),
      align: "center",
      headerAlign: "center",
    },
  ];

  return columns;
}

export default data;

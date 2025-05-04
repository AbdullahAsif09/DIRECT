import { Card } from "@mui/material";
import IconsHeadings from "@common/AnimationMui/IconHeadings";
import { AttachFile, Download } from "@mui/icons-material";
import DataGrids from "@common/TableMui/DataGrids";
import { customTheme } from "@theme/theme";
import TypographyMUI from "@common/MUI/TypographyMUI";
import ButtonMui from "@common/MUI/ButtonMUI";
import { keys } from "@config";

function AttachmentsMilestones({ milestoneFilesData }) {
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
            <ButtonMui
              variant="contained"
              target="_blank"
              href={param.row?.url}
              startIcon={<Download />}
            >
              Download
            </ButtonMui>
          </a>
        );
      },
    },
  ];
  return (
    <Card sx={{ boxShadow: customTheme.palette.boxShadows.boxShadowTable }}>
      <IconsHeadings
        text="Attachments"
        icons={<AttachFile sx={{ color: "bg.darkBlue" }} />}
        paddingBottom={2}
        paddingTop={3}
        paddingLeft={4}
      />
      <DataGrids dataRow={milestoneFilesData} dataColumn={columnsFiles} />
    </Card>
  );
}

export default AttachmentsMilestones;

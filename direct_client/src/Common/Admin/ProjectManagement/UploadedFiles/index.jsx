import {
  Card,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { AttachFile, Download, FilterList, Search } from "@mui/icons-material";
import DataGrids from "@common/TableMui/DataGrids";
import IconsHeadings from "@common/AnimationMui/IconHeadings";
import TypographyMUI from "@common/MUI/TypographyMUI";
import { keys } from "@config";
import ButtonMui from "@common/MUI/ButtonMUI";

function UploadedFiles({ milestoneFilesData }) {
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
    <Grid container gap={3}>
      <Grid item xs={12}>
        <Stack
          direction="row"
          gap={2}
          justifyContent="flex-end"
          alignItems="center"
        >
          <TextField
            type="text"
            placeholder="Search..."
            InputProps={{
              endAdornment: (
                <InputAdornment sx={{ cursor: "pointer" }} position="end">
                  <IconButton sx={{ color: "bg.darkBlue" }}>
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <IconButton sx={{ color: "bg.darkBlue" }}>
            <FilterList />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Card elevation={4}>
          <IconsHeadings
            text="Attachments"
            icons={<AttachFile sx={{ color: "bg.darkBlue" }} />}
            paddingBottom={2}
            paddingTop={3}
            paddingLeft={4}
          />
          <DataGrids dataRow={milestoneFilesData} dataColumn={columnsFiles} />
        </Card>
      </Grid>
    </Grid>
  );
}

export default UploadedFiles;

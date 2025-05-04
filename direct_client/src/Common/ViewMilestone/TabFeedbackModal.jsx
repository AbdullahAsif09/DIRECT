import { Button, Card, Grid, Stack } from "@mui/material";
import { customTheme } from "@theme/theme";
import IconsHeadings from "../AnimationMui/IconHeadings";
import { AttachFile, Description, Download } from "@mui/icons-material";
import DataGrids from "../TableMui/DataGrids";
import TypographyMUI from "../MUI/TypographyMUI";
import { keys } from "@config";
import { useEffect, useState } from "react";

function TabFeedbackModal({ dataCard }) {
  const [FilesData, setFilesData] = useState([]);
  const arrayData = [
    {
      title: "Duration",
      name: dataCard?.duration
        ? dataCard?.duration + " " + dataCard?.duration > 1
          ? dataCard?.duration + " " + "Month"
          : dataCard?.duration + " " + "Months"
        : "N/A",
    },
    {
      title: "Payment",
      name: dataCard?.cost ? dataCard?.cost + " " + "Rs" : "N/A",
    },
    {
      title: "Progress",
      name: dataCard?.progress ? dataCard?.progress + " " + "%" : "N/A",
    },
  ];
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
            <Button
              variant="contained"
              target="_blank"
              href={param.row?.url}
              startIcon={<Download />}
            >
              Download
            </Button>
          </a>
        );
      },
    },
  ];
  const restructureData = () => {
    if (dataCard?.files) {
      const files = dataCard?.files?.map((e, i) => {
        return { ...e, id: i + 1 };
      });
      setFilesData(files);
    }
  };
  useEffect(() => {
    restructureData();
  }, [dataCard?.files]);
  return (
    <Grid container gap={2}>
      <Grid item xs={12} display={"flex"} gap={1}>
        {arrayData.map((e, i) => (
          <Stack
            sx={{
              backgroundColor: "lightGrey",
              p: 1,
              pl: 2,
              pr: 2,
              borderBottom: `3px solid white`,
              borderRadius: "7px",
              transition: "all .3s ease-in-out",

              "&:hover": {
                transform: `translateY(-3px)`,
                borderBottom: `3px solid #252B42`,
              },
            }}
            direction={"row"}
            key={i}
            columnGap={1}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <TypographyMUI variant="h5" fontWeight={500}>
              {e.title} :
            </TypographyMUI>
            <TypographyMUI variant="h5">{e.name}</TypographyMUI>
          </Stack>
        ))}
      </Grid>
      <Grid item xs={12}>
        <Card
          sx={{
            p: 2,
            m: 0.5,
            boxShadow: customTheme.palette.boxShadows.boxShadowTable,
          }}
        >
          <Stack direction={"column"} gap={2}>
            <IconsHeadings
              text={"Description"}
              icons={<Description sx={{ color: "#252B42" }} />}
            />
            <TypographyMUI textAlign={"justify"} variant="body1">
              {dataCard?.description}
            </TypographyMUI>
          </Stack>
        </Card>
      </Grid>

      {/* <Grid item xs={12}>
        <Card
          sx={{
            p: 2,
             m: 0.5,
            boxShadow: customTheme.palette.boxShadows.boxShadowTable,
          }}
        >
          <IconsHeadings
            text="Tasks"
            icons={<Task sx={{ color: "bg.darkBlue" }} />}
            paddingBottom={2}
          />
          {dataCard?.Subtasks?.map((e, i) => (
            <TimelineMui timelineData={e} key={i} />
          ))}
        </Card>
      </Grid> */}
      {FilesData?.length > 0 && (
        <Grid item xs={12}>
          <Card
            sx={{
              p: 2,
              m: 0.5,
              boxShadow: customTheme.palette.boxShadows.boxShadowTable,
            }}
          >
            <IconsHeadings
              text="Attachments"
              icons={<AttachFile sx={{ color: "bg.darkBlue" }} />}
              paddingBottom={2}
            />
            <DataGrids dataRow={FilesData} dataColumn={columnsFiles} />
          </Card>
        </Grid>
      )}
    </Grid>
  );
}

export default TabFeedbackModal;

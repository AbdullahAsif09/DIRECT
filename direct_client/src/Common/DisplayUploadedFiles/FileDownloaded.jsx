import { Button, Card, Grid, Stack, Typography } from "@mui/material";
import { CloudDownload } from "@mui/icons-material";
import { useWindowSize } from "@hooks";
function FileDownloaded({ realData }) {
  const handleDownload = (file) => {
    const blob = new Blob([file.content], { type: file.type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.fileName || "download";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };
  const windowSize = useWindowSize();
  return (
    <Grid container justifyContent={"space-between"} gap={1}>
      <Grid item xs={12}>
        <Card elevation={0} sx={{ border: "1px solid lightgray", p: 2, mt: 3 }}>
          <Stack
            direction={windowSize < 600 ? "column" : "row"}
            justifyContent={"space-between"}
            alignItems={windowSize < 600 ? "flex-start" : "center"}
            gap={2}
          >
            <Stack sx={{ width: "100%" }} direction={"row"} gap={1}>
              <img src={"/assets/icons/icon-other.svg"} />
              <Stack
                sx={{ width: "100%" }}
                direction={"row"}
                alignItems={"center"}
                justifyContent={
                  windowSize < 600 ? "space-between" : "flex-start"
                }
                gap={2}
              >
                <Typography variant="h4">
                  {realData.name
                    ? realData.name
                    : realData.fileName
                    ? realData.fileName
                    : "NOFile"}
                </Typography>
                <Typography variant="body1" color={"GrayText"}>
                  1234 KBs
                </Typography>
              </Stack>
            </Stack>
            <a href={realData.content} target="_blank">
              <Button
                variant="contained"
                target="_blank"
                href={realData.content}
                component="label"
                download={true}
                sx={{
                  backgroundColor: "#5758BB",
                  "&:hover": {
                    backgroundColor: "#5758BB",
                  },
                }}
                startIcon={<CloudDownload />}
                // onClick={() => handleDownload(realData)}
              >
                Download
              </Button>
            </a>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}

export default FileDownloaded;

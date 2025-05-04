import { CloudUpload, Download } from "@mui/icons-material";
import MainHeadings from "@common/AnimationMui/MainHeadings";
import { Grid, styled, Card, Stack, Typography, Button } from "@mui/material";
import TypographyMUI from "@common/MUI/TypographyMUI";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { keys } from "@config";
import { useDispatch } from "react-redux";
import { setAlert } from "@store/Features/AlertSlice";
import { useAxios } from "@hooks";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
function UploadDocument({
  proposalID,
  pastDocument,
  urlAwarded,
  urlContracted,
}) {
  const dispatch = useDispatch();
  const { API } = useAxios();
  const { id: projectID } = useParams();
  const [DocumentUpload, setDocumentUpload] = useState(null);
  const [prevDocumentUploaded, setPrevDocumentUploaded] =
    useState(pastDocument);
  const UploadNewFile = async () => {
    let url;
    if (urlAwarded) {
      url = "uploadAwardedContract";
    }
    if (urlContracted) {
      url = "uploadFinalContract";
    }
    if (!DocumentUpload || !proposalID) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append("document", DocumentUpload);
      formData.append("proposalID", proposalID);
      const response = await API({
        url: `proposal/${url}?projectID=${projectID}`,
        method: "patch",
        object: formData,
      });
      if (response.message == "success") {
        setPrevDocumentUploaded(DocumentUpload);
        setDocumentUpload(null);
        dispatch(
          setAlert({ text: "Document has been Uploaded", status: "success" })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Grid container gap={5}>
      <Grid item xs={12}>
        <MainHeadings text={"Upload Document"} variant={"h2"} />
      </Grid>
      <Grid
        item
        xs={12}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        gap={2}
      >
        <TypographyMUI variant={"body1"}>{DocumentUpload?.name}</TypographyMUI>
        <Stack direction={"row"} gap={2}>
          <Button
            variant="contained"
            size="medium"
            component="label"
            sx={{
              backgroundColor: "#5758BB",
              "&:hover": {
                backgroundColor: "#5758BB",
              },
            }}
          >
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => setDocumentUpload(e.target.files[0])}
            />
            Choose a Docuemnt
          </Button>
          {DocumentUpload && (
            <Button
              variant="contained"
              size="medium"
              component="label"
              startIcon={<CloudUpload />}
              onClick={UploadNewFile}
            >
              Upload Docuemnt
            </Button>
          )}
        </Stack>
      </Grid>
      {prevDocumentUploaded && (
        <Grid item xs={12}>
          <TypographyMUI variant={"h4"}>
            Download Previous Uploaded Document
          </TypographyMUI>
          <Card
            elevation={0}
            sx={{ border: "1px solid lightgray", p: 2, mt: 3 }}
          >
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Stack direction={"row"} gap={2}>
                <img src={"/assets/icons/icon-other.svg"} />
                <Stack direction={"column"} justifyContent={"space-evenly"}>
                  {prevDocumentUploaded?.name ? (
                    <Typography variant={"h6"}>
                      {prevDocumentUploaded?.name}
                    </Typography>
                  ) : null}
                  {/* <Typography variant={"h6"}>
                    ({prevDocumentUploaded?.size})
                  </Typography> */}
                </Stack>
              </Stack>
              <Button
                variant="contained"
                size="medium"
                component="label"
                sx={{
                  backgroundColor: "#5758BB",
                  "&:hover": {
                    backgroundColor: "#5758BB",
                  },
                }}
                startIcon={<Download />}
                href={
                  prevDocumentUploaded?.url
                    ? keys.rootserver + prevDocumentUploaded?.url
                    : prevDocumentUploaded instanceof Blob ||
                      prevDocumentUploaded instanceof File
                    ? URL.createObjectURL(prevDocumentUploaded)
                    : "#"
                }
                download={prevDocumentUploaded.name}
              >
                Download
              </Button>
            </Stack>
          </Card>
        </Grid>
      )}
    </Grid>
  );
}

export default UploadDocument;

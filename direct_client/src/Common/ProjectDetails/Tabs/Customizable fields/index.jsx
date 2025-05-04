import React from "react";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import styled from "@emotion/styled";
import FileDetails from "./FileDetails";
import TypographyMUI from "../../../MUI/TypographyMUI";

const Hr = styled("hr")({
  backgroundColor: "#E3E3E3",
  height: 1,
  border: "none",
});

const CustomizableFields = ({ projectData }) => {
  return (
    <>
      {projectData?.uploadFile.length < 1 ? (
        <Box
          sx={{
            margin: "auto",
            paddingBlock: "50px",
            paddingInline: "20px",
          }}
        >
          <TypographyMUI variant={"h3"} sx={{ color: "grey" }}>
            No files Found
          </TypographyMUI>
        </Box>
      ) : (
        <Grid container gap={0} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <Box
              sx={{
                margin: "auto",
                paddingBlock: "50px",
                paddingInline: "20px",
              }}
            >
              <Hr />
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                paddingInline={"20px"}
                paddingBlock={"10px"}
              >
                <TypographyMUI variant="h6">Options</TypographyMUI>
              </Box>
              <Hr />
              {projectData?.uploadFile.length > 0 &&
                projectData?.uploadFile?.map((file, index) => (
                  <div key={index}>
                    <FileDetails fileData={file} />
                    <Hr />
                  </div>
                ))}
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default CustomizableFields;

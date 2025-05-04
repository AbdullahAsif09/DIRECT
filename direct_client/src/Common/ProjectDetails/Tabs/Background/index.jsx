import React from "react";
import BoxSectionPara from "../BoxData/BoxSectionPara";
import { Grid } from "@mui/material";
import useCheckHTMLBody from "@hooks/useCheckHTMLBody";
import TypographyMUI from "@common/MUI/TypographyMUI";

const Background = ({ projectData }) => {
  const referencesCheck = useCheckHTMLBody(projectData?.references);
  const descriptionCheck = useCheckHTMLBody(projectData?.description);
  const methodologyCheck = useCheckHTMLBody(projectData?.methodology);
  return (
    <Grid container sx={{ pb: 2 }}>
      {!referencesCheck && !methodologyCheck && !descriptionCheck ? (
        <Grid item xs={12} sx={{ pt: 4 }}>
          <TypographyMUI variant={"h2"} color={"grey"}>
            No Data Found!
          </TypographyMUI>
        </Grid>
      ) : (
        <>
          {descriptionCheck && (
            <Grid item xs={12}>
              <BoxSectionPara
                title={"Description"} 
                content={projectData?.description}
              />
            </Grid>
          )} 
          {methodologyCheck && (
            <Grid item xs={12}>
              <BoxSectionPara
                title={"Methodology"}
                content={projectData?.methodology}
              />
            </Grid>
          )}
          {referencesCheck && (
            <Grid item xs={12}>
              <BoxSectionPara
                title={"References"}
                content={projectData?.references}
              />
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};

export default Background;
 
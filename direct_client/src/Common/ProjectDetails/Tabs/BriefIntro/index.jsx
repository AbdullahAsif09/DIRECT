import { Box } from "@mui/system";
import React from "react";
import { Grid } from "@mui/material";
import BoxSectionPara from "../BoxData/BoxSectionPara";
import OneLineBox from "../BoxData/OneLineBox";
import TypographyMUI from "@common/MUI/TypographyMUI";
import useCheckHTMLBody from "@hooks/useCheckHTMLBody";

function BriefIntro({ projectData, profile }) {
  const objectivesCheck = useCheckHTMLBody(projectData?.objectives);
  const deliverablesCheck = useCheckHTMLBody(projectData?.deliverables);
  return (
    <Box sx={{ padding: "35px 0px" }}>
      <Box style={{ paddingBlock: 16 }}>
        <Grid
          container
          alignItems="center"
          mt={-5}
          justifyContent={"space-between"}
        >
          {!projectData?.fundingAgency?.length > 0 &&
          !projectData?.userAgency?.length > 0 &&
          !projectData?.usrBy?.length > 0 &&
          !projectData?.organization &&
          !projectData?.department &&
          !projectData?.fundingScheme &&
          !projectData?.applicationField &&
          !projectData?.researchSubDomain &&
          !objectivesCheck &&
          !deliverablesCheck ? (
            <Grid item xs={12} sx={{ pt: 4 }}>
              <TypographyMUI variant={"h2"} color={"grey"}>
                No Data Found!
              </TypographyMUI>
            </Grid>
          ) : (
            <>
              {projectData?.fundingAgency?.length > 0 && (
                <Grid item xs={12} sm={5.9}>
                  <OneLineBox
                    title={"Funding Agency"}
                    content={projectData?.fundingAgency?.[0]?.name}
                  />
                </Grid>
              )}
              {projectData?.userAgency?.length > 0 && (
                <Grid item xs={12} sm={5.9}>
                  <OneLineBox
                    title={"User Agency"}
                    content={projectData?.userAgency?.[0]?.name}
                  />
                </Grid>
              )}

              {projectData?.usrBy?.length > 0 && (
                <Grid item xs={12} sm={5.9}>
                  <OneLineBox
                    title={"User Who Submitted the Project"}
                    content={projectData?.usrBy?.[0]?.account?.name}
                  />
                </Grid>
              )}
              {projectData?.organization && profile?.role?.[0] === "super" && (
                <Grid item xs={12} sm={5.9}>
                  <OneLineBox
                    title={"Organization"}
                    content={projectData?.organization?.name}
                  />
                </Grid>
              )}
              {projectData?.department && profile?.role?.[0] === "super" && (
                <Grid item xs={12} sm={5.9}>
                  <OneLineBox
                    title={"Department"}
                    content={projectData?.department?.name}
                  />
                </Grid>
              )}
              {projectData?.fundingScheme && (
                <Grid item xs={12} sm={5.9}>
                  <OneLineBox
                    title={"Funding Scheme"}
                    content={projectData?.fundingScheme}
                  />
                </Grid>
              )}
              {projectData?.applicationField && (
                <Grid item xs={12} sm={5.9}>
                  <OneLineBox
                    title={"Application Field"}
                    content={projectData?.applicationField}
                  />
                </Grid>
              )}
              {projectData?.researchSubDomain && (
                <Grid item xs={12}>
                  <OneLineBox
                    title={"Research Sub-Domain"}
                    content={projectData?.researchSubDomain}
                  />
                </Grid>
              )}
              {objectivesCheck && (
                <Grid item xs={12}>
                  <BoxSectionPara
                    title={"Objectives"}
                    content={projectData?.objectives}
                  />
                </Grid>
              )}
              {deliverablesCheck && (
                <Grid item xs={12}>
                  <BoxSectionPara
                    title={"Deliverables"}
                    content={projectData?.deliverables}
                  />
                </Grid>
              )}
            </>
          )}
        </Grid>
      </Box>
    </Box>
  );
}

export default BriefIntro;

import React, { useState } from "react";
import BoxSectionPara from "../BoxData/BoxSectionPara";
import { Grid } from "@mui/material";
import TypographyMUI from "@common/MUI/TypographyMUI";
import useCheckHTMLBody from "@hooks/useCheckHTMLBody";

const TechInfo = ({ projectData }) => {
  const physicalAspectCheck = useCheckHTMLBody(projectData?.physicalAspect);
  const performanceAspectCheck = useCheckHTMLBody(
    projectData?.performanceAspect
  );
  const compatibilityAspectCheck = useCheckHTMLBody(
    projectData?.compatibilityAspect
  );
  const enviromentalAspectCheck = useCheckHTMLBody(
    projectData?.enviromentalAspect
  );
  const specOfProductCheck = useCheckHTMLBody(projectData?.specOfProduct);
  const logisticAspectCheck = useCheckHTMLBody(projectData?.logisticAspect);
  const fireHazardCheck = useCheckHTMLBody(projectData?.fireHazard);
  return (
    <div>
      <Grid container sx={{ pb: 2 }}>
        {!physicalAspectCheck &&
        !performanceAspectCheck &&
        !compatibilityAspectCheck &&
        !enviromentalAspectCheck &&
        !specOfProductCheck &&
        !logisticAspectCheck &&
        !fireHazardCheck ? (
          <Grid item xs={12} sx={{ pt: 4 }}>
            <TypographyMUI variant={"h2"} color={"grey"}>
              No Data Found!
            </TypographyMUI>
          </Grid>
        ) : (
          <>
            {physicalAspectCheck && (
              <Grid item xs={12}>
                <BoxSectionPara
                  title={"Physical Specification"}
                  content={projectData?.physicalAspect}
                />
              </Grid>
            )}
            {performanceAspectCheck && (
              <Grid item xs={12}>
                <BoxSectionPara
                  title={"Tech/Performance Aspect"}
                  content={projectData?.performanceAspect}
                />
              </Grid>
            )}
            {compatibilityAspectCheck && (
              <Grid item xs={12}>
                <BoxSectionPara
                  title={"Compatibility Aspect"}
                  content={projectData?.compatibilityAspect}
                />
              </Grid>
            )}
            {enviromentalAspectCheck && (
              <Grid item xs={12}>
                <BoxSectionPara
                  title={"Enviromental Aspect"}
                  content={projectData?.enviromentalAspect}
                />
              </Grid>
            )}
            {specOfProductCheck && (
              <Grid item xs={12}>
                <BoxSectionPara
                  title={"Spec Of Product Conditions"}
                  content={projectData?.specOfProduct}
                />
              </Grid>
            )}
            {logisticAspectCheck && (
              <Grid item xs={12}>
                <BoxSectionPara
                  title={"Logistics Aspect"}
                  content={projectData?.logisticAspect}
                />
              </Grid>
            )}
            {fireHazardCheck && (
              <Grid item xs={12}>
                <BoxSectionPara
                  title={"Fire Hazard Oblige System Safety"}
                  content={projectData?.fireHazard}
                />
              </Grid>
            )}
          </>
        )}
      </Grid>
    </div>
  );
};

export default TechInfo;

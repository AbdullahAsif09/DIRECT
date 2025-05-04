import { Stack } from "@mui/material";
import DescriptionBox from "./DescriptionBox";

function ProjectDetails({ ProjectData }) {
  return (
    <Stack direction={"column"} rowGap={4}>
      <DescriptionBox
        heading={"Description"}
        content={ProjectData?.description}
      />
      <DescriptionBox
        heading={"Methodology"}
        content={ProjectData?.methodology}
      />
      <DescriptionBox
        heading={"References"}
        content={ProjectData?.references}
      />
      <DescriptionBox
        heading={"Objectives"}
        content={ProjectData?.objectives}
      />
      <DescriptionBox
        heading={"Delieverables"}
        content={ProjectData?.deliverables}
      />
      <DescriptionBox
        heading={"Physical Aspect"}
        content={ProjectData?.physicalAspect}
      />
      <DescriptionBox
        heading={"Performance Aspect"}
        content={ProjectData?.performanceAspect}
      />
      <DescriptionBox
        heading={"Compatibility Aspect"}
        content={ProjectData?.compatibilityAspect}
      />
      <DescriptionBox
        heading={"Enviromental Aspect"}
        content={ProjectData?.enviromentalAspect}
      />
      <DescriptionBox
        heading={"Specs Of Product"}
        content={ProjectData?.specOfProduct}
      />
      <DescriptionBox
        heading={"Logistic Aspect"}
        content={ProjectData?.logisticAspect}
      />
      <DescriptionBox
        heading={"Fire Hazard"}
        content={ProjectData?.fireHazard}
      />
    </Stack>
  );
}

export default ProjectDetails;

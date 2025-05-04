import { Grid } from "@mui/material";
import { useContext } from "react";
import TypographyGrow from "../../../../AnimationMui/TypographyGrow";
import CardsOfCreateProjects from "../../../../Admin/CardsOfCreateProjects";
import {
  Air,
  DesignServices,
  DeveloperBoard,
  DeviceHub,
  EmojiTransportation,
  FireHydrantAlt,
  Settings,
} from "@mui/icons-material";
import { customTheme } from "@theme/theme";
import Editor from "../../../../Editor";
import { CreateProjectContext } from "../../CreateContext";

function DesignCharactersitics() {
  const { setFieldValue, values } = useContext(CreateProjectContext);
  return (
    <Grid container justifyContent={"center"} alignItems={"center"} gap={3}>
      <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
        <TypographyGrow variant={"h1"} text={"Technical Information"} />
      </Grid>
      <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
        <CardsOfCreateProjects
          helpOutline={`This focuses on dimensional properties such as size, weight, and other measurable attributes`}
          rowGap={2}
          title={"Physical Specification"}
          icons={
            <DesignServices
              sx={{
                color: customTheme.palette.bg.darkBlue,
              }}
            />
          }
          content={
            <Editor
              name={`physicalAspect`}
              value={values?.physicalAspect}
              setFieldValue={setFieldValue}
            />
          }
        />
      </Grid>
      <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
        <CardsOfCreateProjects
          helpOutline={`Describe the technical specifications, capabilities, and expected performance of your proposed solution.`}
          title={"Tech/Performance Aspect"}
          rowGap={2}
          icons={
            <Settings
              sx={{
                color: customTheme.palette.bg.darkBlue,
              }}
            />
          }
          content={
            <Editor
              name={`performanceAspect`}
              value={values?.performanceAspect}
              setFieldValue={setFieldValue}
            />
          }
        />
      </Grid>
      <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
        <CardsOfCreateProjects
          helpOutline={`Emphasize the ability of the proposed technology to seamlessly integrate with the existing military equipment/ infrastructure`}
          title={"Compatibility Aspect"}
          rowGap={2}
          icons={
            <DeveloperBoard
              sx={{
                color: customTheme.palette.bg.darkBlue,
              }}
            />
          }
          content={
            <Editor
              name={`compatibilityAspect`}
              value={values?.compatibilityAspect}
              setFieldValue={setFieldValue}
            />
          }
        />
      </Grid>
      <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
        <CardsOfCreateProjects
          title={"Enviromental Aspect"}
          helpOutline={`Explain how your project will be developed and implemented with environmental sustainability in mind. (temperature, humidity, terrain, etc.)`}
          rowGap={2}
          icons={
            <Air
              sx={{
                color: customTheme.palette.bg.darkBlue,
              }}
            />
          }
          content={
            <Editor
              name={`enviromentalAspect`}
              value={values?.enviromentalAspect}
              setFieldValue={setFieldValue}
            />
          }
        />
      </Grid>
      <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
        <CardsOfCreateProjects
          title={"Spec Of Product Conditions"}
          helpOutline={`Specify the desired capabilities and metrics of the product under various conditions. (Durability, Reliability, Maintainability and Serviceability)`}
          icons={
            <DeviceHub
              sx={{
                color: customTheme.palette.bg.darkBlue,
              }}
            />
          }
          content={
            <Editor
              name={`specOfProduct`}
              value={values?.specOfProduct}
              setFieldValue={setFieldValue}
            />
          }
        />
      </Grid>
      <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
        <CardsOfCreateProjects
          title={"Logistics Aspect"}
          helpOutline={`Describe the logistical requirements for your proposed technology, including manufacturing, transportation, maintenance, and spare parts availability`}
          rowGap={2}
          icons={
            <EmojiTransportation
              sx={{
                color: customTheme.palette.bg.darkBlue,
              }}
            />
          }
          content={
            <Editor
              name={`logisticAspect`}
              value={values?.logisticAspect}
              setFieldValue={setFieldValue}
            />
          }
        />
      </Grid>
      <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
        <CardsOfCreateProjects
          rowGap={2}
          title={"Fire Hazard Oblige System Safety"}
          helpOutline={`Describe how your project considers and mitigates potential fire hazards to ensure system safety and personnel protection`}
          icons={
            <FireHydrantAlt
              sx={{
                color: customTheme.palette.bg.darkBlue,
              }}
            />
          }
          content={
            <Editor
              name={`fireHazard`}
              value={values?.fireHazard}
              setFieldValue={setFieldValue}
              />
            }
        />
      </Grid>
    </Grid>
  );
}

export default DesignCharactersitics;

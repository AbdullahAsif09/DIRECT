import { Grid, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AvatarStyled } from "../avatar";
import { useWindowSize } from "@hooks";

const HeadingText = styled("span")(() => ({
  color: "#212121",
  fontSize: "30px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "166.5%",
}));
const SubText = styled("span")(() => ({
  color: "#949494",
  fontFamily: "Poppins",
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: "300",
  lineHeight: "166.5%",
}));
const GridItemTwo = styled(Grid)(() => ({
  display: "flex",
  alignItems: "center",
}));

export function ProfileHeader({
  steps,
  activeStep,
  isStepOptional,
  isStepSkipped,
  setAvatarImg,
  AvatarImg,
}) {
  const width = useWindowSize();
  return (
    <Grid
      sx={{ paddingBlock: "30px", backgroundColor: "#F5F7F9" }}
      container
      rowGap={2}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid item xs={11}>
        <HeadingText>Account Details</HeadingText>
      </Grid>
      <GridItemTwo item xs={11} xl={4}>
        <SubText>Enter account details to complete profile</SubText>
      </GridItemTwo>
      <Grid item xs={11} xl={7}>
        <Stepper
          orientation={width < 900 ? "vertical" : "horizontal"}
          activeStep={activeStep}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          marginBottom: -8,
          display: "flex",
          justifyContent: width < 900 ? "center" : "flex-start",
          minHeight: 200,
        }}
      >
        <AvatarStyled src={AvatarImg} setSrc={setAvatarImg} />
      </Grid>
    </Grid>
  );
}

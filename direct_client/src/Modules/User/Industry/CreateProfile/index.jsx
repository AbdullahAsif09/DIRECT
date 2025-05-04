import { Grid } from "@mui/material";
import Details from "./Details";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ProfileHeader } from "@common/ProfileComponents";
import { keys } from "@config";

const steps = [
  "Basic Information",
  "Organization Details",
  "Validation & Confirmation",
];

function CreateProfile() {
  const profile = useSelector((state) => state.profile.profile);

  const image = profile?.industry?.image ?? null;

  const [AvatarImg, setAvatarImg] = useState(image);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => {
    // return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Grid
      container
      sx={{
        paddingInline: "20px",
        height: "100%",
        "@media (max-width: 600px)": {
          paddingInline: "5px",
        },
      }}
      justifyContent={"center"}
      alignItems={"center"}
      columnGap={2}
    >
      <ProfileHeader
        steps={steps}
        AvatarImg={AvatarImg}
        activeStep={activeStep}
        setAvatarImg={setAvatarImg}
        isStepOptional={isStepOptional}
        isStepSkipped={isStepSkipped}
      />
      <Grid sx={{ mt: 8 }} item xs={10.8} md={11.3} lg={11.9}>
        <Details
          handleReset={handleReset}
          activeStep={activeStep}
          handleNext={handleNext}
          image={AvatarImg}
        />
      </Grid>
    </Grid>
  );
}

export default CreateProfile;

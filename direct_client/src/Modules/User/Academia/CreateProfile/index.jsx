import { Grid } from "@mui/material";
import DetailsForm from "./DetailsForm";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ProfileHeader } from "@common/ProfileComponents";
const steps = [
  "Profile",
  "Projects",
  "Publications",
  "Intellectual Property",
  "Trainings",
  "Supervisions",
];

function CreateProfile() {
  const profile = useSelector((state) => state.profile.profile);

  const image = profile?.academia?.image ?? null;
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
    >
      <ProfileHeader
        steps={steps}
        AvatarImg={AvatarImg}
        activeStep={activeStep}
        setAvatarImg={setAvatarImg}
        isStepOptional={isStepOptional}
        isStepSkipped={isStepSkipped}
      />
      <Grid item xs={12}>
        <DetailsForm
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

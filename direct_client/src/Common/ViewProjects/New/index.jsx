import {
  Box,
  Button,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import { Formik } from "formik";
import { AdminCreateProjectValidation } from "@utils/FormValidation.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "@store/Features/AlertSlice.js";
import { LoadingButton } from "@mui/lab";
import { Save } from "@mui/icons-material";
import ProposalSubmission from "./Forms/ProposalSubmission.jsx";
import CustomFields from "./Forms/CustomFields.jsx";
import InitialForm from "./Forms/InitialForm.jsx";
import PrimaryForm from "./Forms/PrimaryForm.jsx";
import SecondaryForm from "./Forms/SecondaryForm.jsx";
import DesignCharactersitics from "./Forms/DesignCharactersitics/index.jsx";
import { CreateProjectContext } from "./CreateContext.jsx";
import { useAxios } from "@hooks";
import { Spinner } from "@common/UI";
import { handleImages } from "./function.js";

const steps = [
  "Brief Introduction",
  "Background",
  "Technical Information",
  "Customizable Fields",
  "Project Technical/ Financial Oblige Proposal Fields",
];
const GridButtonsSteps = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "1rem",
}));
function New({ setValue }) {
  const { API, loading: loadingAPI } = useAxios();
  const loading = useSelector((state) => state.loading.loading);
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = (e) => {
    e.preventDefault();
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = (e) => {
    e.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleCreate = async (values, { resetForm }) => {
    const data = await handleImages(values);

    let {
      image,
      testing,
      userAgency,
      uploadFiles,
      proposalfile,
      proposalText,
      fundingAgency,
      financialProposal,
      fieldsForProposalDocs,
      userProjectDetailsSubmittor,
      assignedTo,
      ...rest
    } = data;
    if (loading || loadingAPI) {
      return;
    }
    if (image.length > 0) {
      testing = JSON.stringify(testing);
      financialProposal = JSON.stringify(financialProposal);
      proposalText = JSON.stringify(proposalText);
      proposalfile = JSON.stringify(proposalfile);
      assignedTo = JSON.stringify(assignedTo?.map((user) => user?._id));

      const formData = new FormData();
      for (const key in rest) {
        formData.append(key, rest[key]);
      }
      if (userAgency?._id) {
        formData.append(`userAgency`, userAgency?._id);
      }
      if (fundingAgency?._id) {
        formData.append(`fundingAgency`, fundingAgency?._id);
      }
      if (userProjectDetailsSubmittor?._id) {
        formData.append(
          `userProjectDetailsSubmittor`,
          userProjectDetailsSubmittor?._id
        );
      }

      formData.append(`testing`, testing);
      formData.append(`proposalfile`, proposalfile);
      formData.append(`proposalText`, proposalText);
      formData.append(`financialProposal`, financialProposal);
      image.forEach((fileData, index) => {
        formData.append(`image`, fileData);
      });
      0;
      uploadFiles.forEach((fileData, index) => {
        formData.append(`document`, fileData);
      });
      try {
        const data = await API({
          url: `projects/addproject`,
          method: "post",
          object: formData,
        });
        if (data?.type === "success") {
          dispatch(
            setAlert({
              status: "success",
              text: "Project Created Successfully",
            })
          );
          resetForm();
        } else {
          dispatch(
            setAlert({
              status: "error",
              text: "Couldn't Creat Post",
            })
          );
        }
      } catch (error) {
        dispatch(setAlert({ status: "error", text: "Couldn't Creat Post" }));
        console.log(e.message);
        console.log(error, "error");
      }
    } else {
      dispatch(
        setAlert({
          status: "error",
          text: "Cover Image for project is required",
        })
      );
    }
  };

  return (
    <>
      <Spinner isLoading={loadingAPI} />
      <Formik
        initialValues={{
          title: "",
          image: [null],
          uploadFiles: [null],
          fundingScheme: "",
          userProjectDetailsSubmittor: null,
          assignedTo: [],
          fundingAgency: null,
          userAgency: null,
          applicationField: "",
          researchSubDomain: "",
          organization: "",
          department: "",
          objectives: "",
          deliverables: "",
          description: "",
          methodology: "",
          references: "",
          physicalAspect: "",
          performanceAspect: "",
          compatibilityAspect: "",
          enviromentalAspect: "",
          specOfProduct: "",
          logisticAspect: "",
          fireHazard: "",
          testing: [{ name: "" }],
          financialProposal: [{ name: "" }],
          proposalText: [
            { name: "Introduction" },
            { name: "Objectives" },
            { name: "Methodologies" },
            { name: "Testings" },
            { name: "Specifications" },
            { name: "Risk Analysis" },
            { name: "HR Requirements" },
            { name: "Insturmental Requirements" },
            { name: "Project Timelines" },
            { name: "Deliverables" },
            { name: "Financial Proposal" },
          ],
          proposalfile: [
            { name: "Budget" },
            { name: "Work Plans" },
            { name: "Timelines" },
            { name: "Gantt Chart" },
          ],
        }}
        validationSchema={AdminCreateProjectValidation}
        onSubmit={handleCreate}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => {
          const valueContext = {
            values: values,
            errors: errors,
            touched: touched,
            handleBlur: handleBlur,
            handleChange: handleChange,
            setFieldValue: setFieldValue,
          };

          return (
            <form onSubmit={handleSubmit}>
              <Grid container rowGap={7}>
                <Grid item xs={12}>
                  <Box sx={{ width: "100%", mt: 6 }}>
                    <Stepper
                      sx={{ cursor: "pointer" }}
                      activeStep={activeStep}
                      alternativeLabel
                    >
                      {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepOptional(index)) {
                          labelProps.optional = (
                            <Typography variant="caption"></Typography>
                          );
                        }
                        if (isStepSkipped(index)) {
                          stepProps.completed = false;
                        }
                        return (
                          <Step
                            sx={{ cursor: "pointer" }}
                            onClick={() => setActiveStep(index)}
                            key={label}
                            {...stepProps}
                          >
                            <StepLabel {...labelProps}>{label}</StepLabel>
                          </Step>
                        );
                      })}
                    </Stepper>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <CreateProjectContext.Provider value={valueContext}>
                    {activeStep === 0 && <InitialForm />}
                    {activeStep === 2 && <DesignCharactersitics />}
                    {activeStep === 1 && <PrimaryForm />}
                    {activeStep === 3 && <CustomFields />}
                    {activeStep === 4 && <ProposalSubmission />}
                    {activeStep === 5 && <SecondaryForm />}
                  </CreateProjectContext.Provider>
                </Grid>
                <GridButtonsSteps item xs={12}>
                  {loading === true ? (
                    <Button variant="contained" color="success" disabled={true}>
                      Back
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="success"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                  )}

                  {activeStep === steps.length - 1 ? (
                    loading === true ? (
                      <LoadingButton
                        loading
                        loadingPosition="start"
                        startIcon={<Save />}
                        variant="outlined"
                        type="button"
                      >
                        Finsih
                      </LoadingButton>
                    ) : (
                      <Button color="success" type="submit" variant="contained">
                        Finish
                      </Button>
                    )
                  ) : (
                    <Button
                      color="success"
                      type="button"
                      variant="contained"
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  )}
                </GridButtonsSteps>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </>
  );
}

export default New;

import { Button, Grid, styled } from "@mui/material";
import React from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@common/UI";
import { setAlert } from "@store/Features/AlertSlice";
import { IndustryCreateProfileValidation } from "../../../../../utils/FormValidation";
import StepThree from "./StepThree";
import { setProfile } from "@store/Features/ProfileSlice";
import { useAxios } from "@hooks";
import { useNavigate } from "react-router-dom";

const Container = styled("div")(() => ({
  height: "100%",
  width: "100%",
  paddingBlock: "40px",
}));
const GridItemThree = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "1rem",
}));
const CancelButton = styled(Button)(() => ({
  background: "transparent",
  border: "1px solid #8E0909",
  color: "#8E0909",
  width: "150px",
  "& .Mui-disabled": {
    border: "1px solid gray",
  },
  "&:hover": {
    border: "1px solid #8E0909",
  },
}));
const NextButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.bg.greenMui,
  color: "white",
  width: "150px",
  "&:hover": {
    backgroundColor: theme.palette.bg.greenMuiHover,
    color: "white",
    width: "150px",
  },
}));

function Details({ handleNext, handleReset, activeStep, image }) {
  const loginData = useSelector((state) => state.profile.profile);
  const dispatch = useDispatch();
  const { API, loading, data: apidata } = useAxios();
  const navigation = useNavigate();

  const handleCreate = async (values) => {
    if (loading) return;
    let dataToSend = {};

    /* remove empty fields */
    Object.keys(values).forEach((key) => {
      if (!values[key] || values[key] == "") delete values[key];
    });

    /* remove image is not File, or if image is path of image saved in backend */
    if (values.image) typeof values.image == "string" && delete values.image;

    /* check if field is primitive or non-primitive . if non-prmitive then stringify the field */
    Object.keys(values).forEach((key) => {
      dataToSend[key] =
        typeof values[key] === "object" && values[key] !== null
          ? JSON.stringify(values[key])
          : values[key];
    });

    try {
      dispatch(setAlert({ status: null, text: null }));
      const formdata = new FormData();
      for (const key in dataToSend) {
        formdata.append(key, dataToSend[key]);
      }
      if (!typeof image !== "string") formdata.append("image", image);
      const data = await API({
        url: "industry/createOrupdateprofile",
        object: formdata,
        method: "POST",
      });
      if (data?.result && data?.type === "success") {
        dispatch(
          setAlert({ status: "success", text: "profile updated Successfully" })
        );
        dispatch(setProfile({ ...loginData, industry: data?.result }));
        navigation("/user/industry");
        // resetForm();
      } else {
        dispatch(
          setAlert({ status: "error", text: "Couldn't update profile" })
        );
      }
    } catch (e) {
      dispatch(setAlert({ status: "error", text: "Couldn't update profile" }));
      console.log(e.message);
    }
  };

  const acccount = loginData?.account;
  const data = loginData?.industry;
  return (
    <Formik
      initialValues={{
        name: data?.name ?? "",
        addressOne: data?.addressOne ?? "",
        addressTwo: data?.addressTwo ?? "",
        registrationNo: data?.registrationNo ?? "",
        firmType: data?.firmType ?? "",
        // registrationDate: data?.registrationDate ?? new Date(),
        taxId: data?.taxId ?? "",
        nationalTax: data?.nationalTax ?? "",
        SalesTax: data?.SalesTax ?? "",
        industryType: data?.industryType ?? "",
        industrySpecialization: data?.industrySpecialization ?? "",
        email: acccount?.email,
        phone: acccount?.phone,
        description: data?.description ?? "",
        pasProjectDefence: data?.pasProjectDefence ?? "",
        blacklisted: data?.blacklisted ?? "",
        caseAgainstFirm: data?.caseAgainstFirm ?? "",
        deposit: data?.deposit ?? "",
        image: data?.image ?? null,
        categories: data?.categories ?? [],
        partnerFirm:
          data?.partnerFirm?.length > 0
            ? data.partnerFirm
            : [{ name: "", type: "" }],
        localBank:
          data?.localBank?.length > 0
            ? data?.localBank
            : [{ bank: "", branch: "", accountNo: "" }],
        foreignBank:
          data?.foreignBank?.length > 0
            ? data.foreignBank
            : [{ name: "", type: "", awardedBy: "" }],
        registerWithGov:
          data?.registerWithGov?.length > 0
            ? data.registerWithGov
            : [
                {
                  organization: "",
                  regNo: "",
                  dateOfReg: "",
                  dateOfValidity: "",
                  category: "",
                },
              ],
        pastContract:
          data?.pastContract?.length > 0
            ? data.pastContract
            : [
                {
                  contract: "",
                  organization: "",
                  contractValue: "",
                  completed: "",
                },
              ],
      }}
      validationSchema={IndustryCreateProfileValidation}
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
        return (
          <form onSubmit={handleSubmit}>
            <Container>
              <Grid
                container
                rowGap={4}
                columnGap={6}
                justifyContent={"center"}
                alignItems={"flex-start"}
              >
                <Spinner isLoading={loading} />

                <Grid item xs={12}>
                  {activeStep === 0 && (
                    <StepOne
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                    />
                  )}
                  {activeStep === 1 && (
                    <StepTwo
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                    />
                  )}
                  {activeStep === 2 && (
                    <StepThree
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                    />
                  )}
                </Grid>
                <GridItemThree item xs={12}>
                  <CancelButton
                    variant="outlined"
                    disabled={activeStep === 0}
                    onClick={handleReset}
                  >
                    Back
                  </CancelButton>
                  {activeStep === 2 ? (
                    <>
                      <NextButton
                        name="submitButton"
                        type="submit"
                        color="success"
                        onClick={() => {
                          handleCreate(values);
                        }}
                      >
                        Finish
                      </NextButton>
                    </>
                  ) : (
                    <NextButton
                      type="button"
                      color="success"
                      onClick={handleNext}
                    >
                      Next
                    </NextButton>
                  )}
                </GridItemThree>
              </Grid>
            </Container>
          </form>
        );
      }}
    </Formik>
  );
}

export default Details;

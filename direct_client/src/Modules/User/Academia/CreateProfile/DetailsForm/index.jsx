import { Button, Fade, Grid, styled } from "@mui/material";
import React, { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo ";
import DialogMui from "@common/DialogMui/DialogMui";
import { Formik } from "formik";
import { formAcademiaSchema } from "@utils/FormValidation";
import "swiper/css";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import StepSix from "./StepSix";
import { setAlert } from "@store/Features/AlertSlice";
import { useDispatch, useSelector } from "react-redux";
import { TransitionGroup } from "react-transition-group";
import { useAxios } from "@hooks";
import { setProfile } from "@store/Features/ProfileSlice";
import { useNavigate } from "react-router-dom";

const Container = styled("div")(({ theme }) => ({
  height: "100%",
  width: "100%",
  paddingBlock: "40px",
  marginTop: "100px",
}));
const GridItemThree = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "1rem",
}));
const CancelButton = styled(Button)(({ theme }) => ({
  border: "1px solid #8E0909",
  background: "transparent",
  color: "#8E0909",
  width: "150px",
}));
const NextButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.bg.greenDark,
  color: "white",
  width: "150px",
  "&:hover": {
    backgroundColor: theme.palette.bg.greenDark,
    color: "white",
    width: "150px",
  },
}));

function SectionTwo({ handleNext, handleReset, activeStep, image }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { API, loading } = useAxios();
  const loginData = useSelector((state) => state.profile.profile);
  const [DialogState, setDialogState] = useState(false);
  const ProfileData = loginData?.academia;

  const handleClose = () => {
    setDialogState(false);
  };

  const handleCreate = async (values) => {
    if (loading) return;
    let dataToSend = {};
    try {
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

      dispatch(setAlert({ status: null, text: null }));
      const formdata = new FormData();
      for (const key in dataToSend) {
        formdata.append(key, dataToSend[key]);
      }
      if (image) formdata.append("image", image);
      const data = await API({
        url: "academia/createOrupdateprofile",
        object: formdata,
        method: "post",
      });

      if (data?.type == "success") {
        dispatch(
          setAlert({ status: "success", text: "profile updated Successfully" })
        );

        dispatch(setProfile({ ...loginData, academia: data?.result }));
        navigate("/user/academia");
      } else {
        dispatch(
          setAlert({ status: "error", text: "Couldn't update profile" })
        );
      }
    } catch (e) {
      dispatch(setAlert({ status: "error", text: "Couldn't update profile" }));
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={{
        name: loginData?.account?.name,
        lastName: loginData?.lastName,
        designation: ProfileData?.designation ? ProfileData.designation : "",
        currentUniversity: ProfileData?.currentUniversity
          ? ProfileData.currentUniversity
          : "",
        image: ProfileData?.image ?? "",
        categories: ProfileData?.categories ?? [],

        department: ProfileData?.department ? ProfileData.department : "",
        email: loginData?.account?.email,
        phone: loginData?.account?.phone,
        telephone: ProfileData?.telephone ? ProfileData.telephone : "",
        description: ProfileData?.description ? ProfileData.description : "",

        qualificationSection:
          ProfileData?.qualificationSection?.length > 0
            ? ProfileData?.qualificationSection
            : [{ degree: "", university: "", start: "", end: "" }],
        experienceSection:
          ProfileData?.experienceSection?.length > 0
            ? ProfileData?.experienceSection
            : [{ post: "", university: "", start: "", end: "" }],
        awardsSection:
          ProfileData?.awardsSection?.length > 0
            ? ProfileData?.awardsSection
            : [{ title: "", year: "", awardedBy: "" }],
        scopusSection:
          ProfileData?.scopusSection?.length > 0
            ? ProfileData?.scopusSection
            : [{ scopus: "", WoS: "", profileScopus: "", scienceScopus: "" }],
        socialMediaSection:
          ProfileData?.socialMediaSection?.length > 0
            ? ProfileData?.socialMediaSection
            : [{ scopus: "", WoS: "", profileScopus: "", scienceScopus: "" }],
        membershipSection:
          ProfileData?.membershipSection?.length > 0
            ? ProfileData?.membershipSection
            : [{ title: "", name: "", start: "", end: "" }],
        researchProjectsSection:
          ProfileData?.researchProjectsSection?.length > 0
            ? ProfileData?.researchProjectsSection
            : [
                {
                  type: "",
                  sponcer: "",
                  title: "",
                  status: "",
                  cost: "",
                  startDate: "",
                  endDate: "",
                },
              ],
        industrialProjectsSection:
          ProfileData?.industrialProjectsSection?.length > 0
            ? ProfileData?.industrialProjectsSection
            : [
                {
                  type: "",
                  sponcer: "",
                  title: "",
                  status: "",
                  cost: "",
                  startDate: "",
                  endDate: "",
                },
              ],
        researchArticlesSection:
          ProfileData?.researchArticlesSection?.length > 0
            ? ProfileData?.researchArticlesSection
            : [
                {
                  title: "",
                  name: "",
                  journal: "",
                  issue: "",
                  impact: "",
                  citations: "",
                  quartiesOne: "",
                  quartiesTwo: "",
                },
              ],
        conferenceSection:
          ProfileData?.conferenceSection?.length > 0
            ? ProfileData?.conferenceSection
            : [
                {
                  title: "",
                  name: "",
                  citations: "",
                  conferenceTitle: "",
                },
              ],
        bookChapSection:
          ProfileData?.bookChapSection?.length > 0
            ? ProfileData?.bookChapSection
            : [
                {
                  title: "",
                  name: "",
                  publisher: "",
                  author: "",
                  publishedPages: "",
                },
              ],
        bookSection:
          ProfileData?.bookSection?.length > 0
            ? ProfileData?.bookSection
            : [
                {
                  title: "",
                  citation: "",
                  publisher: "",
                  author: "",
                  publishedPages: "",
                },
              ],
        editorialSection:
          ProfileData?.editorialSection?.length > 0
            ? ProfileData?.editorialSection
            : [
                {
                  name: "",
                  IF: "",
                  typePaper: "",
                  datePaper: "",
                  publicationDate: "",
                },
              ],
        patentsSection:
          ProfileData?.patentsSection?.length > 0
            ? ProfileData?.patentsSection
            : [
                {
                  name: "",
                  inventorName: "",
                  status: "",
                  approvalDate: "",
                  type: "",
                  inventor: "",
                },
              ],
        copyRightsSection:
          ProfileData?.copyRightsSection?.length > 0
            ? ProfileData?.copyRightsSection
            : [
                {
                  title: "",
                  inventorName: "",
                  nameOfUni: "",
                  patentName: "",
                  status: "",
                  approvalDate: "",
                },
              ],
        industrialDesignsSection:
          ProfileData?.industrialDesignsSection?.length > 0
            ? ProfileData?.industrialDesignsSection
            : [
                {
                  title: "",
                  inventorName: "",
                  inventorSchool: "",
                  status: "",
                  approvalDate: "",
                },
              ],
        technologyTransferedSection:
          ProfileData?.technologyTransferedSection?.length > 0
            ? ProfileData?.technologyTransferedSection
            : [
                {
                  title: "",
                  techName: "",
                  iprs: "",
                  pl: "",
                  licensedDate: "",
                  piSchool: "",
                  sector: "",
                },
              ],
        attendedSection:
          ProfileData?.attendedSection?.length > 0
            ? ProfileData?.attendedSection
            : [
                {
                  title: "",
                  organizedBy: "",
                  startDate: "",
                  endDate: "",
                },
              ],
        organizedSection:
          ProfileData?.organizedSection?.length > 0
            ? ProfileData?.organizedSection
            : [
                {
                  title: "",
                  organizedBy: "",
                  startDate: "",
                  endDate: "",
                },
              ],
        phdSection:
          ProfileData?.phdSection?.length > 0
            ? ProfileData?.phdSection
            : [
                {
                  title: "",
                  college: "",
                  name: "",
                  field: "",
                },
              ],
        mastersSection:
          ProfileData?.mastersSection?.length > 0
            ? ProfileData?.mastersSection
            : [
                {
                  title: "",
                  college: "",
                  name: "",
                  field: "",
                },
              ],
      }}
      validationSchema={formAcademiaSchema}
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
                <Grid item xl={12}>
                  {activeStep === 0 && (
                    <TransitionGroup>
                      <Fade timeout={1000}>
                        <div>
                          <StepOne
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                      </Fade>
                    </TransitionGroup>
                  )}
                  {activeStep === 1 && (
                    <TransitionGroup>
                      <Fade timeout={1000}>
                        <div>
                          <StepTwo
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                      </Fade>
                    </TransitionGroup>
                  )}
                  {activeStep === 2 && (
                    <TransitionGroup>
                      <Fade timeout={1000}>
                        <div>
                          <StepThree
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                      </Fade>
                    </TransitionGroup>
                  )}
                  {activeStep === 3 && (
                    <TransitionGroup>
                      <Fade timeout={1000}>
                        <div>
                          <StepFour
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                      </Fade>
                    </TransitionGroup>
                  )}
                  {activeStep === 4 && (
                    <TransitionGroup>
                      <Fade timeout={1000}>
                        <div>
                          <StepFive
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                      </Fade>
                    </TransitionGroup>
                  )}
                  {activeStep === 5 && (
                    <TransitionGroup>
                      <Fade timeout={1000}>
                        <div>
                          <StepSix
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                      </Fade>
                    </TransitionGroup>
                  )}
                </Grid>
                <GridItemThree item xs={12}>
                  <CancelButton
                    onClick={() => {
                      handleReset();
                    }}
                  >
                    Back
                  </CancelButton>
                  <NextButton
                    name="submitButton"
                    type="submit"
                    // onClick={handleClickOpen}
                  >
                    Finish
                  </NextButton>
                  {activeStep === 5 ? (
                    <>
                      <NextButton
                        name="submitButton"
                        type="submit"
                        // onClick={handleClickOpen}
                      >
                        Finish
                      </NextButton>
                      <DialogMui
                        title={"Congratulations"}
                        BodyText={
                          "Congratulations! Your profile is now complete. Thank you for providing all the necessary information. You're all set to enjoy the full benefits of our platform"
                        }
                        handleClose={handleClose}
                        open={DialogState}
                      />
                    </>
                  ) : (
                    <NextButton
                      name="next"
                      type="button"
                      onClick={() => {
                        handleNext();
                      }}
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

export default SectionTwo;

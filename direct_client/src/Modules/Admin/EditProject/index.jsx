import { Grid } from "@mui/material";
import MainHeadings from "@common/AnimationMui/MainHeadings";
import BreifIntro from "@common/Admin/Forms/BreifIntro";
import Description from "@common/Admin/Forms/Description";
import TechnicalInformation from "@common/Admin/Forms/TechnicalInformation";
import { Formik } from "formik";
import { AdminCreateProjectValidation } from "../../../utils/FormValidation";
import { PublishContext } from "../PublishReq/PublishContext";
import ButtonMui from "@common/MUI/ButtonMUI";
import CustomizableFields from "@common/Admin/Forms/CustomizableFields";
import ProposalSubmission from "@common/Admin/Forms/ProposalSubmission";
import { useDispatch } from "react-redux";
import { setLoading } from "@store/Features/loadingSlice";
import { setAlert } from "@store/Features/AlertSlice";
import { useAxios } from "@hooks";
import { Spinner } from "@common/UI/Spinner";
import { handleImages } from "./function";
function EditProject({ ProjectDetails, inTabs }) {
  console.log(ProjectDetails, "projectDetails");
  const { API, loading } = useAxios();
  const dispatch = useDispatch();
  const handleCreate = async (values) => {
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
    testing = JSON.stringify(testing);
    financialProposal = JSON.stringify(financialProposal);
    proposalText = JSON.stringify(proposalText);
    proposalfile = JSON.stringify(proposalfile);
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
    if (assignedTo?.[0]?._id) {
      formData.append(`assignedTo`, assignedTo?.[0]?._id);
    }
    if (userProjectDetailsSubmittor?._id) {
      formData.append(
        `userProjectDetailsSubmittor`,
        userProjectDetailsSubmittor?._id
      );
    }

    formData.append(`reqId`, ProjectDetails?.id);
    formData.append(`testing`, testing);
    formData.append(`inDraft`, true);
    if (ProjectDetails?.usrBy?.[0]?._id) {
      formData.append(`usrBy`, ProjectDetails?.usrBy?.[0]?._id);
    } else {
      formData.append(`userAgency`, ProjectDetails?.fundingAgency?.[0]?._id);
      formData.append(`fundingAgency`, ProjectDetails?.userAgency?.[0]?._id);
    }
    formData.append(`proposalfile`, proposalfile);
    formData.append(`proposalText`, proposalText);
    formData.append(`financialProposal`, financialProposal);
    const FilterNamesFiles = uploadFiles.map((fileData, index) => {
      return { name: fileData.name };
    });
    formData.append(`uploadFilesAll`, JSON.stringify(FilterNamesFiles));
    image.forEach((fileData, index) => {
      formData.append(`image`, fileData);
    });
    const filteredUploadFiles = uploadFiles.filter(
      (fileData, index) => index !== 0
    );
    filteredUploadFiles.forEach((fileData, index) => {
      formData.append(`document`, fileData);
    });

    try {
      // dispatch(setLoading(true));
      const data = await API({
        url: `projects/updateproject?id=${ProjectDetails?._id}&reqId=${ProjectDetails?.id}`,
        method: "patch",
        object: formData,
      });
      console.log(data, "Data");
      if (data?.type === "success") {
        dispatch(
          setAlert({
            status: "success",
            text: "Project is updated",
          })
        );
      } else {
        dispatch(
          setAlert({
            status: "error",
            text: "couldn't update project",
          })
        );
      }
      // dispatch(setLoading(false));
    } catch (error) {
      // dispatch(setLoading(false));
      dispatch(
        setAlert({
          status: "error",
          text: "couldn't update project",
        })
      );
      console.log(error);
    }
  };
  const handleSaveToDraft = async (e) => {};
  return (
    <>
      <Spinner isLoading={loading} />
      <Formik
        initialValues={{
          title: ProjectDetails?.title,
          image: ProjectDetails?.image,
          uploadFiles: ProjectDetails?.uploadFile,
          fundingScheme: ProjectDetails?.fundingScheme,
          organization: `${ProjectDetails?.organization?._id}`,
          department: `${ProjectDetails?.department?._id}`,
          fundingAgency: ProjectDetails?.fundingAgency?.[0] || undefined,
          userAgency: ProjectDetails?.userAgency?.[0] || undefined || undefined,
          userProjectDetailsSubmittor: ProjectDetails?.usrBy?.[0] || undefined,
          assignedTo: ProjectDetails?.assignedTo || undefined,
          applicationField: ProjectDetails?.applicationField,
          researchSubDomain: ProjectDetails?.researchSubDomain,
          objectives: ProjectDetails?.objectives,
          deliverables: ProjectDetails?.deliverables,
          description: ProjectDetails?.description,
          methodology: ProjectDetails?.methodology,
          references: ProjectDetails?.references,
          physicalAspect: ProjectDetails?.physicalAspect,
          performanceAspect: ProjectDetails?.performanceAspect,
          compatibilityAspect: ProjectDetails?.compatibilityAspect,
          enviromentalAspect: ProjectDetails?.enviromentalAspect,
          specOfProduct: ProjectDetails?.specOfProduct,
          logisticAspect: ProjectDetails?.logisticAspect,
          fireHazard: ProjectDetails?.fireHazard,
          testing: ProjectDetails?.testing,
          financialProposal: ProjectDetails?.financialProposal,
          proposalText: ProjectDetails?.proposalText,
          proposalfile: ProjectDetails?.proposalfile,
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
              <PublishContext.Provider value={valueContext}>
                <Grid container sx={{ pt: inTabs ? 2 : 8 }} gap={2}>
                  <Grid item xs={12}>
                    <MainHeadings text={"Summary"} />
                  </Grid>
                  <Grid item xs={12}>
                    <BreifIntro
                      defaultFundingAgency={ProjectDetails?.fundingAgency}
                      defaultUserAgency={ProjectDetails?.userAgency}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Description />
                  </Grid>
                  <Grid item xs={12}>
                    <TechnicalInformation />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomizableFields />
                  </Grid>
                  <Grid item xs={12}>
                    <ProposalSubmission />
                  </Grid>
                  <Grid item xs={12}>
                    <ButtonMui type={"submit"} variant={"contained"}>
                      Save
                    </ButtonMui>
                  </Grid>
                  {/* Propsal values will come here too */}
                </Grid>
              </PublishContext.Provider>
            </form>
          );
        }}
      </Formik>
    </>
  );
}

export default EditProject;

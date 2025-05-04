import { Button, Card, Grid, debounce } from "@mui/material";
import { HiveRounded } from "@mui/icons-material";
import FileUploadComp from "@common/FileUploadComp";
import Milesstones from "./Milesstones";
import Editor from "@common/Editor";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAlert } from "@store/Features/AlertSlice";
import InputFields from "@common/InputFields/InputFields";
import { useAxios } from "@hooks";
import { handleImages } from "./function";
const arrayFiles = ["Budget Sheet", "Work Plans", "Timelines", "Gantt Charts"];
const handleValues = (values) => {
  if (!values) {
    return null;
  }
  const valuesToReturn = values.reduce((obj, item) => {
    if (item.name !== "") {
      return { ...obj, [item.name]: "" };
    }
  }, {});
  return valuesToReturn;
};
const handleFileUpload = (files) => {
  const updatedValues = files.map((item, index) => {
    return { name: item?.name, value: null };
  });
  return updatedValues;
};
function AddForm({ FormDataProp, projectID, profileId, appliedBy }) {
  const dispatch = useDispatch();
  const { API } = useAxios();
  const financialProposalValue = handleValues(FormDataProp?.financialProposal);
  const proposalTextValue = handleValues(FormDataProp?.proposalText);
  const fieldsForProposalDocsValue = handleValues(
    FormDataProp?.fieldsForProposalDocs
  );
  const ProposalDocsValue = handleFileUpload(FormDataProp?.proposalfile);
  const [ProposalDocs, setProposalDocs] = useState(ProposalDocsValue);
  const [TotalAmount, setTotalAmount] = useState(0);

  const [milestonesData, setMilestonesData] = useState([
    {
      title: "",
      cost: 0,
      duration: 0,
      endDate: "",
      description: "",
    },
  ]);
  const [proposalText, setproposalText] = useState(proposalTextValue);
  const handleChange = debounce((event, editor, name) => {
    const data = editor?.getData();
    setproposalText((e) => {
      return {
        ...e,
        [name]: data,
      };
    });
  }, 500);
  const handleValidation = (data) => {
    if (!data) {
      return false;
    }
    const keys = Object.keys(data);
    keys.forEach((key) => {
      if (data[key] === "") {
        dispatch(
          setAlert({
            status: "error",
            text: `Please fill all the fields`,
          })
        );
        return false;
      }
    });
    return true;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const submittedBy = {
      model: appliedBy,
      id: profileId,
    };

    const proposalTextValidation = handleValidation(proposalText);
    const milestonesDataValidation = handleValidation(milestonesData);
    const ProposalDocsValueValidation = handleValidation(ProposalDocs);
    if (
      proposalTextValidation &&
      milestonesDataValidation &&
      ProposalDocsValueValidation
    ) {
      const valueOfProposalText = await handleImages(proposalText);
      const formData = new FormData();
      formData.append("TotalAmount", TotalAmount);
      formData.append("proposalText", JSON.stringify(valueOfProposalText));
      formData.append("submittedBy", JSON.stringify(submittedBy));
      formData.append("milestonesData", JSON.stringify(milestonesData));
      // formData.append("trackOfFiles", JSON.stringify(trackOfFiles));
      ProposalDocs?.forEach((fileData, index) => {
        if (fileData?.value) {
          formData.append(`document`, fileData.value);
        }
      });
      try {
        const response = await API({
          url: `proposal/submitProposal?id=${projectID}`,
          object: formData,
          method: "post",
        });
        if (response.result) {
          dispatch(
            setAlert({
              status: "success",
              text: `Proposal has been submitted successfully!`,
            })
          );
          window.history.back();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid container gap={4} sx={{ p: 2, backgroundColor: "#F6F7FA" }}>
        {FormDataProp?.proposalText?.map((item, index) => (
          <Grid item xs={12} key={index}>
            <Card sx={{ p: 2 }}>
              <Editor
                label={item?.name}
                value={proposalText[item?.name] || ""}
                onChange={(event, editor) =>
                  handleChange(event, editor, item.name)
                }
                required={true}
                name={item?.name}
              />
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <FileUploadComp
            arrayFiles={ProposalDocs}
            setArrayFiles={setProposalDocs}
            // setproposalfileUpload={setproposalfileUpload}
          />
        </Grid>
        <Grid item xs={12}>
          <Milesstones values={milestonesData} setValues={setMilestonesData} />
        </Grid>
        <Grid item xs={12}>
          <InputFields
            onChange={(e) => setTotalAmount(e.target.value)}
            label={"Total Amount"}
            type={"number"}
            placeholder={
              "write total amount in numbers i.e 12000 for 12000 Rupees"
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            color="success"
            variant="contained"
            startIcon={<HiveRounded />}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddForm;

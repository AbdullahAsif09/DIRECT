import { Button, Card, Grid, debounce } from "@mui/material";
import { HiveRounded } from "@mui/icons-material";
import FileUploadComp from "@common/FileUploadComp";
import Milesstones from "./Milesstones";
import Editor from "@common/Editor";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAlert } from "@store/Features/AlertSlice";
import InputFields from "@common/InputFields/InputFields";
import { useAxios } from "@hooks";
const arrayFiles = ["Budget Sheet", "Work Plans", "Timelines", "Gantt Charts"];
const handleValues = (values) => {
  if (!values) {
    return null;
  }
  return console.log(values);
  const valuesToReturn = values?.reduce((obj, item) => {
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
function AddForms({
  FormDataProp,
  projectID,
  profileId,
  appliedBy,
  proposalData,
}) {
  const dispatch = useDispatch();
  const { API } = useAxios();
  console.log(proposalData?.milestones?.details, "proposalData");
  const financialProposalValue = handleValues(proposalData?.financialProposal);
  const proposalTextValue = handleValues(proposalData?.proposalText);
  const fieldsForProposalDocsValue = handleValues(
    proposalData?.fieldsForProposalDocs
  );
  const ProposalDocsValue = handleFileUpload(proposalData?.proposalfile);
  const [ProposalDocs, setProposalDocs] = useState(ProposalDocsValue);
  const [TotalAmount, setTotalAmount] = useState(0);

  const [milestonesData, setMilestonesData] = useState([]);
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
      const formData = new FormData();
      formData.append("TotalAmount", TotalAmount);
      formData.append("proposalText", JSON.stringify(proposalText));
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
  useEffect(
    () => setMilestonesData(proposalData?.milestones?.details),
    [proposalData?.milestones]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Grid container gap={4} sx={{ p: 2, backgroundColor: "#F6F7FA" }}>
        {Object.entries(proposalData?.proposalText).map(([keys, value]) => (
          <Grid item xs={12} key={keys}>
            <Card sx={{ p: 2 }}>
              <Editor
                label={keys}
                // value={proposalText?.[item?.name] || ""}
                value={value ? value : ""}
                // onChange={(event, editor) =>
                //   handleChange(event, editor, item.name)
                // }
                required={true}
                name={keys}
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

export default AddForms;

import { Button, Card, Grid, debounce } from "@mui/material";
import { HiveRounded } from "@mui/icons-material";
import FileUploadComp from "@common/FileUploadComp";
import Milesstones from "./Milesstones";
import Editor from "@common/Editor";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAlert } from "@store/Features/AlertSlice";
import { useAxios } from "@hooks";
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
  const { api } = useAxios();
  const proposalTextValue = handleValues(FormDataProp?.proposalText);
  const ProposalDocsValue = handleFileUpload(FormDataProp?.proposalfile);
  const [proposalText, setproposalText] = useState(proposalTextValue);
  const handleChange = debounce((event, editor, name) => {
    const data = editor?.getData();
    setproposalText({
      ...proposalText,
      [name]: data,
      h,
    });
  }, 500);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const submittedBy = {
      model: appliedBy,
      id: profileId,
    };
    const formData = new FormData();
    formData.append("proposalText", JSON.stringify(proposalText));
    formData.append("submittedBy", JSON.stringify(submittedBy));
    // formData.append("trackOfFiles", JSON.stringify(trackOfFiles));
    ProposalDocsValue?.forEach((fileData, index) => {
      if (fileData?.value) {
        formData.append(`document`, fileData.value);
      }
    });
    try {
      const data = await api({
        url: `proposal/submitProposal?id=${projectID}`,
        method: "post",
        object: formData,
      });
      if (data?.result) {
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
          <FileUploadComp arrayFiles={ProposalDocsValue} />
        </Grid>
        <Grid item xs={12}>
          <Milesstones values={1} handleChange={handleChange} />
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

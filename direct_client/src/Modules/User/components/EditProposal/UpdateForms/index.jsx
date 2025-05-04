import { Button, Card, Grid, debounce } from "@mui/material";
import { HiveRounded } from "@mui/icons-material";
import FileUploadComp from "@common/FileUploadComp";
import Milesstones from "./Milesstones";
import Editor from "@common/Editor";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "@store/Features/AlertSlice";
import InputFields from "@common/InputFields/InputFields";
import { useAxios } from "@hooks";
import { handleImages } from "./function";
import { useCrypto } from "@hooks/index";
const arrayFiles = ["Budget Sheet", "Work Plans", "Timelines", "Gantt Charts"];

const handleFileUpload = (files) => {
  const updatedValues = files?.map((item, index) => {
    return { name: item?.name, value: null };
  });
  return updatedValues;
};
function UpdateForms({
  FormDataProp,
  projectID,
  profileId,
  appliedBy,
  proposalData,
  proposalID,
}) {
  const { API } = useAxios();
  const dispatch = useDispatch();
  const { encryption } = useCrypto();
  const profile = useSelector((state) => state?.profile?.profile);
  const ProposalDocsValue = handleFileUpload(proposalData?.proposalfile);
  const [ProposalDocs, setProposalDocs] = useState(ProposalDocsValue);
  const [TotalAmount, setTotalAmount] = useState(0);

  const [milestonesData, setMilestonesData] = useState([]);
  const [proposalText, setproposalText] = useState(proposalData?.proposalText);
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
    console.log(proposalText);
    console.log(milestonesData);
    const valueOfProposalText = await handleImages(proposalText);
    const dataToSend = {
      milestones: milestonesData,
      proposalText: valueOfProposalText,
    };
    console.log(dataToSend, "dataToSend");
    const encryptedData = encryption(
      {
        milestones: milestonesData,
        proposalText: valueOfProposalText,
      },
      profile?._id
    );
    try {
      const response = await API({
        url: `proposal/reSubmitProposal?proposalID=${proposalID}`,
        object: dataToSend,
        method: "patch",
      });
      console.log(response, "req res");
      if (response.result) {
        dispatch(
          setAlert({
            status: "success",
            text: `Proposal has been submitted successfully!`,
          })
        );
        // window.history.back();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(
    () => setMilestonesData(proposalData?.milestones?.details),
    [proposalData?.milestones]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Grid container gap={4} sx={{ p: 2, backgroundColor: "#F6F7FA" }}>
        {Object.entries(proposalText).map(([keys, value]) => (
          <Grid item xs={12} key={keys}>
            <Card sx={{ p: 2 }}>
              <Editor
                label={keys}
                value={value ? value : ""}
                onChange={(event, editor) => handleChange(event, editor, keys)}
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

export default UpdateForms;

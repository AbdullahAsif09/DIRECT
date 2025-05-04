import MainHeadings from "@common/AnimationMui/MainHeadings";
import InputFields from "@common/InputFields/InputFields";
import ButtonMui from "@common/MUI/ButtonMUI";
import { useAxios } from "@hooks/index";
import { Send } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { setAlert } from "@store/Features/AlertSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
function Remarks() {
  const { API, loading } = useAxios();
  const { id: proposalID } = useParams();
  const dispatch = useDispatch();
  const [Text, setText] = useState("");
  const handleSubmitRemarks = async () => {
    const dataToSend = {
      proposalID: proposalID,
      remarks: Text,
    };
    try {
      const response = await API({
        url: "admin/reqChangesInProposal",
        method: "patch",
        object: dataToSend,
      });
      console.log(response, "response");
      if (response?.message === "success") {
        return dispatch(
          setAlert({ status: "success", text: "Remarks has been send!" })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Grid container gap={2}>
      <Grid item xs={12}>
        <MainHeadings
          text={"Provide Remarks for Proposal Resubmission"}
          variant={"h2"}
        />
      </Grid>
      <Grid item xs={12}>
        <InputFields
          onChange={(e) => setText(e.target?.value)}
          type={"textbox"}
          rows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <ButtonMui
          endIcon={<Send />}
          loading={loading}
          loadingPosition="end"
          variant={"contained"}
          onClick={handleSubmitRemarks}
        >
          {
            
          }
          Send Remarks
        </ButtonMui>
      </Grid>
    </Grid>
  );
}

export default Remarks;

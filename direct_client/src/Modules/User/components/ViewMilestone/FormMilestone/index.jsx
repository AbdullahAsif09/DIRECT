import { Grid, Stack, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputFields from "@common/InputFields/InputFields";
import ButtonMui from "@common/MUI/ButtonMUI";
import axios from "axios";
import { useAxios } from "@hooks";
import { keys } from "@config";
import { CloudUpload } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setAlert } from "@store/Features/AlertSlice";

function FormMilestone({ milestoneID, milestoneIndex }) {
  const dispatch = useDispatch();
  const { API } = useAxios();
  const { data } = useAxios(`milestone/getSingleMilestone`, "post", {
    milestoneID: milestoneID,
    milestoneIndex: milestoneIndex,
  });
  const [formValues, setFormValues] = useState({
    title: data?.result?.title,
    duration: data?.result?.duration || "",
    payment: data?.result?.cost || 0,
    progress: data?.result?.progress || 0,
    description: data?.result?.description || "",
  });
  const [selectedFiles, setSelectedFiles] = useState(data?.result?.files || []);
  const handleSubmitForm = async () => {
    formValues.milestoneID = milestoneID;
    formValues.milestoneIndex = milestoneIndex;
    if (selectedFiles.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("files", selectedFiles[i]);
      }
      formData.append("title", formValues.title);
      formData.append("duration", formValues.duration);
      formData.append("cost", formValues.payment);
      formData.append("progress", formValues.progress);
      formData.append("description", formValues.description);
      formData.append("milestoneIndex", milestoneIndex);
      formData.append("milestoneID", milestoneID);
      try {
        const res = await API({
          url: "milestone/updateSingleMilestone",
          method: "patch",
          object: formData,
        });
        if (res?.type == "success" || res?.message == "success") {
          dispatch(
            setAlert({ text: "Milestone is updated", status: "success" })
          );
        }
      } catch (error) {
        console.log(error);
        dispatch(
          setAlert({ text: "Unable to update Milestone", status: "error" })
        );
      }
      return;
    }
    formValues.cost = formValues.payment;
    try {
      const res = await API({
        url: "milestone/updateSingleMilestone",
        method: "patch",
        object: formValues,
      });
      if (res?.message == "success") {
        dispatch(setAlert({ text: "Milestone is updated", status: "success" }));
      }
    } catch (error) {
      dispatch(setAlert({ text: "can not update milestone", status: "error" }));
      console.log(error);
    }
  };
  const handleFileChange = (e) => {
    setSelectedFiles(e?.target?.files);
  };
  const getSingleMilestone = () => {
    setFormValues({
      title: data?.result?.title,
      duration: data?.result?.duration || "",
      payment: data?.result?.cost || 0,
      progress: data?.result?.progress || 0,
      description: data?.result?.description || "",
    });
    setSelectedFiles(data?.result?.files || []);
  };
  useEffect(() => {
    getSingleMilestone();
  }, [data]);
  return (
    <Grid container rowGap={1} justifyContent={"space-between"}>
      <Grid item xs={5.9}>
        <InputFields
          label={"Title"}
          placeholder={"write title here..."}
          type={"text"}
          value={formValues.title}
          onChange={(e) =>
            setFormValues({ ...formValues, title: e.target.value })
          }
        />
      </Grid>
      <Grid item xs={5.9}>
        <InputFields
          placeholder={"write about milestone's duration like 1 for 1 month"}
          label={"Duration"}
          type={"number"}
          value={formValues.duration}
          onChange={(e) =>
            setFormValues({ ...formValues, duration: e.target.value })
          }
        />
      </Grid>
      <Grid item xs={5.9}>
        <InputFields
          placeholder={"write payment amount in number like 1000 for 1000 Rs"}
          value={formValues.payment}
          label={"Payment"}
          type={"number"}
          onChange={(e) =>
            setFormValues({ ...formValues, payment: e.target.value })
          }
        />
      </Grid>
      <Grid item xs={5.9}>
        <InputFields
          label={"Progress"}
          placeholder={"write progress in number like 80 for 80%"}
          type={"number"}
          value={formValues.progress}
          onChange={(e) =>
            setFormValues({ ...formValues, progress: e.target.value })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <InputFields
          label={"Description"}
          placeholder={"write description here..."}
          rows={4}
          type={"textbox"}
          value={formValues.description}
          onChange={(e) =>
            setFormValues({ ...formValues, description: e.target.value })
          }
        />
      </Grid>
      <Grid item xs={12} mt={4}>
        {/* <FileUploadComp arrayFiles={selectedFiles} /> */}
        <Stack direction={"row"} gap={4}></Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack direction={"row"} gap={6}>
          <Button
            component="label"
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUpload />}
          >
            Upload file
            <input type="file" multiple hidden onChange={handleFileChange} />
          </Button>
          <ButtonMui onClick={handleSubmitForm} variant={"contained"}>
            Submit
          </ButtonMui>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default FormMilestone;

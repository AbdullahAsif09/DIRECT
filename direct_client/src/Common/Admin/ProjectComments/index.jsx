import React, { useRef, useState, useCallback, useEffect } from "react";
import MainHeadings from "@common/AnimationMui/MainHeadings";
import { Grid, IconButton, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "@store/Features/AlertSlice";
import { GridCloseIcon } from "@mui/x-data-grid";
import ButtonMui from "@common/MUI/ButtonMUI";
import { SpinnerSmaller } from "@common/UI";
import { Send } from "@mui/icons-material";
import { useAxios } from "@hooks/index";
import TextBox from "./TextBox";

function ProjectComments({ handleCloseModalFeedback, project }) {
  const { data, loading, setData, api } = useAxios(`projectComments/getComments/${project}`);
  const [commentLoading, setCommentLoading] = useState(false);
  const comments = data?.result ?? [];
  const ref = useRef();
  const dispatch = useDispatch();

  const sendMessage = useCallback(
    async (e) => {
      e.preventDefault();
      if (commentLoading) return;

      const message = ref.current.value.trim();
      if (!message) {
        dispatch(setAlert({ status: "error", text: "Please enter a comment." }));
        return;
      }

      setCommentLoading(true);
      try {
        const response = await api({
          url: `projectComments/addComment/${project}`,
          method: "POST",
          object: { content: message },
        });

        ref.current.value = "";
        setData(response);
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setCommentLoading(false);
      }
    },
    [api, commentLoading, dispatch, project, setData]
  );

  /* socket for real time comments update */
  const socket = useSelector((state) => state.socket.socket);
  useEffect(() => {
    if (!socket) return;

    socket.on("projectCommentAdded", (comment) => {
      setData((prevData) => [...prevData, comment]);
    });
    return () => socket.off("projectCommentAdded");
  }, [project]);

  if (loading) {
    return <SpinnerSmaller isLoading sx={{ height: "100%" }} />;
  }
  return (
    <Grid container sx={{ height: "100%" }} gap={1}>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <MainHeadings text="Comments" variant="h2" />
        <IconButton onClick={handleCloseModalFeedback}>
          <GridCloseIcon />
        </IconButton>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          p: 2,
          border: "1px solid lightgray",
          borderRadius: 1,
          overflowY: "hidden",
          height: { xs: "77%", sm: "80%", md: "83%" },
        }}
      >
        <TextBox comments={comments} />
      </Grid>
      <form onSubmit={sendMessage} style={{ width: "100%" }}>
        <Grid item xs={12} display="flex" alignItems="center" gap={0.7}>
          <TextField
            fullWidth
            type="text"
            inputRef={ref}
            placeholder="Write a comment..."
            variant="outlined"
            sx={{
              "@media screen and (max-width:600px)": {
                input: {
                  paddingBlock: 1.5,
                },
              },
            }}
          />
          <ButtonMui
            loading={commentLoading}
            type="submit"
            sx={{
              height: 54,
              "@media screen and (max-width:600px)": {
                minWidth: 30,
                height: 45,
              },
            }}
            variant="contained"
          >
            <Send />
          </ButtonMui>
        </Grid>
      </form>
    </Grid>
  );
}

function ProjectCommentsWrapper({ handleCloseModalFeedback, project }) {
  console.log(project);

  if (!project || project === true || project === false) return null;
  return <ProjectComments handleCloseModalFeedback={handleCloseModalFeedback} project={project} />;
}
export default ProjectCommentsWrapper;

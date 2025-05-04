import { Grid } from "@mui/material";
import Content from "./SubComponents/Content";
import Filters from "./SubComponents/Filters";
import TypographyMUI from "../../MUI/TypographyMUI";
import { useAxios } from "@hooks/index";
import { useState } from "react";
import { Spinner, SpinnerSmaller } from "@common/UI";
import { useDispatch } from "react-redux";
import { setAlert } from "@store/Features/AlertSlice";

function Draft() {
  const { data, loading, API } = useAxios("projects/getProjectsInDraft");
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();

  const handleDeleteProject = async (id) => {
    if (!id) {
      return dispatch(setAlert({ text: "Invalid Type selection.", status: "error" }));
    }

    try {
      const response = await API({
        url: `projects/deleteproject`,
        method: "post",
        object: {
          id,
          inDraft: true,
        },
      });

      if (response?.type === "success") {
        dispatch(
          setAlert({
            status: "success",
            text: "Project deleted successfully.",
          })
        );
      } else {
        dispatch(
          setAlert({
            text: response?.result ?? response?.data?.message,
            status: "error",
          })
        );
      }
      console.log(response, "response");
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return (
      <SpinnerSmaller
        isLoading={true}
        message={typeof loading == "string" ? "Deleting Project Please wait..." : undefined}
      />
    );
  }
  return (
    <Grid container sx={{ minWidth: "100%" }}>
      <Grid item xs={12}>
        <Filters filter={filter} setFilter={setFilter} />
      </Grid>
      <Grid item xs={12}>
        {data?.result == "no project found" || typeof data?.result === "string" ? (
          <TypographyMUI variant={"h3"}>no data found</TypographyMUI>
        ) : (
          <Content
            cardsData={data?.result}
            filter={filter}
            handleDeleteProject={handleDeleteProject}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default Draft;

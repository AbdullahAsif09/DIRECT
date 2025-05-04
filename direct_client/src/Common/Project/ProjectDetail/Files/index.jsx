import { Grid } from "@mui/material";
import FileHeader from "./Header/FileHeader";
import AllFiles from "./AllFiles/AllFiles";
import { useAxios } from "@hooks";

const ProjectFile = ({ milestoneID }) => {
  /* project files */

  const { data, loading } = useAxios(
    `milestone/getFilesofSingleMilestone`,
    "post",
    { milestoneID }
  );
  /* milestone files restrucuted */
  const restructureData =
    data?.result?.map((e, i) => {
      return { ...e, id: i + 1 };
    }) ?? [];

  return (
    <Grid container pb={5} pt={3}>
      {/* <FileHeader /> */}
      <AllFiles data={restructureData ?? []} loading={loading} />
    </Grid>
  );
};

export default ProjectFile;

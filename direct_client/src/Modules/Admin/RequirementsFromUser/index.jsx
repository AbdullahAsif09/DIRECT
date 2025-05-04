import { Card, Grid, Stack } from "@mui/material";
import MainHeadings from "@common//AnimationMui/MainHeadings";
import DataGrids from "@common/TableMui/DataGrids";
import { customTheme } from "@theme/theme";
import { columnsFiles, rowsFiles } from "./data";
import { keys } from "@config";
import { useAxios } from "@hooks";

function RequirementsFromUser() {
  const { data } = useAxios("admin/getUSRS");
  const newData = data?.result?.map((item, index) => {
    const file = item?.file?.split(".");
    const filename = file[0];
    const ext = file[file.length - 1];
    console.log(item, "item");
    return {
      id: index + 1,
      fileName: item?.user?.name,
      email: item?.user?.email,
      upload: item?.user?.name,
      size: `${parseFloat(item?.size / 1024).toFixed(2)} KBs`,
      date: new Date(item?.createdAt).toDateString(),
      url: keys.rootserver + item?.file,
      type: ext,
    };
  });
  return (
    <Grid container sx={{ pt: 8, pb: 4 }} gap={6}>
      <Grid item xs={12}>
        <MainHeadings text={"Requirements from User/URD/GSR"} />
      </Grid>
      <Grid item xs={12}>
        <Card
          sx={{
            p: 2,
            boxShadow: customTheme.palette.boxShadows.boxShadowTable,
          }}
        >
          <Stack direction={"column"}>
            {/* <UploadFiles /> */}
            <DataGrids
              dataColumn={columnsFiles}
              dataRow={newData ?? rowsFiles}
            />
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}

export default RequirementsFromUser;

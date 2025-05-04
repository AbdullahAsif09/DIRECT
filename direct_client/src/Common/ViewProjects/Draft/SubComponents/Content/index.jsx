import { Grid } from "@mui/material";
import CardMui from "../CardMui";
import { SkeletonsUI } from "../../../../UI";
function Content({ cardsData, filter, handleDeleteProject }) {
  return (
    <Grid
      container
      rowGap={4}
      justifyContent={"space-between"}
      alignContent={"center"}
      sx={{ width: "100%", pt: 4 }}
    >
      {cardsData
        ? cardsData?.map((e, i) => {
            const lowerTitle = String(e?.title).toLowerCase();
            const lowerFilter = String(filter).toLowerCase();
            const condition = lowerFilter
              ? lowerTitle?.includes(lowerFilter)
              : true;
            return (
              condition && (
                <Grid item xs={12} md={12} lg={5.9} key={i}>
                  <CardMui
                    cardData={e}
                    handleDeleteProject={handleDeleteProject}
                  />
                </Grid>
              )
            );
          })
        : Array(6)
            .fill(0)
            .map((e, i) => (
              <Grid
                key={i}
                item
                xs={12}
                md={12}
                lg={5.9}
                display={"flex"}
                flexDirection={"column"}
                gap={1}
              >
                <SkeletonsUI
                  animation="wave"
                  variant="circular"
                  width={40}
                  height={40}
                />

                <SkeletonsUI
                  animation="wave"
                  variant="rounded"
                  width={"100%"}
                  height={10}
                />
                <SkeletonsUI
                  animation="wave"
                  variant="rounded"
                  width={"100%"}
                  height={10}
                />
              </Grid>
            ))}
    </Grid>
  );
}

export default Content;

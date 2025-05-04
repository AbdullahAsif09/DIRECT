import { Grid, Stack, Typography } from "@mui/material";
import { customTheme } from "@theme/theme";
const arrayData = [
  {
    title: "Funding Agency",
    name: "Defence",
  },
  {
    title: "Initiator",
    name: "Dr Amer Sohail Kashif",
  },
  {
    title: "Category",
    name: "Defence",
  },
  {
    title: "Start Date",
    name: "December 20th, 2023",
  },
  {
    title: "End Date",
    name: "December 20th, 2024",
  },
];
function BasicInfo() {
  return (
    <Grid container>
      <Grid display={"flex"} gap={1} flexWrap={"wrap"} item xs={12}>
        {arrayData.map((e, i) => (
          <Stack
            sx={{
              backgroundColor: "lightGrey",
              p: 1,
              pl: 2,
              pr: 2,
              borderBottom: `3px solid white`,
              borderRadius: "7px",
              transition: "all .3s ease-in-out",

              "&:hover": {
                transform: `translateY(-3px)`,
                borderBottom: `3px solid #252B42`,
              },
            }}
            direction={"row"}
            key={i}
            columnGap={1}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography variant="h5" fontWeight={500}>
              {e.title} :
            </Typography>
            <Typography variant="h5">{e.name}</Typography>
          </Stack>
        ))}
      </Grid>
    </Grid>
  );
}

export default BasicInfo;

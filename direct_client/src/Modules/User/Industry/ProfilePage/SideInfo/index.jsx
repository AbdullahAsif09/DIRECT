import {
  Api,
  AppRegistration,
  Email,
  Info,
  Phone,
  Room,
} from "@mui/icons-material";
import { Grid, Typography, styled } from "@mui/material";

const GridItem = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: ".5rem",
  paddingBlock: "15px",
  paddingInline: "20px",
  borderRadius: "10px",
  backgroundColor: "#E6E6E6",
}));
const DividerOne = styled("div")(({ theme }) => ({
  width: "70px",
  marginTop: "10px",
  display: "flex",
  justifyContent: "space-between",
}));
const LeftBorder = styled("div")(({ theme }) => ({
  width: "70%",
  //   border: "2px solid #3787FF",
  border: "2px solid" + theme.palette.bg.greenMui,
  borderRadius: "17px",
}));
const RightBorder = styled("div")(({ theme }) => ({
  width: "20%",
  border: "2px solid" + theme.palette.bg.greenMui,
  borderRadius: "17px",
}));
const infoArray = [
  {
    name: "abdullahasifabdullahasif@gmail.com",
    icon: <Email />,
  },
  { name: "+92 3030000000", icon: <Phone /> },
  { name: "Location", icon: <Room /> },
  { name: "Registration Number", icon: <AppRegistration /> },
  { name: "Tax ID", icon: <Api /> },
];
function SideInfo({ profileData }) {
  const account = profileData?.account ?? {};
  return (
    <Grid container rowGap={4}>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
          gap: ".6rem",
        }}
        item
        xs={12}
      >
        <Typography variant="h3">Industry Overview</Typography>
        <DividerOne>
          <LeftBorder></LeftBorder>
          <RightBorder></RightBorder>
        </DividerOne>
      </Grid>
      <Grid item xs={12}>
        <Grid container gap={2}>
          {/* <Zoom in timeout={400}> */}
          <GridItem item>
            <Email />
            <Typography>{account.email}</Typography>
          </GridItem>
          {/* </Zoom> */}
          {/* <Zoom in timeout={800}> */}
          <GridItem item>
            <Phone />
            <Typography>{account.phone}</Typography>
          </GridItem>
          {/* </Zoom> */}
          {/* <Zoom in timeout={1200}> */}
          <GridItem item>
            <Room />
            <Typography>{account.address}</Typography>
          </GridItem>
          {/* </Zoom> */}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SideInfo;

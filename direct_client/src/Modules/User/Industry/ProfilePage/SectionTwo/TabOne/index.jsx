import { Grid, Typography, styled } from "@mui/material";
import CommonTable from "@common/TableMui/CommonTable";
import { dummySkilll, headingTable } from "./data";
const SectionOne = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
}));
const SectionTwo = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
}));
const SectionThree = styled("div")(({ theme }) => ({
  width: "100%",
}));
const GridLeft = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "3rem",
}));
const Container = styled(Grid)(({ theme }) => ({
  padding: "10px",
  borderRadius: "10px",
  backgroundColor: "#E6E6E6",
}));

function TabOne({ profileData }) {
  return (
    <Grid container sx={{ mt: 2 }}>
      <GridLeft item xs={12}>
        <SectionOne>
          <Typography variant="h3">About</Typography>
          <Typography width={"90%"} textAlign={"justify"} variant="body1">
            {profileData.description}
          </Typography>
        </SectionOne>
        <SectionTwo>
          <Typography variant="h3">
            Industry Categories for Applying to The Project
          </Typography>
          <Grid container flexWrap={true} gap={2}>
            {dummySkilll.map((e, i) => (
              <Container key={i}>
                <Typography variant="body2" color={"GrayText"} fontWeight={600}>
                  {e}
                </Typography>
              </Container>
            ))}
          </Grid>
        </SectionTwo>
        <SectionThree>
          <Typography sx={{ mb: 2 }} variant="h3">
            Partner Firms/Comapanies
          </Typography>
          <CommonTable
            tableData={
              profileData.partnerFirm.length !== 0
                ? profileData.partnerFirm
                : "No Data Found"
            }
            headerHeading={headingTable}
          />
        </SectionThree>
      </GridLeft>
    </Grid>
  );
}

export default TabOne;

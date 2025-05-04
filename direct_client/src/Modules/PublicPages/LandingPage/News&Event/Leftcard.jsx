import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
const Container = styled("div")(({ theme }) => ({
  borderRadius: "20px",
  overflow: "hidden",
  marginRight: "auto",
  width: "90%",

  [theme.breakpoints.down("lg")]: {
    width: "100%",
    maxWidth: "100%",
    margin: "auto",
  },
}));
const GridItemOne = styled(Grid)(({ theme }) => ({
  height: "250px",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-end",
  gap: "1rem",
  backgroundColor: "#D9D9D9",
  padding: "1.5rem 1rem",
  [theme.breakpoints.down("md")]: {
    height: "220px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "195px",
  },
}));
const ItemOneButtons = styled(Button)(({ theme }) => ({
  backgroundColor: "#11112B",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "#11112B",
  },
}));
const GridItemTwo = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "1rem",
  backgroundColor: "white",
  padding: "1.5rem 1rem",
}));

const ParaText = styled(Typography)(({ theme }) => ({
  color: "#11112B",
  fontWeight: "400",
}));
const DateText = styled(Typography)(({ theme }) => ({
  fontSize: "9px",
  color: "grey",
  fontWeight: "400",
  marginBlock: "-.5rem .5rem",
}));

function Leftcard({ item }) {
  return (
    <Container>
      <Grid container alignItems={"center"}>
        <GridItemOne item xs={12}>
          <ItemOneButtons variant="contained">Trends</ItemOneButtons>
          <ItemOneButtons variant="contained">Development</ItemOneButtons>
        </GridItemOne>
        <GridItemTwo item xs={12}>
          <Typography
            variant="h3"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            The Future of DIRECT Portal 202{item}
          </Typography>
          <ParaText
            variant="body2"
            lineHeight={1.7}
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
            }}
          >
            This article explores the top trends that are expected to shape the
            landscape of DIRECT Portal in 2024, highlighting the key areas where
            developers should focus on working.
          </ParaText>
          <DateText>January 9, 2023</DateText>
        </GridItemTwo>
      </Grid>
    </Container>
  );
}

export default Leftcard;

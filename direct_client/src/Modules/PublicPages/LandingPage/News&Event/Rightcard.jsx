import { Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Rightpost from "./Rightpost";
import { Stack } from "@mui/system";
import { RightPostData } from "./data";
const Container = styled("div")(({ theme }) => ({
  boxSizing: "border-box",
  borderRadius: "20px",
  overflow: "hidden",
  marginBottom: "0px",
  padding: "3.5rem 3rem",
  background:
    "linear-gradient(180deg, rgba(255, 255, 255, 0.79) 0%, rgba(255, 255, 255, 0.65) 100%)",
  width: "100%",
  marginLeft: "auto",
  [theme.breakpoints.down("sm")]: {
    height: "100%",
    marginBottom: "30px",
    padding: "3.5rem 2rem",
  },
}));
const HeadingText = styled(Typography)(({ theme }) => ({
  fontSize: "27px",
  fontWeight: 700,
  color: "#11112B",
  textAlign: "left",
}));
function Rightcard() {
  return (
    <Container>
      <Stack
        direction={"column"}
        alignItems={"flex-start"}
        spacing={4}
        boxSizing={"border-box"}
      >
        <HeadingText variant="h1">Latest Posts</HeadingText>

        {RightPostData?.map((e, i) => (
          <Rightpost key={i} data={e} />
        ))}
      </Stack>
    </Container>
  );
}

export default Rightcard;

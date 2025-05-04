import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import numeral from "numeral";

const IconText = ({ icon, number, text, Green }) => {
  const Icon2 = styled("svg")(({ theme }) => {
    return {
      width: 50,
      height: 50,

      [theme.breakpoints.down("sm")]: {
        marginRight: 0,
        marginLeft: "10%",
      },
      "@media screen and (max-width:400px)": {
        marginLeft: "0%",
      },
    };
  });

  const Text = styled("span")(({ theme }) => {
    const green = theme.palette.text.grey;
    return {
      color: Green ? green : "white",
      fontWeight: Green ? 500 : 300,
      fontSize: 15,
      position: "relative",
      top: "0rem",
      paddingLeft: ".2rem",
    };
  });
  const Number = styled("h3")(({ theme }) => {
    const green = theme.palette.text.dark;
    return {
      color: Green ? green : "white",
      margin: "0",
      marginTop: "-.2rem",
      textTransform: "uppercase",
      fontSize: 20,
    };
  });

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        "@media screen and (max-width:400px)": {
          justifyContent: "flex-start",
        },
      }}
      gap={".5rem"}
      columnGap={"1rem"}
    >
      <Icon2>{icon}</Icon2>
      <Stack
        sx={{
          "@media screen and (max-width:600px)": {
            width: "200px",
          },
        }}
      >
        <Number> {numeral(number).format("0a")}</Number>
        <Text>{text}</Text>
      </Stack>
    </Stack>
  );
};

export default IconText;

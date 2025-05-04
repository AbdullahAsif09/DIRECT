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
      },
    };
  });
  const StackStyled = styled(Stack)(({ theme }) => ({
    justifyContent: "center",
  }));
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
    <StackStyled
      className="dummy"
      direction={"row"}
      gap={".7rem"}
      alignItems="flex-start"
    >
      <Icon2>{icon}</Icon2>
      <div>
        <Number>{number ? numeral(number).format("Oa") : "0"}</Number>
        <Text>{text}</Text>
      </div>
    </StackStyled>
  );
};

export default IconText;

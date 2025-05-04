import { styled } from "@mui/material";

export const StatusStyled = styled("span")((data) => {
  return {
    border: "none",
    background: "#129BE8",
    color: "white",
    borderRadius: `5px`,
    fontSize: ".96rem",
    padding: "3px 12px",
    fontFamily: "Poppins",
    fontWeight: "300",
  };
});

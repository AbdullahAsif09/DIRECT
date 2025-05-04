import { CircularProgress, Stack } from "@mui/material";
import React from "react";

export const Spinner = ({ isLoading, message }) => {
  if (!isLoading) return null;
  return (
    <Stack
      sx={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        width: "100vw",
        height: "100vh",
        zIndex: "2100",
        fontWeight: message ? "bold" : undefined,
        fontSize: message ? "20px" : undefined,
      }}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {message ?? <CircularProgress />}
    </Stack>
  );
};
export const SpinnerSmaller = ({ isLoading, message, sx = {} }) => {
  if (!isLoading) return null;
  return (
    <Stack
      sx={{
        background: "white",
        width: "100%",
        height: "300px",
        zIndex: "2100",
        fontWeight: message ? "bold" : undefined,
        fontSize: message ? "20px" : undefined,
        ...sx,
      }}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {message ?? <CircularProgress />}
    </Stack>
  );
};

import { Button, Grid } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UplaodFiles from "./UplaodFiles";
import PastFiles from "./PastFiles";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const SendToAdmin = () => {
  const pastFiles = useSelector((state) => state.usr.pastFiles);
  return (
    <Grid container pt={4} pb={5}>
      {/* header  */}
      <Grid
        container
        width={"100%"}
        justifyContent={"space-between"}
        paddingBottom={3}
        alignItems="center"
      >
        <Link to={"/user/projects"}>
          <Button
            startIcon={<ArrowBackIcon />}
            sx={{
              backgroundColor: "#3B4758",
              color: "white",
              padding: "5px 15px",
              textTransform: "lowercase",
              "&:hover": {
                backgroundColor: "#2f3b4a",
              },
            }}
          >
            Back
          </Button>
        </Link>
      </Grid>

      {/* fileUplaod */}
      <UplaodFiles />
      {/* Past Documents  */}
      <PastFiles data={pastFiles} />
    </Grid>
  );
};

export default SendToAdmin;

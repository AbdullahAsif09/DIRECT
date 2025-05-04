import TypographyMUI from "@common/MUI/TypographyMUI";
import { Box, Chip, styled } from "@mui/material";
import { stringToColor } from "@utils/messageColors";
import React from "react";
import { useSelector } from "react-redux";

const StyledMessages = styled("div")(({ theme }) => ({
  width: "100%",
  marginBlock: 4,
  zIndex: 1,
  height: "auto",

  "@media screen and (max-width:610px)": {
    marginBlock: 0,
  },
}));
function Messages({ mine, comment }) {
  const profile = useSelector((state) => state.profile.profile);
  const sender = comment?.sender?.id;
  mine = sender?._id == profile?._id;

  const model = comment?.sender?.model;

  return (
    <StyledMessages>
      <TypographyMUI
        sx={{
          background: mine ? "#128C7E" : "#223143",
          padding: "10px 12px",
          borderRadius: 4,
          marginLeft: !mine ? "none" : "auto",
          marginRight: !mine ? "auto" : "none",
          color: "white",
          fontWeight: 300,
          letterSpacing: ".3px",
          fontSize: "17px",
          fontFamily: "Segoe UI, sans-serif",
          textShadow: "0px 0px 0px",
          width: "50%",
          wordBreak: "break-word",
          "@media screen and (max-width:992px)": {},
          "@media screen and (max-width:600px)": {
            width: "80%",
          },
          "@media screen and (max-width:300px)": {
            width: "100%",
          },

          "@media screen and (max-width:610px)": {
            paddingBlock: "7px",
            fontSize: "14px",
          },
        }}
      >
        <Box
          component={"span"}
          sx={{
            display: "block",
            fontWeight: "300",
            fontSize: "13px",
            letterSpacing: "1px",
            color: mine ? "#47ff9b" : stringToColor("sender?.name"),
            textShadow: "0px 0px 0px",
          }}
        >
          {sender?.name ?? sender?.firstName + " " + sender?.lastName ?? ""}
          <Box
            className="userTagged"
            component={"span"}
            sx={{
              fontSize: "11px !important",
              display: "inline-block",
              ml: 1,
              position: "relative",
              top: "-3px !important",
              paddingBlock: "1px !important",
              background: "#00000045 !important",
              color: "white !important",
              borderRadius: "2px",
              paddingInline: 0.5,
            }}
          >
            {model}
          </Box>
        </Box>
        {comment?.content ?? ""}
        <Box sx={{ fontSize: "11px", textAlign: "right", margin: "0px" }}>
          {new Date(comment?.createdAt).toLocaleString()}
        </Box>
      </TypographyMUI>
    </StyledMessages>
  );
}

export default Messages;

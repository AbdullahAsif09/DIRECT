import TypographyMUI from "@common/MUI/TypographyMUI";
import { stringToColor } from "@utils/messageColors";
import { Box, styled } from "@mui/material";
import { useInView } from "@hooks";
import { useEffect } from "react";

const StyledMessages = styled("div")(({ theme }) => ({
  width: "100%",
  marginBlock: 4,
  zIndex: 1,
  height: "auto",
}));

function Messages({ mine, content, sender, isPrivate, date }) {
  const [ref, isInView] = useInView({
    threshold: 1, // Adjust the threshold as needed
  });

  useEffect(() => {
    if (isInView) {
      /* we can update the view here */
    }
  }, [isInView, sender]);

  return (
    <StyledMessages ref={ref}>
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
            width: "70%",
          },
          "@media screen and (max-width:300px)": {
            width: "90%",
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
            color: mine ? "#47ff9b" : stringToColor(sender?.name),
            textShadow: "0px 0px 0px",
          }}
        >
          {" "}
          {sender?.name} {isPrivate ? " (private)" : null}
        </Box>

        {content}
        <Box sx={{ fontSize: "11px", textAlign: "right", margin: "0px" }}>
          {new Date(date).toDateString() + " "}
          {new Date(date).toLocaleTimeString()}
        </Box>
      </TypographyMUI>
    </StyledMessages>
  );
}

export default Messages;

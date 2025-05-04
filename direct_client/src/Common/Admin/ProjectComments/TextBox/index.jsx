import { Box } from "@mui/material";
import Messages from "./Messages";

function TextBox({ comments = [] }) {
  return (
    <Box
      component={"div"}
      sx={{
        overflow: "auto",
        scrollbarWidth: "none", // For Firefox
        "&::-webkit-scrollbar": {
          display: "none", // For Chrome, Safari, and Edge
        },
        height: "100%",
      }}
      display={"flex"}
      flexDirection={"column-reverse"}
      gap={2}
    >
      {comments?.map((comment, index) => {
        return <Messages key={index} mine={true} comment={comment} />;
      })}
    </Box>
  );
}

export default TextBox;

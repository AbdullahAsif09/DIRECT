import { ListItemText } from "@mui/material";

export const GetTextItem = ({ text }) => {
  return (
    <ListItemText
      sx={{
        color: "#9e9e9e",
      }}
      primaryTypographyProps={{
        fontSize: 16,
        fontWeight: "medium",
      }}
      primary={text}
    />
  );
};

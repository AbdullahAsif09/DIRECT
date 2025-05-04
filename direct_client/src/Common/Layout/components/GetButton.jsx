import { ListItemButton, ListItemIcon } from "@mui/material";
import { GetTextItem } from "./GetTextItem";

export const GetButton = ({ icon, title }) => {
  return (
    <ListItemButton sx={{ pl: 4 }}>
      <ListItemIcon>{icon}</ListItemIcon>
      <GetTextItem text={title} />
    </ListItemButton>
  );
};

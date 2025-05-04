import { Collapse, List, ListItemButton } from "@mui/material";

function ListsMui({ disablePadding }) {
  return (
    <>
      <List component="div" disablePadding={disablePadding}>
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText primary="Starred" />
        </ListItemButton>
      </List>
    </>
  );
}

export default ListsMui;

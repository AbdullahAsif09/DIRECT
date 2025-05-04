import { DrawerHeader } from "./styled";
import { IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export const SideBarIcon = ({ open, handleDrawerClose, handleDrawerOpen }) => {
  return (
    <DrawerHeader>
      {open ? (
        <IconButton sx={{ color: "white" }} onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      ) : (
        <IconButton
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            color: "white",
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      )}
    </DrawerHeader>
  );
};

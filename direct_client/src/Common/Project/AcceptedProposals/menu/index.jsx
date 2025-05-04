import { IconButton, Menu, MenuItem, Box } from "@mui/material";
import { useState } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useNavigate } from "react-router-dom";
import { useUtils } from "../utils";

export function OptionsMenu() {
  const { redirectUrl } = useUtils();

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    navigate(`/${redirectUrl}/project-detail`);
  };
  return (
    <Box width={"100%"} textAlign={"right"}>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <VisibilityIcon sx={{ fontSize: "18px", marginRight: "4px" }} />
          View
        </MenuItem>
      </Menu>
    </Box>
  );
}

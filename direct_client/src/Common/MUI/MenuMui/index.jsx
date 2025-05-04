import { Menu, MenuItem } from "@mui/material";

function MenuMui({
  handleMenuItemClick,
  handleClose,
  currentPage,
  itemsArray,
  anchorEl,
  open,
  ...rest
}) {
  return (
    <div>
      <Menu
        {...rest}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {itemsArray.map((item, key) => (
          <MenuItem
            key={key}
            onClick={() => {
              handleClose();
              handleMenuItemClick(item);
            }}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default MenuMui;

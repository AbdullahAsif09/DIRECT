import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import TypographyMUI from "@common/MUI/TypographyMUI";
import { MoreVert } from "@mui/icons-material";

export const useGetColumn = (handleAPI, value) => {
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
      flex: 3,

      editable: true,
    },
    {
      field: "type",
      headerName: "User Type",
      width: 110,
      editable: true,
      flex: 2,
    },
    {
      field: "status",
      headerName: "Status",

      sortable: false,
      width: 160,
      flex: 2,

      valueGetter: (params) => {
        return params.row.status;
      },
    },
    {
      field: "options",
      headerName: "Options",
      align: "center",
      width: 120,
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => (
        <DropdownCell params={params} handleAPI={handleAPI} value={value} />
      ),
    },
  ];

  return columns;
};

const DropdownCell = ({ handleAPI = () => {}, value, params }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    handleAPI(e.target.ariaCurrent, params);
  };

  return (
    <>
      <TypographyMUI
        style={{ cursor: "pointer" }}
        paddingRight={3}
        noWrap
        variant="body1"
        onClick={handleClick}
      >
        <MoreVert />
      </TypographyMUI>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClick={handleClose}
      >
        {value == 0
          ? [
              <MenuItem aria-current="remove" key={"remove"}>
                Remvoe User
              </MenuItem>,
              <MenuItem aria-current="ban" key={"ban"}>
                Ban Use from all groups
              </MenuItem>,
            ]
          : [
              <MenuItem aria-current="accept" key={"accept"}>
                Accept request
              </MenuItem>,
              <MenuItem aria-current="reject" key={"reject"}>
                Reject Request
              </MenuItem>,
            ]}
      </Menu>
    </>
  );
};

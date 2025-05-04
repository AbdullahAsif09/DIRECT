import { Tooltip, Fade, Menu, MenuItem, Stack, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "@store/Features/AlertSlice";
import TypographyMUI from "@common/MUI/TypographyMUI";
import React, { useEffect, useState } from "react";
import { MoreVert } from "@mui/icons-material";
import ButtonMui from "@common/MUI/ButtonMUI";
import { useAxios } from "@hooks";

function Data() {
  const socket = useSelector((state) => state.socket.socket);
  const dispatch = useDispatch();
  const [AdminData, setAdminData] = useState([]);
  const [IndustryData, setIndustryData] = useState([]);
  const [AcademiaData, setAcademiaData] = useState([]);
  const [FundingAgencyData, setFundingAgencyData] = useState([]);
  const [UserAgencyData, setUserAgencyData] = useState([]);
  const { api } = useAxios("admin/getAllAdmins");

  const handleAssignReviewer = async (userData) => {
    try {
      const data = await api({
        url: "roles/assignResearcher",
        method: "post",
        object: userData,
      });

      if (data?.result) {
        dispatch(
          setAlert({ status: "success", text: "promoted to researcher" })
        );
      }
    } catch (error) {
      dispatch(
        setAlert({ status: "error", text: "couldn't promote to researcher" })
      );
      console.log(error);
    }
  };
  const handleRemoveReviewer = async (userID, userType) => {
    try {
      const data = await api({
        url: "roles/removeResearcher",
        method: "post",
        object: { userID: userID, userType: userType },
      });

      if (data?.result) {
        dispatch(setAlert({ status: "success", text: "Researcher Removed" }));
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setAlert({ status: "error", text: "couldn't remove researcher" })
      );
    }
  };
  const handleAdminRoleChange = async (updatedData) => {
    setAdminData((prevState) =>
      prevState.map((item) =>
        item?._id === updatedData?._id
          ? { ...item, Role: updatedData?.Role }
          : item
      )
    );
  };
  const handleAcademiaRoleChange = async (updatedData) => {
    setAcademiaData((prevState) =>
      prevState.map((item) =>
        item?._id === updatedData?._id
          ? { ...item, Role: updatedData?.Role }
          : item
      )
    );
  };

  const handleIndustryRoleChange = async (updatedData) => {
    setIndustryData((prevState) =>
      prevState.map((item) =>
        item?._id === updatedData?._id
          ? { ...item, Role: updatedData?.Role }
          : item
      )
    );
  };
  const handleFundingAgencyRoleChange = async (updatedData) => {
    setFundingAgencyData((prevState) =>
      prevState.map((item) =>
        item?._id === updatedData?._id
          ? { ...item, Role: updatedData?.Role }
          : item
      )
    );
  };
  const handleUserAgencyRoleChange = async (updatedData) => {
    setUserAgencyData((prevState) =>
      prevState.map((item) =>
        item?._id === updatedData?._id
          ? { ...item, Role: updatedData?.Role }
          : item
      )
    );
  };

  const fetchAdmins = async () => {
    try {
      const data = await api({ url: "admin/getAllAdmins", method: "get" });
      setAdminData(data?.result);
    } catch (error) {
      setAdminData([]);
    }
  };
  useEffect(() => {
    socket?.on("emitStreamAdminRoleChange", handleAdminRoleChange);
    socket?.on("emiStreamtAcademiaRoleChange", handleAcademiaRoleChange);
    socket?.on("emitStreamIndustryRoleChange", handleIndustryRoleChange);
    socket?.on("emitStreamUserAgencyRoleChange", handleUserAgencyRoleChange);
    socket?.on(
      "emitStreamFundingAgencyRoleChange",
      handleFundingAgencyRoleChange
    );

    const fetchIndustry = async () => {
      try {
        const data = await api({ url: "industry/getAllUsers", method: "get" });
        const mapped = data?.result.map(({ user = {}, ...rest }) => ({
          ...user?.account,
          ...rest,
        }));

        setIndustryData(mapped ?? []);
      } catch (error) {
        setIndustryData([]);
      }
    };
    const fetchAcademia = async () => {
      try {
        const data = await api({ url: "academia/getAllUsers", method: "get" });
        const mapped = data?.result.map(({ user = {}, ...rest }) => ({
          ...user?.account,
          ...rest,
        }));

        setAcademiaData(mapped ?? []);
      } catch (error) {
        setAcademiaData([]);
      }
    };
    const fetchFundingAgency = async () => {
      try {
        const data = await api({
          url: "fundingAgency/getAllUsers",
          method: "get",
        });
        setFundingAgencyData(data?.result);
      } catch (error) {
        setFundingAgencyData([]);
      }
    };
    const fetchUserAgency = async () => {
      try {
        const data = await api({
          url: "userAgency/getAllUsers",
          method: "get",
        });
        setUserAgencyData(data?.result ?? []);
      } catch (error) {
        setUserAgencyData([]);
      }
    };

    fetchAdmins();
    fetchIndustry();
    fetchAcademia();
    fetchUserAgency();
    fetchFundingAgency();
    return () => {
      socket?.off("emitStreamAdminRoleChange", handleAdminRoleChange);
      socket?.off("emitStreamAcademiaRoleChange", handleAcademiaRoleChange);
      socket?.off("emitStreamIndustryRoleChange", handleIndustryRoleChange);
      socket?.off("emitStreamUserAgencyRoleChange", handleUserAgencyRoleChange);
      socket?.off(
        "emitStreamFundingAgencyRoleChange",
        handleFundingAgencyRoleChange
      );
    };
  }, []);
  const columnsUsers = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Names",
      width: 450,

      renderCell: (params) => (
        <Tooltip
          sx={{ cursor: "pointer" }}
          title={params.row?.name}
          placement="bottom-start"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 400 }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt="Remy Sharp" />
            <TypographyMUI
              fontWeight="bold"
              paddingRight={3}
              noWrap
              variant="body1"
            >
              {params?.row?.name ??
                params.row?.firstName + " " + params.row?.lastName}
            </TypographyMUI>
          </Stack>
        </Tooltip>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 450,

      renderCell: (params) => (
        <Tooltip
          sx={{ cursor: "pointer" }}
          title={params.row.email}
          placement="bottom-start"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 400 }}
        >
          <>
            <TypographyMUI paddingRight={3} noWrap variant="body1">
              {params.row.email}
            </TypographyMUI>
          </>
        </Tooltip>
      ),
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 300,

      renderCell: (params) => (
        <Tooltip
          sx={{ cursor: "pointer" }}
          title={params.row.phone}
          placement="bottom-start"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 400 }}
        >
          <>
            <TypographyMUI paddingRight={3} noWrap variant="body1">
              {params.row.phone}
            </TypographyMUI>
          </>
        </Tooltip>
      ),
    },
    {
      field: "Role",
      headerName: "Role",
      width: 300,

      renderCell: (params) =>
        params.row?.Role ? (
          <>
            <ButtonMui
              onClick={() =>
                handleRemoveReviewer(params.row?._id, params.row?.type)
              }
              sx={{ backgroundColor: "red" }}
              variant={"outlined"}
            >
              Remove Researcher
            </ButtonMui>
          </>
        ) : (
          <ButtonMui
            onClick={() => handleAssignReviewer(params.row)}
            variant={"outlined"}
          >
            Make Researcher
          </ButtonMui>
        ),
    },
    {
      field: "options",
      headerName: "Options",
      width: 150,
      renderCell: (params) => <DropdownCell params={params} />,
    },
  ];
  const columnsAgency = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Names",
      width: 450,

      renderCell: (params) => (
        <Tooltip
          sx={{ cursor: "pointer" }}
          title={params.row?.name}
          placement="bottom-start"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 400 }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt="Remy Sharp" />
            <TypographyMUI
              fontWeight="bold"
              paddingRight={3}
              noWrap
              variant="body1"
            >
              {params.row?.name}
            </TypographyMUI>
          </Stack>
        </Tooltip>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 450,

      renderCell: (params) => (
        <Tooltip
          sx={{ cursor: "pointer" }}
          title={params.row.email}
          placement="bottom-start"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 400 }}
        >
          <>
            <TypographyMUI paddingRight={3} noWrap variant="body1">
              {params.row.email}
            </TypographyMUI>
          </>
        </Tooltip>
      ),
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 300,

      renderCell: (params) => (
        <Tooltip
          sx={{ cursor: "pointer" }}
          title={params.row.phone}
          placement="bottom-start"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 400 }}
        >
          <>
            <TypographyMUI paddingRight={3} noWrap variant="body1">
              {params.row.phone}
            </TypographyMUI>
          </>
        </Tooltip>
      ),
    },
    {
      field: "Role",
      headerName: "Role",
      width: 300,

      renderCell: (params) =>
        params.row?.Role ? (
          <ButtonMui
            onClick={() =>
              handleRemoveReviewer(params.row?._id, params.row?.type)
            }
            sx={{ backgroundColor: "red" }}
            variant={"outlined"}
          >
            Remove Researcher
          </ButtonMui>
        ) : (
          <ButtonMui
            onClick={() => handleAssignReviewer(params.row)}
            variant={"outlined"}
          >
            Make Researcher
          </ButtonMui>
        ),
    },
    {
      field: "options",
      headerName: "Options",
      width: 150,
      renderCell: (params) => <DropdownCell params={params} />,
    },
  ];
  const columnsAdmin = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Names",
      width: 450,

      renderCell: (params) => (
        <Tooltip
          sx={{ cursor: "pointer" }}
          title={params.row?.name}
          placement="bottom-start"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 400 }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt="Remy Sharp" />
            <TypographyMUI
              fontWeight="bold"
              paddingRight={3}
              noWrap
              variant="body1"
            >
              {params.row?.firstName + " " + params.row?.lastName}
            </TypographyMUI>
          </Stack>
        </Tooltip>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 450,

      renderCell: (params) => (
        <Tooltip
          sx={{ cursor: "pointer" }}
          title={params.row.email}
          placement="bottom-start"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 400 }}
        >
          <>
            <TypographyMUI paddingRight={3} noWrap variant="body1">
              {params.row.email}
            </TypographyMUI>
          </>
        </Tooltip>
      ),
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 300,

      renderCell: (params) => (
        <Tooltip
          sx={{ cursor: "pointer" }}
          title={params.row.phone}
          placement="bottom-start"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 400 }}
        >
          <>
            <TypographyMUI paddingRight={3} noWrap variant="body1">
              {params.row.phone}
            </TypographyMUI>
          </>
        </Tooltip>
      ),
    },
    {
      field: "Role",
      headerName: "Role",
      width: 300,

      renderCell: (params) =>
        params.row?.Role ? (
          <ButtonMui
            onClick={() => handleRemoveReviewer(params.row?._id, "admin")}
            sx={{ backgroundColor: "red" }}
            variant={"outlined"}
          >
            Remove Researcher
          </ButtonMui>
        ) : (
          <ButtonMui
            onClick={() => handleAssignReviewer(params.row)}
            variant={"outlined"}
          >
            Make Researcher
          </ButtonMui>
        ),
    },
    {
      field: "options",
      headerName: "Options",
      width: 150,
      renderCell: (params) => <DropdownCell params={params} />,
    },
  ];
  const r_columns = [
    // {
    //   field: "no",
    //   headerName: "No",
    //   width: 150,
    //   align: "center",
    //   headerAlign: "center",
    // },
    {
      field: "name",
      headerName: "Names",
      width: 380,

      renderCell: (params) => (
        <Tooltip
          sx={{ cursor: "pointer" }}
          title={params.row.name}
          placement="bottom-start"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 400 }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt="Remy Sharp" src={"member"} />
            <TypographyMUI
              fontWeight="bold"
              paddingRight={3}
              noWrap
              variant="body1"
            >
              {params.row.name ??
                params?.row?.firstName + " " + params?.row?.lastName}
            </TypographyMUI>
          </Stack>
        </Tooltip>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 450,

      renderCell: (params) => (
        <Tooltip
          sx={{ cursor: "pointer" }}
          title={params.row.email}
          placement="bottom-start"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 400 }}
        >
          <>
            <TypographyMUI paddingRight={3} noWrap variant="body1">
              {params.row.email}
            </TypographyMUI>
          </>
        </Tooltip>
      ),
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 250,

      renderCell: (params) => (
        <Tooltip
          sx={{ cursor: "pointer" }}
          title={params.row.phone}
          placement="bottom-start"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 400 }}
        >
          <>
            <TypographyMUI paddingRight={3} noWrap variant="body1">
              {params.row.phone}
            </TypographyMUI>
          </>
        </Tooltip>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      width: 250,

      renderCell: (params) => {
        return (
          <Tooltip
            sx={{ cursor: "pointer" }}
            title={params.row.role}
            placement="bottom-start"
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 400 }}
          >
            <>
              <TypographyMUI
                paddingRight={3}
                paddingLeft={2}
                noWrap
                variant="body2"
                sx={{
                  borderRadius: "15px",
                  paddingY: "4px",
                  color:
                    params.row.role === "Sub Admin" ? "#FF316A" : "#0DA678",
                  backgroundColor:
                    params.row.role === "Sub Admin" ? "#FFE5EC" : "#CAFBEC",
                }}
              >
                {params.row.role[0]}
              </TypographyMUI>
            </>
          </Tooltip>
        );
      },
    },
    {
      field: "options",
      headerName: "Options",
      width: 120,
      renderCell: (params) => <DropdownCell params={params} />,
    },
  ];
  const r_rows = [
    {
      id: 1,
      no: 1,
      name: "Fahad Ahmed ",
      email: "fahadnishad124@gmail.com",
      phone: "310 115 50 24",
      role: "Admin",
      options: "menu",
    },

    {
      id: 2,
      no: 2,
      name: "Abdullah ",
      email: "abdullah@gmail.com",
      phone: "310 115 50 24",
      role: "Sub Admin",
      options: "menu",
    },
  ];
  return {
    columnsAdmin,
    AdminData,
    AcademiaData,
    columnsUsers,
    IndustryData,
    UserAgencyData,
    FundingAgencyData,
    columnsAgency,
    r_rows,
    r_columns,
    fetchAdmins,
  };
}
const DropdownCell = (params) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>View Profile</MenuItem>
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </>
  );
};
export default Data;

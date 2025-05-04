import React, { useEffect, useState } from "react";
import { Box, Grid, Modal, TextField, Typography, Stack, Button, Avatar } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import DepartmentProjects from "./DepartmentProjects";
import AdminCard from "./AdminCard";
import { keys } from "@config";
import { useAxios } from "@hooks/index";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAlert } from "@store/Features/AlertSlice";

const chartSetting = {
  yAxis: [
    {
      label: "Projects Created",
    },
  ],
  series: [{ dataKey: "count", label: "Projects" }],
  height: 300,
  sx: {},
};
const months = [
  { month: "January", count: 0 },
  { month: "February", count: 0 },
  { month: "March", count: 0 },
  { month: "April", count: 0 },
  { month: "May", count: 0 },
  { month: "June", count: 0 },
  { month: "July", count: 0 },
  { month: "August", count: 0 },
  { month: "September", count: 0 },
  { month: "October", count: 0 },
  { month: "November", count: 0 },
  { month: "December", count: 0 },
];
const Overview = ({
  dataProjects,
  dataDepartment,
  dataDepartmentsProjectsCount,
  dataDepartmentsProjectsGraph,
}) => {
  const { API } = useAxios();
  const { id: departmentID } = useParams();
  const { data: dataDepAdmin } = useAxios(`departments/getDepartmentSuperAdmin?id=${departmentID}`);
  const { data: dataDepExe } = useAxios(
    `departments/getDepartmentExecutiveAdmin?id=${departmentID}`
  );
  const dispatch = useDispatch();
  const [GraphData, setGraphData] = useState(months);
  const [adminDetails, setAdminDetails] = useState({
    name: dataDepAdmin?.result?.name ?? "----",
    email: dataDepAdmin?.result?.email ?? "----",
    phone: dataDepAdmin?.result?.phone ?? "----",
    password: "----",
  });

  const [execDetails, setExecDetails] = useState({
    name: `${dataDepExe?.result?.name}` ?? "----",
    email: dataDepExe?.result?.email ?? "----",
    phone: dataDepExe?.result?.phone ?? "----",
    password: "----",
  });
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });
  const [modalType, setModalType] = useState("");

  const handleOpen = (type) => {
    setModalType(type);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitAdmin = async (e) => {
    e.preventDefault();
    Object.entries(formData).forEach(([key, value]) => {
      if ((!value || value == "" || value.trim()?.length === 0) && key !== "role") {
        return dispatch(
          setAlert({
            status: "error",
            text: `Fill the field ${key} to submit the form`,
          })
        );
      }
    });
    try {
      const res = await API({
        url: `departments/addMember?role=departmentAdmin`,
        method: "post",
        object: { department: departmentID, ...formData },
      });
      if (res?.type === "success") {
        dispatch(
          setAlert({
            status: "success",
            text: "Department admin has been created",
          })
        );
        setAdminDetails(formData);
        return handleClose();
      }
      dispatch(
        setAlert({
          status: "error",
          text: res?.response?.data?.result,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        setAlert({
          status: "error",
          text: error,
        })
      );
    }
  };

  const handleSubmitExec = async (e) => {
    e.preventDefault();
    Object.entries(formData).forEach(([key, value]) => {
      if ((!value || value == "" || value.trim()?.length === 0) && key !== "role") {
        return dispatch(
          setAlert({
            status: "error",
            text: `Fill the field ${key} to submit the form`,
          })
        );
      }
    });
    try {
      const res = await API({
        url: `executive/create`,
        method: "post",
        object: { department: departmentID, ...formData },
      });
      console.log(res, "response of api add memebers");
      if (res?.type === "success") {
        dispatch(
          setAlert({
            status: "success",
            text: "Executive admin has been created",
          })
        );
        setExecDetails(formData);
        return handleClose();
      }
      dispatch(
        setAlert({
          status: "error",
          text: res?.response?.data?.result,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        setAlert({
          status: "error",
          text: error,
        })
      );
    }
  };

  const handleSubmit = (e) => {
    if (modalType === "Department Admin") {
      handleSubmitAdmin(e);
    } else if (modalType === "Executive Admin") {
      handleSubmitExec(e);
    }
  };
  const restructureGraphData = () => {
    dataDepartmentsProjectsGraph?.forEach((element) => {
      const monthIndex = element?._id?.month - 1;
      months[monthIndex].count = element?.count;
    });
    setGraphData(months);
  };
  useEffect(() => {
    restructureGraphData();
  }, [dataDepartmentsProjectsGraph]);
  useEffect(() => {
    setAdminDetails({
      name: dataDepAdmin?.result?.name ?? "----",
      email: dataDepAdmin?.result?.email ?? "----",
      phone: dataDepAdmin?.result?.phone ?? "----",
      password: "----",
    });
  }, [dataDepAdmin]);
  useEffect(() => {
    setExecDetails({
      name: dataDepExe?.result?.name ?? "----",
      email: dataDepExe?.result?.email ?? "----",
      phone: dataDepExe?.result?.phone ?? "----",
      password: "----",
    });
  }, [dataDepExe]);

  return (
    <Grid container marginTop={2} gap={2} paddingY={2}>
      <Grid item xs={12}>
        <Box
          sx={{
            width: "100%",
            borderRadius: "16px",
            overflow: "hidden",
            bgcolor: "whitesmoke",
            position: "relative",
          }}
        >
          <Box>
            <Box
              sx={{
                width: "100%",
                height: 160,
                bgcolor: "#d0e2f4",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
                "@media screen and (max-width: 992px)": {
                  height: 100,
                },
              }}
            />
            <Avatar
              src={keys?.rootserver + dataDepartment?.image?.[0]}
              sx={{
                width: 120,
                height: 120,
                borderRadius: "10px",
                border: "4px solid white",
                position: "absolute",
                top: "34%",
                left: "7%",
                transform: "translateX(-50%)",
                zIndex: 10,
                "@media screen and (max-width: 992px)": {
                  width: 90,
                  height: 90,
                  left: "60px",
                  top: "20%",
                },
              }}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              padding: 2,
              paddingTop: 2,
              display: "flex",
              justifyContent: "end",
              bgcolor: "whitesmoke",
              borderBottomLeftRadius: "16px",
              borderBottomRightRadius: "16px",
            }}
          >
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              width={"calc(100% - 120px - 4%)"}
              sx={{
                "@media screen and (max-width: 992px)": {
                  flexDirection: "column",
                  width: "calc(100% - 2.5%)",
                  marginTop: "35px",
                  alignItems: "flex-start",
                  gap: 1,
                },
              }}
              marginRight={1}
            >
              <Stack direction={"row"} alignItems={"center"} gap={2}>
                <Stack>
                  <Typography variant="h3">{dataDepartment?.name}</Typography>
                  <Typography>Function</Typography>
                </Stack>
              </Stack>

              <Stack gap={4} flexWrap={"wrap"} direction={"row"} alignItems={"center"}>
                <Stack>
                  <Typography variant="h4">{adminDetails.name}</Typography>
                  <Typography>Dpt Admin</Typography>
                </Stack>
                <Stack>
                  <Typography variant="h4">{dataDepartmentsProjectsCount ?? 0}</Typography>
                  <Typography>Total Projects</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Grid>

      <AdminCard
        title="Department Admin"
        details={adminDetails}
        handleOpen={() => handleOpen("Department Admin")}
      />
      <AdminCard
        title="Executive Admin"
        details={execDetails}
        handleOpen={() => handleOpen("Executive Admin")}
      />

      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        xl={6}
        sx={{
          borderRadius: "7px",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
        }}
      >
        <BarChart
          dataset={GraphData}
          xAxis={[{ scaleType: "band", dataKey: "month" }]}
          {...chartSetting}
        />
      </Grid>

      <DepartmentProjects dataProjects={dataProjects} />

      {/* Modal for Adding Admin */}
      <Modal open={open} onClose={handleClose}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" mb={2}>
            {modalType === "Department Admin" ? "Add Department Admin" : "Add Executive Admin"}
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </Grid>
  );
};

export default Overview;

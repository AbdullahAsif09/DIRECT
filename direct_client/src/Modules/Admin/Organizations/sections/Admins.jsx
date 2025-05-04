import React, { useEffect, useState } from "react";
import { Box, Paper, Stack, Avatar, Button, TextField, Typography } from "@mui/material";
import { keys } from "@config";
import { useDispatch } from "react-redux";
import { setAlert } from "@store/Features/AlertSlice";
import { useAxios, useGetQueryParam } from "@hooks/index";

const Admins = () => {
  const id = useGetQueryParam("id");
  const { data, api } = useAxios("organizationAdmin/getAdmins?id=" + id);
  const [loading, setLoadnig] = useState(false);

  const result = data?.result;
  const organizationAdmin = result?.organizationAdmin;
  const executiveAdmin = result?.executive;

  const [rows, setRows] = useState([
    {
      role: "Organizer Admin",
      name: "",
      email: "",
      password: "",
      phone: "",
      image: "",
      isEditable: true,
      errors: { name: "", email: "", password: "", phone: "" },
    },
    {
      role: "Executive",
      name: "",
      email: "",
      password: "",
      phone: "",
      image: "",
      isEditable: true,
      errors: { name: "", email: "", password: "", phone: "" },
    },
  ]);

  useEffect(() => {
    if (result) {
      setRows([
        {
          role: "Organizer Admin",
          name: organizationAdmin?.name,
          email: organizationAdmin?.email,
          password: organizationAdmin?.password,
          phone: organizationAdmin?.phone,
          image: keys.rootserver + organizationAdmin?.image,
          isEditable: !organizationAdmin?.name ? true : false,
          errors: { name: "", email: "", password: "", phone: "" },
        },
        {
          role: "Executive",
          name: executiveAdmin?.name,
          email: executiveAdmin?.email,
          password: executiveAdmin?.password,
          phone: executiveAdmin?.phone,
          image: keys.rootserver + executiveAdmin?.image,
          isEditable: executiveAdmin?.name ? false : true,
          errors: { name: "", email: "", password: "", phone: "" },
        },
      ]);
    }
  }, [result]);

  const validateName = (name) => {
    if (!name.trim()) {
      return "Name is required.";
    }
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      return "Email is required.";
    } else if (!emailRegex.test(email)) {
      return "Email is not valid.";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password.trim()) {
      return "Password is required.";
    } else if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return "";
  };
  const validatePhone = (phone) => {
    if (!phone.trim()) {
      return "Phone No is required.";
    }
    if (!/^[0-9]+$/.test(phone)) {
      return "Phone number should only contain numbers.";
    }
    if (phone.length !== 11) {
      return "Invalid phone number.";
    }

    return "";
  };

  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;

    // Validate field
    let error = "";
    if (field === "name") error = validateName(value);
    if (field === "email") error = validateEmail(value);
    if (field === "password") error = validatePassword(value);
    if (field === "phone") error = validatePhone(value);

    newRows[index].errors[field] = error;

    setRows(newRows);
  };
  const dispatch = useDispatch();

  const handleSave = async (index) => {
    const newRows = [...rows];

    // Validate all fields before saving
    const nameError = validateName(newRows[index].name);
    const emailError = validateEmail(newRows[index].email);
    const passwordError = validatePassword(newRows[index].password);
    const phoneError = validatePassword(newRows[index].phone);

    if (nameError || emailError || passwordError || phoneError) {
      newRows[index].errors = {
        name: nameError,
        email: emailError,
        password: passwordError,
        phone: phoneError,
      };
      setRows(newRows);
      return;
    }
    setLoadnig(true);

    newRows[index].isEditable = false;
    setRows(newRows);

    const object = { ...newRows[index] };
    const formData = new FormData();

    delete object.role;
    delete object.errors;
    delete object.isEditable;
    object.organization = id;

    for (const key in object) {
      formData.append(key, object[key]);
    }

    const urls = {
      0: "organizationAdmin/createOrganizerAdmin",
      1: "executive/create",
    };
    const response = await api({
      method: "POST",
      object: formData,
      url: urls[index],
    });
    console.log({ response });

    if (response?.result && typeof response?.result == "string") {
      dispatch(setAlert({ status: response.type, text: response.result }));
    }
    setLoadnig(false);
  };

  const handleEdit = (index) => {
    const newRows = [...rows];
    newRows[index].isEditable = true;
    setRows(newRows);
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    handleChange(index, "image", file);
  };

  return (
    <Stack sx={{ py: 3, mt: 2 }} gap={1} flexDirection={"row"} flexWrap={"wrap"}>
      {rows.map((row, index) => (
        <Paper
          key={index}
          sx={{
            p: 3,
            mb: 3,
            flex: 1,
            minWidth: 400,
            "@media screen and (max-width:900px)": {
              minWidth: "100%",
            },
          }}
        >
          <Typography variant="h3" gutterBottom>
            {row.role}
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                mb: 3,
              }}
            >
              <input
                accept="image/*"
                style={{ display: "none" }}
                id={`upload-button-${index}`}
                type="file"
                onChange={(e) => handleImageChange(index, e)}
                disabled={!row.isEditable}
              />
              <label htmlFor={`upload-button-${index}`}>
                <Box
                  sx={{
                    position: "relative",
                    "&:hover .overlay": {
                      opacity: 1,
                    },
                  }}
                >
                  <Avatar
                    src={
                      typeof row.image == "string" ? row.image : row.image ? URL.createObjectURL(row.image) : undefined
                    }
                    alt={row.name}
                    sx={{ width: 100, height: 100, cursor: "pointer" }}
                  />
                  <Box
                    className="overlay"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      bgcolor: "rgba(0, 0, 0, 0.6)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                      transition: "opacity 0.3s",
                      borderRadius: "50%",
                      cursor: "pointer",
                      textAlign: "center",
                      fontSize: 14,
                      padding: 1,
                      fontWeight: 600,
                    }}
                  >
                    Change Image
                  </Box>
                </Box>
              </label>
            </Box>

            <TextField
              placeholder="Name"
              value={row.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              disabled={!row.isEditable}
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2 }}
              error={Boolean(row.errors.name)}
              helperText={row.errors.name}
            />
            <TextField
              placeholder="Email"
              value={row.email}
              onChange={(e) => handleChange(index, "email", e.target.value)}
              disabled={!row.isEditable}
              variant="outlined"
              size="small"
              type="email"
              fullWidth
              sx={{ mb: 2 }}
              error={Boolean(row.errors.email)}
              helperText={row.errors.email}
            />
            <TextField
              placeholder="Phone"
              value={row.phone}
              onChange={(e) => handleChange(index, "phone", e.target.value)}
              disabled={!row.isEditable}
              variant="outlined"
              size="small"
              type="phone"
              fullWidth
              sx={{ mb: 2 }}
              error={Boolean(row.errors.phone)}
              helperText={row.errors.phone}
            />
            <TextField
              placeholder="Password"
              value={row.password}
              onChange={(e) => handleChange(index, "password", e.target.value)}
              disabled={!row.isEditable}
              variant="outlined"
              size="small"
              type="password"
              fullWidth
              sx={{ mb: 2 }}
              error={Boolean(row.errors.password)}
              helperText={row.errors.password}
            />
            {Boolean(index === 0 ? organizationAdmin : executiveAdmin) ? null : (
              <Box>
                {row.isEditable ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (loading) return;
                      handleSave(index);
                    }}
                    size="small"
                    sx={{ mt: 2 }}
                  >
                    {loading ? "Loading" : "Save"}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleEdit(index)}
                    size="small"
                    sx={{ mt: 2 }}
                  >
                    Edit
                  </Button>
                )}
              </Box>
            )}
          </Box>
        </Paper>
      ))}
    </Stack>
  );
};

export default Admins;

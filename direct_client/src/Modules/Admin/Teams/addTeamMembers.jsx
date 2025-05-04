import styled from "@emotion/styled";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import React, { useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useAxios } from "@hooks/index";
import { useDispatch } from "react-redux";
import { setAlert } from "@store/Features/AlertSlice";
import { Spinner } from "@common/UI";

const CustomTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#0DA678",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#0DA678",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#0DA678",
    },
    "&:hover fieldset": {
      borderColor: "#0DA678",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0DA678",
    },
  },
});
const CustomButton = styled(Button)({
  color: "#0DA678",
  borderColor: "#0DA678",
  "&:hover": {
    backgroundColor: "#0DA678",
    color: "#FFF",
  },
});
const AddButton = styled(Button)({
  backgroundColor: "#0DA678",
  color: "#ffff",
  padding: "10px 20px",
  "&:hover": {
    backgroundColor: "#055A43",
  },
});
const AddTeamMembers = ({ fetchAdmins }) => {
  const ref = useRef();
  const { api } = useAxios();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    /* read all inputs from ref.current */
    const inputs = Array.from(ref.current.elements).filter((input) => input);
    const objectToSend = {};
    inputs.forEach((input) => {
      objectToSend[input.name] = input.value;
    });

    if (!objectToSend.firstName || !objectToSend.lastName) {
      return dispatch(
        setAlert({
          status: "error",
          text: "Please fill the first and last name fields.",
        })
      );
    } else if (!objectToSend.email) {
      return dispatch(
        setAlert({
          status: "error",
          text: "Please fill the email field.",
        })
      );
    } else if (
      !objectToSend.password ||
      objectToSend.password !== objectToSend.confirmpassword
    ) {
      console.log(objectToSend.password, objectToSend.confirmpassword);

      return dispatch(
        setAlert({
          status: "error",
          text: "Incorrect password or password confirmation does not match.",
        })
      );
    }
    delete objectToSend.confirmpassword;
    setLoading(true);
    api({
      url: "admin/createSubAdmin",
      object: objectToSend,
      method: "POST",
    })
      .then(async (e) => {
        if (e.type == "success") {
          await fetchAdmins();
          dispatch(
            setAlert({ status: "success", text: "Member added successfully." })
          );
        } else
          dispatch(
            setAlert({
              status: "error",
              text: e.result,
            })
          );
        setLoading(false);
      })
      .catch((e) => {
        dispatch(
          setAlert({
            status: "error",
            text: e.message ?? e?.result ?? "Failed to add member.",
          })
        );
        setLoading(false);
      });

    // Handle your form submission logic here
  };
  return (
    <Grid item>
      <Spinner isLoading={loading} />
      <AddButton startIcon={<AddIcon />} onClick={() => setOpen(true)}>
        Add New Member
      </AddButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        sx={{ opacity: loading ? 0 : 1 }}
      >
        <DialogTitle variant="h4">Add New Member</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit} ref={ref}>
            <CustomTextField
              autoFocus
              margin="dense"
              label="firstName"
              name="firstName"
              type="text"
              fullWidth
              variant="standard"
            />
            <CustomTextField
              autoFocus
              margin="dense"
              label="lastName"
              name="lastName"
              type="text"
              fullWidth
              variant="standard"
            />
            <CustomTextField
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
            <CustomTextField
              margin="dense"
              id="phone"
              label="Phone Number"
              name="phone"
              type="tel"
              fullWidth
              variant="standard"
            />
            <CustomTextField
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
            />
            <CustomTextField
              margin="dense"
              id="confirm-password"
              label="ConfirmPassword"
              name="confirmpassword"
              type="password"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={() => setOpen(false)}>Cancel</CustomButton>
          <CustomButton type="submit" onClick={handleFormSubmit}>
            Add
          </CustomButton>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default AddTeamMembers;

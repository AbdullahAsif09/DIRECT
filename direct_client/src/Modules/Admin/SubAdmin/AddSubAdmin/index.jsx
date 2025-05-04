import { forwardRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
  Zoom,
} from "@mui/material";
import IconsHeadings from "@common/AnimationMui/IconHeadings";
import { AdminPanelSettings } from "@mui/icons-material";
import InputFields from "@common/InputFields/InputFields";
const Transition = forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});
function AddSubAdmin({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <IconsHeadings
            text={"Create Subadmin"}
            icons={<AdminPanelSettings sx={{ color: "#252B42" }} />}
          />
        </DialogTitle>
        <DialogContent sx={{ width: "100%" }}>
          {/* <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText> */}
          <Grid container gap={2} sx={{ mt: 2, width: "100%" }}>
            <Grid item xs={12}>
              <InputFields
                type={"email"}
                label={"Email"}
                placeholder={"Write email"}
              />
            </Grid>
            <Grid item xs={12}>
              <InputFields
                type={"text"}
                label={"Username"}
                placeholder={"Write username"}
              />
            </Grid>
            <Grid item xs={12}>
              <InputFields
                type={"phone"}
                label={"Phone Number"}
                placeholder={"Write number"}
              />
            </Grid>
            <Grid item xs={12}>
              <InputFields
                type={"password"}
                label={"Password"}
                placeholder={"Write password"}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#ff7675" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button color="success" onClick={handleClose}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddSubAdmin;

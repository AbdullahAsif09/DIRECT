import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "@store/Features/AlertSlice";

function Alerts() {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  return (
    <Snackbar
      open={alert?.status === "success" || alert?.status === "error"}
      autoHideDuration={6000}
      onClose={() => {
        dispatch(setAlert({ status: "", text: "" }));
      }}
    >
      {alert?.status === "success" || alert?.status === "error" ? (
        <Alert severity={alert?.status} sx={{ width: "100%" }}>
          {alert?.text}
        </Alert>
      ) : null}
    </Snackbar>
  );
}

export default Alerts;

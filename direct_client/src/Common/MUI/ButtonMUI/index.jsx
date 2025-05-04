import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";

function ButtonMui({ variant, fullWidth, children, ...rest }) {
  return (
    <LoadingButton  {...rest} variant={variant} fullWidth={fullWidth}>
      {children}
    </LoadingButton>
  );
}

export default ButtonMui;

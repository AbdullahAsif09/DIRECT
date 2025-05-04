import { Stack } from "@mui/material";
import { LogoWrapper } from "../Logo";

const LoginComponentImage = () => {
  return (
    <Stack direction={"column"} className="container">
      <LogoWrapper width={"220px"} height={"220"} />
      <h1 style={{ fontSize: "1.4rem", maxWidth: "85%" }}>
        Development, Innovation, and Research for Evolving Cutting-edge
        Technologies
      </h1>
    </Stack>
  );
};

export default LoginComponentImage;

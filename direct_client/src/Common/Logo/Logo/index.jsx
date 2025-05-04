import { useNavigate } from "react-router-dom";

export const LogoWrapper = ({
  height = null,
  width = null,
  style = {},
  noRedirect,
  ...rest
}) => {
  const navigate = useNavigate();
  return (
    <img
      onClick={() => {
        if (!noRedirect) {
          navigate("/");
        }
      }}
      src={"/assets/logo.png"}
      alt="DIRECT LOGO"
      style={{ height, width, cursor: "pointer", ...style }}
      {...rest}
    />
  );
};

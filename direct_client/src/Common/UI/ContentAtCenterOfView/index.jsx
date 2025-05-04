import { Stack, Typography, styled } from "@mui/material";
import BackButton from "../../BackButton";

const Wrapper = styled(Stack)(({ theme }) => {
  return {
    height: "90vh",
  };
});

export const ErrorContentAtCenterOfView = ({
  message = "Resource Not Found!",
  code = 404,
  showError = true,
}) => {
  return (
    <Wrapper alignItems={"center"} justifyContent={"center"} gap={2}>
      <Typography
        variant="h3"
        textAlign={"center"}
        textTransform={"capitalize"}
      >
        {showError && "Error"}
        {code ? ` ${code}` : ""}
        {message ? ` | ${message}` : ""}
      </Typography>
      <BackButton message={message} />
    </Wrapper>
  );
};
export const ContentAtCenterOfView = ({ message, code }) => {
  return (
    <Wrapper alignItems={"center"} justifyContent={"center"} gap={2}>
      <Typography
        variant="h3"
        textAlign={"center"}
        textTransform={"capitalize"}
      >
        {code ? ` ${code}` : ""}
        {message ? ` | ${message}` : ""}
      </Typography>
    </Wrapper>
  );
};
export const Error = ({ error }) => {
  const response = error?.response;
  const code = response?.status || "";
  const message = response?.data?.message || response?.data?.result || "";

  return (
    <Wrapper alignItems="center" justifyContent="center" gap={2}>
      <Typography variant="h3" textAlign="center" textTransform="capitalize">
        {code && `${code}`}
        {message && ` | ${message}`}
      </Typography>
      {code == 401 ? <BackButton message={message} /> : null}
    </Wrapper>
  );
};

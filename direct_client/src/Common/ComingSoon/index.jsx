import { Stack, Typography, styled } from "@mui/material";

const ComingSoon = () => {
  const Wrapper = styled(Stack)(({ theme }) => {
    return {
      height: "600px",
      [theme.breakpoints.down("md")]: {
        height: 450,
      },
    };
  });
  return (
    <Wrapper alignItems={"center"} justifyContent={"center"} gap={2}>
      {/* <LogoWrapper invert={true} /> */}
      <Typography variant="h2" textAlign={"center"} textTransform={"uppercase"}>
        Comming Soon!
      </Typography>
    </Wrapper>
  );
};

export default ComingSoon;

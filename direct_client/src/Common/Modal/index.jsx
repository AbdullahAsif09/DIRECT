import { Box, Modal, Paper, Stack, Typography, styled } from "@mui/material";

export default function KeepMountedModal({ open, handleClose }) {
  return (
    <Modal
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
      open={open}
      onClose={handleClose}
      keepMounted={false}
      sx={{
        border: "none",
        outline: "none",
        "&:focus": {
          outline: "none",
          border: "none",
        },
      }}
    >
      <StyledModalContent elevation={5}>
        <Top>
          <Stack justifyContent={"center"}>
            <Box
              sx={{
                "& img": {
                  width: "80% !important",
                  // objectFit:"cover !important ",
                  margin: "auto",
                  display: "block",
                },
                filter: "drop-shadow(1.8px 1.8px 1.8px #262626)",
              }}
            >
              {open?.img}
            </Box>
          </Stack>
          <Typography
            variant="h3"
            marginTop={"1rem"}
            style={{
              textAlign: "center",
              color: "white",
            }}
          >
            {/* {open?.name} */}
          </Typography>
        </Top>
        <Bottom>
          <Stack direction={"row"}>
            <Typography
              flex={1}
              fontWeight={"600"}
              variant="h5"
              marginTop={"1.5rem"}
              noWrap
            >
              Industry
            </Typography>
            <Typography flex={1} variant="p" marginTop={"1.5rem"} noWrap>
              Tech
            </Typography>
          </Stack>
          <Stack direction={"row"}>
            <Typography
              flex={1}
              fontWeight={"600"}
              variant="h5"
              marginTop={"1.5rem"}
              noWrap
            >
              Company Size
            </Typography>
            <Typography flex={1} variant="p" marginTop={"1.5rem"} noWrap>
              {open.size}
            </Typography>
          </Stack>
          <Stack direction={"row"}>
            <Typography
              flex={1}
              fontWeight={"600"}
              variant="h5"
              marginTop={"1.5rem"}
              noWrap
            >
              Working Policy
            </Typography>
            <Typography flex={1} variant="p" marginTop={"1.5rem"} noWrap>
              {open.policy}
            </Typography>
          </Stack>
          <Stack direction={"row"}>
            <Typography
              flex={1}
              fontWeight={"600"}
              variant="h5"
              marginTop={"1.5rem"}
              noWrap
            >
              Get in touch{" "}
            </Typography>
            <Typography flex={1} variant="p" marginTop={"1.5rem"} noWrap>
              {open.link}
            </Typography>
          </Stack>
        </Bottom>
      </StyledModalContent>
    </Modal>
  );
}

const StyledModalContent = styled(Paper)(({ theme }) => {
  return {
    color: "black",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    background: "white",
    width: "400px",
    minHeight: "450px",
    maxWidth: "95%",
    border: "none",
    borderRadius: "10px",
    outline: "none",

    "&:focus": {
      border: "none !important",
    },
    // overflow: "hidden",
    animation: "show .34s linear forwards",
    "@keyframes show": {
      "0%": {
        opacity: 0,
        transform: "translate(-50%,-50%) scale(0)",
      },
      "30%": {
        // opacity: 1,
        // transform: "translate(-50%,-50%) scale(1.15)",
      },
      "60%": {
        opacity: 1,
        transform: "translate(-50%,-50%) scale(1)",
      },
      "80%": {
        opacity: 1,
        // transform: "translate(-50%,-50%) scale(1.04)",
      },

      "100%": {
        opacity: 1,
        transform: "translate(-50%,-50%) scale(1)",
      },
    },
  };
});
const Top = styled("div")(({ theme }) => {
  return {
    background: "#dddddd",
    padding: "2rem 2rem 4rem 2rem",
    color: "white",
    position: "relative",
    border: "none",
    zIndex: 1,
    boxShadow: "none",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    "&:focus": {
      border: "none",
      zIndex: 1,
      boxShadow: "none",
    },
    "&::after": {
      position: "absolute",
      content: "''",
      width: "90%",
      height: "50px",
      background: "white",
      left: "50%",
      bottom: "0",

      left: "50%",
      bottom: 0,
      // borderRadius: "40px",
      //
      transform: "translateX(-50%)",
      bottom: "-30px",
      zIndex: 1,
      borderTopLeftRadius: "45px",
      borderTopRightRadius: "45px",
    },
  };
});
const Bottom = styled("div")(({ theme }) => {
  return {
    padding: "2rem",
    color: "black",
    position: "relative",
    border: "none",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    animationDelay: ".5s",
  };
});

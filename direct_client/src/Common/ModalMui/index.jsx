import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";

function ModalMui({
  top,
  left,
  width,
  height,
  content,
  openModalMui,
  handleCloseModalMui,
}) {
  const style = {
    position: "absolute",
    top: top ? top : "50%",
    left: left ? left : "50%",
    transform: "translate(-50%, -50%)",
    width: width ? `min(${width}, 1200px)` : 600,
    height: height ? height : "auto",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "7px",
    marginBottom: 4,

    "@media screen and (max-width:600px)": {
      p: 1.5,
    },
  };
  return (
    <Modal
      keepMounted
      open={openModalMui}
      onClose={handleCloseModalMui}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 200,
        },
      }}
    >
      <Box sx={style}>{content}</Box>
    </Modal>
  );
}

export default ModalMui;

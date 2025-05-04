import {
  Avatar,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import ModalMui from "@common/ModalMui";
import { Delete, Publish } from "@mui/icons-material";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useAxios } from "@hooks";

const GridFlexItem = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: ".5rem",
}));
const GridBtn = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
}));
const TypographyMui = styled(Typography)(({ theme }) => ({
  display: "block",
}));
const Pstyled = styled(Typography)(({ theme }) => ({
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 3,
  // lineHeight: 1.6,
  fontWeight: "400",
}));
const extractTextContent = (htmlString) => {
  // Create a temporary div element to parse the HTML string
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;

  // Select all <p> elements
  const paragraphs = tempDiv.querySelectorAll("p");

  // Extract text content from <p> elements
  const textContents = Array.from(paragraphs).map((p) => p.textContent.trim());

  return textContents[0];
};
function CardMui({ cardData, handleDeleteProject }) {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const paragraphs = extractTextContent(cardData.description);
  return (
    <Card sx={{ p: 2, maxWidth: "100%" }} elevation={4}>
      <Grid container gap={2}>
        <GridFlexItem item xs={12}>
          <Avatar variant="square" sx={{ borderRadius: "10px" }} />
          <TypographyMui
            noWrap
            maxWidth={"70%"}
            textOverflow={"ellipsis"}
            fontWeight={600}
            variant="h3"
          >
            {cardData?.title}
          </TypographyMui>
          {/* <IconButton sx={{ marginLeft: "auto" }}>
            <Edit />
          </IconButton> */}
        </GridFlexItem>
        <Grid item xs={12}>
          <Pstyled variant="body1">{paragraphs}</Pstyled>
        </Grid>
        <GridBtn item xs={12}>
          <Button
            onClick={handleOpenModal}
            startIcon={<Publish />}
            color="success"
            variant="contained"
          >
            Edit & Publish
          </Button>
          <Button
            startIcon={<Delete />}
            color="error"
            variant="outlined"
            onClick={() => handleDeleteProject(cardData?._id)}
          >
            Delete
          </Button>
        </GridBtn>
      </Grid>
      {openModal && (
        <ModalMui
          top={"45%"}
          left={"50%"}
          width={"60vw"}
          openModalMui={openModal}
          handleCloseModalMui={handleCloseModal}
          content={
            <ModalContent
              id={cardData?._id}
              handleCloseModal={handleCloseModal}
            />
          }
        />
      )}
    </Card>
  );
}

export default CardMui;

const ModalContent = ({ handleCloseModal, id }) => {
  const navigate = useNavigate();
  const { api } = useAxios();
  const updateProjectDraft = async (classifiedValue) => {
    try {
      const data = await api({
        url: `projects/updateProjectDraft?id=${id}&classifiedValue=${classifiedValue}`,
        method: "PUT",
      });
      if (data?.type === "success") {
        /* project updated */
      }
    } catch (error) {
      console.log(`(error) => ${error}`);
    }
  };
  return (
    <Grid sx={{ overflow: "auto", height: "100%" }} container gap={2}>
      <Grid item sx={{ mb: 1 }} xs={12}>
        <Typography variant="h2">Category</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          You want to make this project classified or non classified?
        </Typography>
      </Grid>
      <Grid sx={{ mt: -2, mb: 2 }} item xs={12}>
        <Typography variant="body2">
          Classified means project will be only shared with management team and
          selected researchers and industry collaborator and it will not be
          visible to all the users of the web app. Where as, non-classified
          means project will be share with anyone in the website and it will be
          visible to all the users of the web app.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={() => {
            navigate("/directportal/dashboard/publishrequirements/" + id);
            updateProjectDraft(true);
          }}
          fullWidth
          variant="contained"
        >
          Classified
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Divider textAlign="center">
          <Chip label={"OR"} />
        </Divider>
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate("/directportal/dashboard/publishrequirements/" + id);
            updateProjectDraft(false);
          }}
          fullWidth
          variant="outlined"
        >
          Non-Classified
        </Button>
      </Grid>
      <Grid item sx={{ mt: 2 }} xs={12}>
        <Stack
          gap={1}
          direction={"row"}
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          <Button
            component={motion.div}
            whileTap={{ scale: 0.9 }}
            onClick={handleCloseModal}
            sx={{
              backgroundColor: "bg.slightlyLightRed",
              "&:hover": {
                backgroundColor: "bg.normalRed",
              },
            }}
            variant="contained"
          >
            Cancel
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

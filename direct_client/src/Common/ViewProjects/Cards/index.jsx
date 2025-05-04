import { useState } from "react";
import { Grid } from "@mui/material";
import ModalMui from "@common/ModalMui";
import ProjectCards from "../../CardsMui/ProjectCards";
import ProjectComments from "@common/Admin/ProjectComments";

function Cards({ cardsData, recommended, handleDeleteProject }) {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModalFeedback = (e) => setOpenModal(e);
  const handleCloseModalFeedback = () => setOpenModal(false);
  return (
    <div
      style={{
        width: "100%",
        margin: "auto",
        border: "1px solid white",
      }}
    >
      <Grid container gap={1}>
        {cardsData?.map((e, i) => {
          return (
            <Grid
              sx={{
                transition: "all .3s ease-in-out",
              }}
              key={i}
              item
              xs={12}
              sm={5.86}
              md={5.86}
              lg={3.85}
            >
              <ProjectCards
                handleOpenModalFeedback={handleOpenModalFeedback}
                handleDeleteProject={handleDeleteProject}
                recommended={recommended}
                admin
                data={e}
              />
            </Grid>
          );
        })}
      </Grid>
      {Boolean(openModal) && (
        <ModalMui
          top={"50%"}
          left={"50%"}
          height={"95vh"}
          width={"95vw"}
          content={
            <ProjectComments
              project={openModal}
              handleCloseModalFeedback={handleCloseModalFeedback}
            />
          }
          openModalMui={openModal}
          handleCloseModalMui={handleCloseModalFeedback}
        />
      )}
    </div>
  );
}

export default Cards;

function Model() {
  return <div>index</div>;
}

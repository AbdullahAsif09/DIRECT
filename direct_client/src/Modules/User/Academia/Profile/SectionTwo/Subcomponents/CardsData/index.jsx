import { Edit } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  Fab,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import Details from "./Details";
import { useEffect, useMemo, useState } from "react";

const TextData = styled("div")(({ theme }) => ({}));
function CardsData({
  headingData,
  contentData,
  showMore,
  profile,
  project,
  publicationsArticles,
  conferenceProceedings,
  profileData,
  qualificationSection,
  experienceSection,
  researchArticlesSection,
  industrialProjectsSection,
  researchProjectsSection,
  conferenceSection,
  bookChapSection,
  bookSection,
  editorialSection,
  patentsSection,
  copyRightsSection,
  industrialDesignsSection,
  technologyTransferedSection,
  trainingSection,
  supervisionSection,
}) {
  const [RealContent, setRealContent] = useState(true);
  const changeProfileData = useMemo(() => profileData, [profileData]);
  useEffect(() => {
    const checkObj = () => {
      profileData?.map((e, i) => {
        const areKeysEmpty = Object.values(e).every((value) => !value);
        if (areKeysEmpty) {
          setRealContent(true);
        } else {
          setRealContent(false);
        }
      });
    };
    checkObj();
  }, [changeProfileData]);

  return (
    <Card sx={{ p: 3, width: "98%" }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={2}
      >
        <Typography variant="h3">{headingData}</Typography>
        {/* <Fab size="small" color="success" aria-label="edit">
          <Edit />
        </Fab> */}
      </Stack>
      {RealContent ? (
        <Typography
          textAlign={"center"}
          sx={{ m: 6 }}
          color={"lightgray"}
          variant="h2"
        >
          No Data Found
        </Typography>
      ) : (
        profileData?.map((e, i) => (
          <>
            <Details
              profileData={e}
              qualificationSection={qualificationSection}
              experienceSection={experienceSection}
              researchArticlesSection={researchArticlesSection}
              industrialProjectsSection={industrialProjectsSection}
              researchProjectsSection={researchProjectsSection}
              conferenceSection={conferenceSection}
              patentsSection={patentsSection}
              bookChapSection={bookChapSection}
              bookSection={bookSection}
              editorialSection={editorialSection}
              copyRightsSection={copyRightsSection}
              industrialDesignsSection={industrialDesignsSection}
              technologyTransferedSection={technologyTransferedSection}
              trainingSection={trainingSection}
              supervisionSection={supervisionSection}
              profile={profile}
              project={project}
              publicationsArticles={publicationsArticles}
              conferenceProceedings={conferenceProceedings}
              title={e.university}
              subTitle={e.subtitle}
              dateText={e.date}
              key={i}
            />
          </>
        ))
      )}
      {showMore && (
        <Stack sx={{ mt: 3 }} justifyContent={"center"} alignItems={"center"}>
          <Button sx={{ textTransform: "capitalize" }} variant="ghost">
            Show More
          </Button>
        </Stack>
      )}
    </Card>
  );
}

export default CardsData;

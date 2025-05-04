import { Avatar, Stack, Typography } from "@mui/material";

function Details({
  title,
  subTitle,
  dateText,
  profile,
  publicationsArticles,
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
  return (
    <>
      {qualificationSection && (
        <Stack
          sx={{ mt: 5, pb: 2, borderBottom: "0.5px solid lightGray" }}
          direction={"row"}
          spacing={2}
        >
          <Avatar sx={{ borderRadius: "10px" }}>AB</Avatar>
          <Stack direction={"column"} gap={0.2}>
            <Typography variant="h4">{profileData.university}</Typography>
            <Typography variant="body1">{profileData.degree}</Typography>
            <Stack direction={"row"} gap={1}>
              <Typography variant="body2">{profileData.start}</Typography>
              <span>-</span>
              <Typography variant="body2">{profileData.end}</Typography>
            </Stack>
          </Stack>
        </Stack>
      )}
      {profile && (
        <Stack
          sx={{ mt: 5, pb: 2, borderBottom: "0.5px solid lightGray" }}
          direction={"row"}
          spacing={2}
        >
          <Avatar sx={{ borderRadius: "10px" }}>AB</Avatar>
          <Stack direction={"column"} gap={0.2}>
            <Typography variant="h4">{profileData.university}</Typography>
            <Typography variant="body1">{profileData.degree}</Typography>
            <Stack direction={"row"} gap={1}>
              <Typography variant="body2">{profileData.start}</Typography>
              <span>-</span>
              <Typography variant="body2">{profileData.end}</Typography>
            </Stack>
          </Stack>
        </Stack>
      )}
      {experienceSection && (
        <Stack
          sx={{ mt: 5, pb: 2, borderBottom: "0.5px solid lightGray" }}
          direction={"row"}
          spacing={2}
        >
          <Avatar sx={{ borderRadius: "10px" }}>AB</Avatar>
          <Stack direction={"column"} gap={0.2}>
            <Typography variant="h4">{profileData.university}</Typography>
            <Typography variant="body1">{profileData.post}</Typography>
            <Stack direction={"row"} gap={1}>
              <Typography variant="body2">{profileData.start}</Typography>
              <span>-</span>
              <Typography variant="body2">{profileData.end}</Typography>
            </Stack>
          </Stack>
        </Stack>
      )}
      {researchProjectsSection && (
        <Stack
          sx={{ mt: 3, pb: 2, borderBottom: "0.5px solid lightGray" }}
          direction={"row"}
          spacing={2}
        >
          <Stack direction={"column"} gap={0.5}>
            <Typography variant="h4">{profileData.title}</Typography>
            <Typography
              variant="body1"
              fontSize={"13px"}
              fontWeight={"600"}
              color={"gray"}
            >
              Type: {" " + profileData.type}
            </Typography>
            <Typography variant="body1">
              Sponcer: {" " + profileData.sponcer}
            </Typography>
            <Typography variant="body2">
              Cost: {" " + profileData.cost}
            </Typography>
            <Typography variant="body2">
              Status: {" " + profileData.status}
            </Typography>
          </Stack>
        </Stack>
      )}
      {industrialProjectsSection && (
        <Stack
          sx={{ mt: 3, pb: 2, borderBottom: "0.5px solid lightGray" }}
          direction={"row"}
          spacing={2}
        >
          <Stack direction={"column"} gap={0.5}>
            <Typography variant="h4">{profileData.title}</Typography>
            <Typography
              variant="body1"
              fontSize={"13px"}
              fontWeight={"600"}
              color={"gray"}
            >
              Type: {" " + profileData.type}
            </Typography>
            <Typography variant="body1">
              Sponcer: {" " + profileData.sponcer}
            </Typography>
            <Typography variant="body2">
              Cost: {" " + profileData.cost}
            </Typography>
            <Typography variant="body2">
              Status: {" " + profileData.status}
            </Typography>
          </Stack>
        </Stack>
      )}
      {researchArticlesSection && (
        <Stack
          sx={{ mt: 3, pb: 2, borderBottom: "0.5px solid lightGray" }}
          direction={"row"}
          spacing={2}
        >
          <Stack direction={"column"} gap={0.5}>
            <Typography variant="h4">{profileData.title}</Typography>
            <Typography
              variant="body1"
              fontSize={"13px"}
              fontWeight={"600"}
              color={"gray"}
            >
              Journal: {" " + profileData.journal}
            </Typography>
            <Typography variant="body1">
              Name: {" " + profileData.name}
            </Typography>
            <Typography variant="body2">
              Issue: {" " + profileData.issue}
            </Typography>
            <Typography variant="body2">
              Quarties One: {" " + profileData.quartiesOne}
            </Typography>
            <Typography variant="body2">
              Quarties Two: {" " + profileData.quartiesTwo}
            </Typography>
          </Stack>
        </Stack>
      )}
      {conferenceSection && (
        <Stack
          sx={{ mt: 3, pb: 2, borderBottom: "0.5px solid lightGray" }}
          direction={"row"}
          spacing={2}
        >
          <Stack direction={"column"} gap={0.5}>
            <Typography variant="h4">{profileData.title}</Typography>
            <Typography variant="body1" fontWeight={"600"} color={"gray"}>
              Name: {" " + profileData.name}
            </Typography>
            <Typography variant="body2">
              Conference Title : {" " + profileData.conferenceTitle}
            </Typography>
            <Typography variant="body2">
              Citations: {" " + profileData.citations}
            </Typography>
          </Stack>
        </Stack>
      )}
      {bookChapSection && (
        <Stack
          sx={{ mt: 3, pb: 2, borderBottom: "0.5px solid lightGray" }}
          direction={"row"}
          spacing={2}
        >
          <Stack direction={"column"} gap={0.5}>
            <Typography variant="h4">{profileData.title}</Typography>
            <Typography variant="body1" fontWeight={"600"} color={"gray"}>
              Name: {" " + profileData.name}
            </Typography>
            <Typography variant="body2">
              Publisher : {" " + profileData.publisher}
            </Typography>
            <Typography variant="body2">
              Publish Pages: {" " + profileData.publishedPages}
            </Typography>
          </Stack>
        </Stack>
      )}
      {bookSection && (
        <Stack
          sx={{ mt: 3, pb: 2, borderBottom: "0.5px solid lightGray" }}
          direction={"row"}
          spacing={2}
        >
          <Stack direction={"column"} gap={0.5}>
            <Typography variant="h4">{profileData.title}</Typography>
            <Typography variant="body1" fontWeight={"600"} color={"gray"}>
              Author: {" " + profileData.author}
            </Typography>
            <Typography variant="body2">
              Publisher : {" " + profileData.publisher}
            </Typography>
            <Typography variant="body2">
              Publish Pages: {" " + profileData.publishedPages}
            </Typography>
          </Stack>
        </Stack>
      )}
      {editorialSection && (
        <Stack
          sx={{ mt: 3, pb: 2, borderBottom: "0.5px solid lightGray" }}
          direction={"row"}
          spacing={2}
        >
          <Stack direction={"column"} gap={0.5}>
            <Typography variant="h4">{profileData.name}</Typography>
            <Typography variant="body1" fontWeight={"600"} color={"gray"}>
              Journal IF: {" " + profileData.IF}
            </Typography>
            <Typography variant="body2">
              Paper Type : {" " + profileData.typePaper}
            </Typography>
            <Typography variant="body2">
              Publication Date: {" " + profileData.publicationDate}
            </Typography>
          </Stack>
        </Stack>
      )}
      {patentsSection && (
        <Stack
          sx={{ mt: 3, pb: 2, borderBottom: "0.5px solid lightGray" }}
          direction={"row"}
          spacing={2}
        >
          <Stack direction={"column"} gap={0.5}>
            <Typography variant="h4">{profileData.name}</Typography>
            <Typography variant="body1" fontWeight={"600"} color={"gray"}>
              Inventor Name: {" " + profileData.inventorName}
            </Typography>
            <Typography variant="body2">
              Status : {" " + profileData.status}
            </Typography>
            <Typography variant="body2">
              Type : {" " + profileData.type}
            </Typography>
            <Typography variant="body2">
              Approval Date: {" " + profileData.approvalDate}
            </Typography>
          </Stack>
        </Stack>
      )}
      {copyRightsSection && (
        <Stack
          sx={{ mt: 3, pb: 2, borderBottom: "0.5px solid lightGray" }}
          direction={"row"}
          spacing={2}
        >
          <Stack direction={"column"} gap={0.5}>
            <Typography variant="h4">{profileData.title}</Typography>
            <Typography variant="body1" fontWeight={"600"} color={"gray"}>
              Inventor Name: {" " + profileData.inventorName}
            </Typography>
            <Typography variant="body2">
              University : {" " + profileData.nameOfUni}
            </Typography>
            <Typography variant="body2">
              Patent Name : {" " + profileData.patentName}
            </Typography>
            <Typography variant="body2">
              Status: {" " + profileData.status}
            </Typography>
          </Stack>
        </Stack>
      )}
      {industrialDesignsSection && (
        <Stack
          sx={{ mt: 3, pb: 2, borderBottom: "0.5px solid lightGray" }}
          direction={"row"}
          spacing={2}
        >
          <Stack direction={"column"} gap={0.5}>
            <Typography variant="h4">{profileData.title}</Typography>
            <Typography variant="body1" fontWeight={"600"} color={"gray"}>
              Inventor Name: {" " + profileData.inventorName}
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {profileData.inventorSchool}
            </Typography>
            <Typography variant="body2">
              Approval Date : {" " + profileData.approvalDate}
            </Typography>
            <Typography variant="body2">
              Status: {" " + profileData.status}
            </Typography>
          </Stack>
        </Stack>
      )}
      {technologyTransferedSection && (
        <Stack
          sx={{ mt: 3, pb: 2, borderBottom: "0.5px solid lightGray" }}
          direction={"row"}
          spacing={2}
        >
          <Stack direction={"column"} gap={0.5}>
            <Typography variant="h4">{profileData.title}</Typography>
            <Typography variant="body1" fontWeight={"600"} color={"gray"}>
              Tech Name: {" " + profileData.techName}
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              IPRs: {" " + profileData.iprs}
            </Typography>
            <Typography variant="body2">
              Name of PL : {" " + profileData.pl}
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              Sector: {" " + profileData.sector}
            </Typography>
            <Typography variant="body2">
              Licensed Date : {" " + profileData.licensedDate}
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              PI School: {" " + profileData.piSchool}
            </Typography>
          </Stack>
        </Stack>
      )}
      {trainingSection && (
        <Stack
          sx={{ mt: 5, pb: 2, borderBottom: "0.5px solid lightGray" }}
          direction={"row"}
          spacing={2}
        >
          <Stack direction={"column"} gap={0.5}>
            <Typography variant="h4">{profileData.title}</Typography>
            <Typography variant="body1" fontWeight={600} color={"gray"}>
              {profileData.organizedBy}
            </Typography>
            <Stack direction={"row"} gap={1}>
              <Typography variant="body2">{profileData.startDate}</Typography>
              <span>-</span>
              <Typography variant="body2">{profileData.endDate}</Typography>
            </Stack>
          </Stack>
        </Stack>
      )}
      {supervisionSection && (
        <Stack
          sx={{ mt: 3, pb: 2, borderBottom: "0.5px solid lightGray" }}
          direction={"row"}
          spacing={2}
        >
          <Stack direction={"column"} gap={0.5}>
            <Typography variant="h4">{profileData.title}</Typography>
            <Typography variant="body1" fontWeight={"600"} color={"gray"}>
              University: {" " + profileData.college}
            </Typography>
            <Typography variant="body2" fontSize={15} fontWeight={500} >
              Name : {" " + profileData.name}
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              Field: {" " + profileData.field}
            </Typography>
          </Stack>
        </Stack>
      )}
      {publicationsArticles && (
        <Stack
          sx={{ mt: 3, pb: 2, borderBottom: "0.5px solid lightGray" }}
          direction={"row"}
          spacing={2}
        >
          <Stack direction={"column"} gap={0.5}>
            <Typography variant="h4">{title}</Typography>
            <Typography variant="body1">{subTitle}</Typography>
            <Typography variant="body1">{subTitle}</Typography>
            <Typography variant="body2">{dateText}</Typography>
          </Stack>
        </Stack>
      )}
    </>
  );
}

export default Details;

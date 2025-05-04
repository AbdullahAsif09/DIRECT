import { TruncatedComponent } from "@common/MUI";
import { keys } from "@config";
import { roleToUrl as mapper } from "@constants/index";
import { useGetRole } from "@hooks/index";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const ProjectCard = ({ data }) => {
  const User = useSelector((state) => state.profile.profile);

  const Heading = styled(Typography)(({ theme }) => {
    return {
      color: theme.palette.text.dark,
      fontWeight: 600,
      margin: "0",
    };
  });
  const ButtonStyled = styled(Button)(({ theme }) => {
    return {
      background: "transparent",
      color: theme.palette.text.grey,
      border: "2px solid" + theme.palette.text.grey,
      padding: ".2rem .6rem",
    };
  });
  const ButtonStyledNoBorder = styled(Button)(({ theme }) => {
    return {
      background: "transparent",
      color: theme.palette.text.grey,
      padding: ".2rem .6rem",
      "&:hover": {
        background: "transparent",
      },
    };
  });

  const Ongoing = styled("h5")(({ theme }) => {
    return {
      color: theme.palette.bg.greenDark,
      fontWeight: 600,
      margin: "0",
      fontSize: "13px",
    };
  });
  const CardStyled = styled(Card)(({ theme }) => {
    return {
      padding: "1rem",
      // marginRight: "1.5rem !important",
      borderRadius: 10,
      margin: "0",

      [theme.breakpoints.up("sm")]: {
        margin: "0",
      },
    };
  });
  const CardMediaStyled = styled(CardMedia)(({ theme }) => {
    return {
      // background: "white",
      padding: "0px",
      objectFit: "cover",
      margin: "0",
      borderRadius: "2px",
      background: "#e5e5e5",

      textIndent: "-10000px",
      overflow: "hidden",
      position: "relative",
      "&::after": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "#e5e5e5",

        color: "transparent",
        pointerEvents: "none", // Ensure the overlay doesn't interfere with interactions
        display: "block",
      },
    };
  });

  const inDraft = data?.inDraft;
  const published = !inDraft && data?.published;
  const status = published ? "On Going" : "Completed";
  const url = `/project/${status}/${data?.title}/${data?._id}`;
  const navigate = useNavigate();

  const role = useGetRole();
  const module = mapper?.[role];

  return (
    <CardStyled elevation={3} sx={{ padding: "1rem" }}>
      <CardHeader
        style={{ paddingInline: "0px", display: "block" }}
        title={
          <Heading variant="h4" noWrap>
            {data?.title}
          </Heading>
        }
        subheader={<Ongoing>{status}</Ongoing>}
      />
      <CardMediaStyled
        component="img"
        width={"100%"}
        height="190px"
        image={keys.rootserver + data?.image?.[0]}
        alt="project"
      />
      <CardContent style={{ padding: ".8rem 0rem .2rem 0rem" }}>
        <TruncatedComponent
          Component={Typography}
          variant="body2"
          color="black"
          lines={5}
          sx={{ height: "95px", margin: "0rem" }}
          dangerouslySetInnerHTML={{ __html: data?.description ?? <p></p> }}
        />
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          gap={"1rem"}
          alignItems={"center"}
          marginTop={"1.5rem"}
        >
          {/* <ButtonStyledNoBorder>Q/A Forum</ButtonStyledNoBorder> */}

          {User && (
            <ButtonStyled
              type="primary"
              onClick={() => {
                navigate(`${module}directrooms`, {
                  state: { chatId: data?._id },
                });
              }}
            >
              Q/A Forums
            </ButtonStyled>
          )}
        </Stack>
      </CardContent>
    </CardStyled>
  );
};

export default ProjectCard;

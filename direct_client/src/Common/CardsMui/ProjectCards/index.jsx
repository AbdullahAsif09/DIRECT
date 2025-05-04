import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import { useState } from "react";
import { keys } from "@config";
import { useLocation, useNavigate } from "react-router-dom";
import { useExtractParaTag, useGetRole } from "@hooks";
import { useAxios } from "@hooks/index";
import { TruncatedComponent } from "@common/MUI";
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
    borderRadius: 10,
    margin: "0",
    [theme.breakpoints.up("sm")]: {
      margin: "0",
    },
    [theme.breakpoints.up("xs")]: {
      margin: "0",
    },
  };
});
const CardMediaStyled = styled(CardMedia)(({ theme }) => {
  return {
    background: "white",
    padding: "0px",
    objectFit: "contain",
    margin: "0",
    borderRadius: "2px",
    [theme.breakpoints.up("md")]: {},
  };
});

const ProjectCards = ({ data, recommended, handleDeleteProject, handleOpenModalFeedback }) => {
  const paragraph = useExtractParaTag(data?.description);

  const role = useGetRole();
  const { API } = useAxios();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = async () => {
    handleClose();
    handleDeleteProject(data?._id);
  };
  return (
    <CardStyled elevation={3} sx={{ padding: "1rem" }}>
      <CardHeader
        style={{
          width: "100%",
          maxWidth: "100%",
          paddingInline: "0px",
        }}
        title={
          <TruncatedComponent Component={Heading} variant="h4" lines={1}>
            {data?.title}
          </TruncatedComponent>
        }
        action={
          <>
            {role === "admin" && (
              <>
                <IconButton
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  aria-label="settings"
                >
                  <MoreVert />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  PaperProps={{
                    style: {
                      width: "15ch",
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      navigate("/directportal/dashboard/edit/" + data?._id);
                    }}
                  >
                    <ListItemIcon>
                      <Edit fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleDelete}>
                    <ListItemIcon>
                      <Delete fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                  </MenuItem>
                </Menu>
              </>
            )}
          </>
        }
        subheader={
          <Ongoing>
            {/* in-progress */}
            {/* {data?.endDate === null
              ? "on going"
              : new Date(data?.startDate).toDateString()} */}
          </Ongoing>
        }
      />
      {data.image ? (
        <CardMediaStyled
          component="img"
          width={"100%"}
          height="190px"
          // image={keys.rootserver + data?.image}
          image={keys.rootserver + data?.image}
          onError={(e) => {
            e.currentTarget.src = "/assets/placeholder.jpg";
          }}
          alt="project"
        />
      ) : (
        <Skeleton variant="rectangular" width={"100%"} height={190} />
      )}
      <CardContent style={{ padding: ".8rem 0rem .2rem 0rem" }}>
        {data?.description || data?.image?.length > 0 || data?.title ? (
          <>
            {data?.description && (
              <div style={{ minHeight: 70 }}>
                <TruncatedComponent
                  lines={5}
                  Component={Typography}
                  sx={{
                    textAlign: "left",
                    fontWeight: "400",
                  }}
                  color="black"
                  variant="body2"
                >
                  {paragraph}
                </TruncatedComponent>
              </div>
            )}
            {role === "admin" ? (
              <Stack
                direction={"row"}
                flexWrap={"wrap"}
                gap={"1rem"}
                alignItems={"center"}
                marginTop={"1.5rem"}
              >
                <ButtonStyled
                  type="primary"
                  onClick={() => {
                    navigate("/directportal/dashboard/projectdetails/" + data?._id);
                  }}
                >
                  Know More
                </ButtonStyled>
                <ButtonStyled
                  type="primary"
                  onClick={() => {
                    handleOpenModalFeedback(data?._id);
                  }}
                >
                  View Comments
                </ButtonStyled>
              </Stack>
            ) : recommended === true ? (
              <Stack
                direction={"row"}
                flexWrap={"wrap"}
                gap={"1rem"}
                alignItems={"center"}
                marginTop={"1rem"}
              >
                <ButtonStyledNoBorder>Q/A Forum</ButtonStyledNoBorder>
                <ButtonStyled
                  type="primary"
                  onClick={() => {
                    navigate(
                      `/user/${
                        pathname?.includes("/industry") ? "industry" : "academia"
                      }/projectdetails/` + data?._id
                    );
                  }}
                >
                  Know More
                </ButtonStyled>
              </Stack>
            ) : (
              <></>
            )}
          </>
        ) : (
          <Box sx={{ width: "100%" }}>
            <Skeleton />
            <Skeleton width="60%" />
          </Box>
        )}
      </CardContent>
    </CardStyled>
  );
};

export default ProjectCards;

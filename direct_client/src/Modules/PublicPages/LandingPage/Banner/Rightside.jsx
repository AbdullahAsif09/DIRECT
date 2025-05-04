import React from "react";
import { Button, Typography, Box, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { notifications } from "./data.jsx";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/system";

const NotificationItem = styled(Box)(({ theme }) => ({
  padding: "0.2rem",
  color: "white",
  borderRadius: "5px",

  marginBottom: "0.2rem", // Reduced gap between items
}));

const ClampDetails = styled(Typography)({
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  marginTop: "0.25rem",
});

const Rightside = () => {
  const navigate = useNavigate();

  const handleSeeMoreClick = (id) => {
    navigate(`/announcement/${id}`);
  };

  const handleShowAllClick = () => {
    navigate(`/announcements`);
  };

  return (
    <Stack spacing={1} marginTop={2}>
      {notifications.slice(0, 4).map((notification) => (
        <React.Fragment key={notification.id}>
          <NotificationItem>
            <Typography variant="h5" color={"white"}>
              {notification.title}
            </Typography>

            <Typography variant="caption" color={"grey.400"}>
              {new Date(notification.createdDate).toLocaleDateString()}
            </Typography>
            <ClampDetails variant="body2">{notification.details}</ClampDetails>
            <Button
              variant="text"
              color="primary"
              size="small"
              onClick={() => handleSeeMoreClick(notification.id)}
              sx={{ textTransform: "none", padding: 0 }}
            >
              See More
            </Button>
          </NotificationItem>
          <Divider sx={{ backgroundColor: "grey.600" }} />
        </React.Fragment>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={handleShowAllClick}
        sx={{ textTransform: "none", alignSelf: "start", marginTop: "1rem" }}
      >
        Show All
      </Button>
    </Stack>
  );
};

export default Rightside;

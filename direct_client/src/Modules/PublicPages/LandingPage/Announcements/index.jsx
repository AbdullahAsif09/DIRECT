import React from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { notifications } from "../Banner/data";

const NotificationBox = styled(Box)(({ theme }) => ({
  padding: "1.5rem",
  background: "#ffffff",
  borderRadius: "12px",
  color: "#333",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.1)",
  },
}));

const ClampDetails = styled(Typography)({
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  marginTop: "0.5rem",
});

const PageContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  margin: "0 auto",
  padding: "2rem",
  backgroundColor: "#f5f5f5",
  borderRadius: "16px",
}));

const NotificationsPage = () => {
  const navigate = useNavigate();

  const handleSeeMoreClick = (id) => {
    navigate(`/announcement/${id}`);
  };

  return (
    <PageContainer>
      <Typography variant="h3" color={"#333"} gutterBottom>
        All Notifications
      </Typography>
      <Grid container spacing={4} marginTop={1}>
        {notifications.map((notification) => (
          <Grid item xs={12} sm={6} md={4} key={notification.id}>
            <NotificationBox>
              <Typography variant="h4" gutterBottom>
                {notification.title}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {notification.createdDate}
              </Typography>
              <ClampDetails variant="body2">
                {notification.details}
              </ClampDetails>
              <Button
                variant="outlined"
                color="primary"
                sx={{ marginTop: "1rem", textTransform: "none" }}
                onClick={() => handleSeeMoreClick(notification.id)}
              >
                See More
              </Button>
            </NotificationBox>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
};

export default NotificationsPage;

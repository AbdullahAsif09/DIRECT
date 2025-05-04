import React from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { notifications } from "../Banner/data";

// Styled components for a professional look
const PageContainer = styled(Grid)(({ theme }) => ({
  width:"100%",
  margin: "0 auto",
  padding: "2rem",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.down("sm")]: {
    padding: "1rem",
  },
}));

const NotificationBox = styled(Box)(({ theme }) => ({
  padding: "1.5rem",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
  border: "1px solid #e0e0e0",
}));

function NotificationDetail() {
  const { id } = useParams();
  const notification = notifications.find((notif) => notif.id === parseInt(id));

  if (!notification) {
    return (
      <PageContainer container justifyContent={"center"} alignItems={"center"}>
        <Typography color="error" variant="h6">
          Notification not found
        </Typography>
      </PageContainer>
    );
  }

  return (
    <PageContainer container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h3" color="textPrimary" gutterBottom>
          {notification.title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <NotificationBox>
          <Typography variant="body1" color="textSecondary">
            {notification.details}
          </Typography>
        </NotificationBox>
      </Grid>
    </PageContainer>
  );
}

export default NotificationDetail;

import React from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import styled from "styled-components";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material";

const AdminCard = ({ title, details, handleOpen }) => {
  return (
    <CardStyled item xs={12} md={5.85} lg={5.9} xl={2.8} p={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">{title}</Typography>
        <Button
          variant="outlined"
          onClick={handleOpen}
          sx={{ textTransform: "capitalize", paddingX: "5px" }}
        >
          Add +
        </Button>
      </Stack>
      <Box mt={2} mb={1} sx={{ borderBottom: "1px solid #e0e0e0" }} />
      <Stack spacing={2} mt={2}>
        <Stack direction="row" alignItems="center" gap={2}>
          <PersonIcon color="primary" />
          <Box>
            <Typography variant="caption" color="textSecondary">
              NAME
            </Typography>
            <Typography>{details.name}</Typography>
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center" gap={2}>
          <EmailIcon color="primary" />
          <Box>
            <Typography variant="caption" color="textSecondary">
              EMAIL
            </Typography>
            <Typography>{details.email}</Typography>
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center" gap={2}>
          <PhoneIcon color="primary" />
          <Box>
            <Typography variant="caption" color="textSecondary">
              PHONE
            </Typography>
            <Typography>{details.phone}</Typography>
          </Box>
        </Stack>
      </Stack>
    </CardStyled>
  );
};

export default AdminCard;

const CardStyled = styled(Grid)({
  borderRadius: "7px",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
});

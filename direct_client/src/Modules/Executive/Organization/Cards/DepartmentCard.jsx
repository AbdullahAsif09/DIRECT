import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const DepartmentCardWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: '#fff',
  textAlign: 'left',
  minWidth: '200px',
  minHeight: '220px',
  flex: '1',
  margin: theme.spacing(1),
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  marginTop: "15px",
  marginBottom: "30px"
}));

const DepartmentCard = ({ icon, name, totalEmployees, updated }) => {
  return (
    <DepartmentCardWrapper>
      <IconWrapper>
        <img src={icon} alt={`${name} icon`} style={{ width: '50px', height: '50px' }} />
      </IconWrapper>
      <Typography variant="h6" fontWeight="bold" gutterBottom>{name}</Typography>
      <Typography sx={{fontSize:"13px", fontWeight:"bold"}} variant="body1" color="success.main" gutterBottom>
      {
        name === "Marketing and Sales" ? " Total Users: " : " Total Employees: "
      }
     {totalEmployees}</Typography>
      <Box display="flex" alignItems="center">
        <AccessTimeIcon fontSize="10px" color="action" />
        <Typography variant="caption" color="textSecondary" ml={0.5}>
          Updated {updated} ago
        </Typography>
      </Box>
    </DepartmentCardWrapper>
  );
};

export default DepartmentCard;

import { Typography } from '@mui/material';
import React from 'react'

function TypographyMUI({ children, sx, variant, ...rest }) {
  return (
    <div>
      <Typography {...rest} sx={sx} variant={variant}>
        {children}
      </Typography>
    </div>
  );
}

export default TypographyMUI;
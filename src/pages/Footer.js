import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
        py: 2,
        mt: 4,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
        <img
          src="/fish.png" // Path to the image in the public folder
          alt="Fish Icon"
          style={{
            width: '100px',
            height: '60px',
          }}
        />
      </Box>
      <Typography variant="body1">
        © {new Date().getFullYear()} The Gnostic Union. All Rights Reserved.
      </Typography>
      <Typography variant="body2">
        
      </Typography>
    </Box>
  );
};

export default Footer;

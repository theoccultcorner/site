import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

const Seminary = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Formation', path: '/formation' },
    { label: 'Programs', path: '/programs' },
    { label: 'Admissions', path: '/admissions' },
    { label: 'Degree Options', path: '/degrees' },
    { label: 'Faculty', path: '/faculty' },
    { label: 'Events', path: '/events' },
    { label: 'Resources', path: '/resources' },
    { label: 'Contact', path: '/contact' },
    { label: 'FAQs', path: '/faqs' },
    { label: 'Apply Now', path: '/apply' },
  ];

  return (
    <AppBar position="static" style={{ backgroundColor: 'black' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Gnostic Catholic Union Seminary
          </Link>
        </Typography>
        <div>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleMenuOpen}
          >
            <Typography>Menu</Typography>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {links.map((link) => (
              <MenuItem
                key={link.label}
                onClick={handleMenuClose}
                component={Link}
                to={link.path}
              >
                {link.label}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Seminary;
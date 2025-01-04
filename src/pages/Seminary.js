import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { Link, Routes, Route } from 'react-router-dom';
import Formation from './Formation';
import Programs from './Programs';
import Admissions from './Admissions';
import Degrees from './Degrees';
import Faculty from './Faculty';
import Events from './Events';
import Resources from './Resources';
import Contact from './Contact';
import FAQs from './FAQs';
import Apply from './Apply';
import SeminaryHome from './SeminaryHome';

const Seminary = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const links = [
    { label: 'Home', path: '/SeminaryHome' },
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
    <div>
      <AppBar position="static" style={{ backgroundColor: 'black' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Link to="/SeminaryHome" style={{ color: 'white', textDecoration: 'none' }}>
              Seminary
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

      <Routes>
        <Route path="/SeminaryHome" element={<SeminaryHome />} />
        <Route path="/formation" element={<Formation />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/degrees" element={<Degrees />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/events" element={<Events />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/apply" element={<Apply />} />
      </Routes>
    </div>
  );
};

export default Seminary;

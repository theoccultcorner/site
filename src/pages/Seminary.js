import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import Formation from './Formation';
import Programs from './Programs';
import Admissions from './Admissions';
import Degrees from './Degrees';
import Faculty from './Faculty';
import Events from './Events';
import Resources from './Resources';
 
import Apply from './Apply';
import SeminaryHome from './SeminaryHome';

const Seminary = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const goToSeminaryHome = () => {
    setAnchorEl(null);
    navigate('/SeminaryHome');
  };

  const goToFormation = () => {
    setAnchorEl(null);
    navigate('/formation');
  };

  const goToPrograms = () => {
    setAnchorEl(null);
    navigate('/programs');
  };

  const goToAdmissions = () => {
    setAnchorEl(null);
    navigate('/admissions');
  };

  const goToDegrees = () => {
    setAnchorEl(null);
    navigate('/degrees');
  };

  const goToFaculty = () => {
    setAnchorEl(null);
    navigate('/faculty');
  };

  const goToEvents = () => {
    setAnchorEl(null);
    navigate('/events');
  };

  const goToResources = () => {
    setAnchorEl(null);
    navigate('/resources');
  };

 

  const goToApply = () => {
    setAnchorEl(null);
    navigate('/apply');
  };

  const links = [
    { label: 'Home', action: goToSeminaryHome },
    { label: 'Formation', action: goToFormation },
    { label: 'Programs', action: goToPrograms },
    { label: 'Admissions', action: goToAdmissions },
    { label: 'Degree Options', action: goToDegrees },
    { label: 'Faculty', action: goToFaculty },
    { label: 'Events', action: goToEvents },
    { label: 'Resources', action: goToResources },
  
    { label: 'Apply Now', action: goToApply },
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
                  onClick={link.action}
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
      
        <Route path="/apply" element={<Apply />} />
      </Routes>
    </div>
  );
};

export default Seminary;
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const Layout = () => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [subMenuEl, setSubMenuEl] = useState(null); // For Seminary sub-menu
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);

      const userRef = doc(db, 'profiles', result.user.uid);
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        await setDoc(userRef, {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          bio: 'This is a sample bio',
          website: 'https://example.com',
        });
      }

      navigate('/profile');
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setAnchorEl(null);
    } catch (error) {
      console.error('Error occurred during logout:', error);
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSubMenu = (event) => {
    setSubMenuEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSubMenuEl(null);
  };

  const goToProfile = () => {
    handleClose();
    navigate('/profile');
  };

  const goToMeta = () => {
    handleClose();
    navigate('/meta');
  };

  const goToProfiles = () => {
    handleClose();
    navigate('/profiles');
  };

  const goToBlogs = () => {
    handleClose();
    navigate('/blogs');
  };

  const goToSeminaryHome = () => {
    handleClose();
    navigate('/seminary');
  };

  const goToFormation = () => {
    handleClose();
    navigate('/seminary/formation');
  };


  const goToFoundations= () => {
    handleClose();
    navigate('/seminary/Foundations');
  };

  const goToRequirements= () => {
    handleClose();
    navigate('/seminary/Requirements');
  };

  const goToContact = () => {
    handleClose();
    navigate('/contact');
  };

  return (
    <>
      <AppBar position="static" style={{ background: 'black' }}>
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
            The Gnostic Union
          </Typography>
          {user ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {user.photoURL ? (
                  <Avatar src={user.photoURL} alt={user.displayName} />
                ) : (
                  <Avatar>{user.displayName ? user.displayName.charAt(0) : ''}</Avatar>
                )}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={goToProfile}>Profile</MenuItem>
                <MenuItem onClick={goToProfiles}>Community</MenuItem>
                <MenuItem onClick={handleSubMenu}>Seminary</MenuItem>
                <MenuItem onClick={goToMeta}>Pleroma</MenuItem>
                <MenuItem onClick={goToBlogs}>Blogs</MenuItem>
                <MenuItem onClick={goToContact}>Contact</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>

              {/* Seminary Sub-Menu */}
              <Menu
                id="sub-menu"
                anchorEl={subMenuEl}
                open={Boolean(subMenuEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={goToSeminaryHome}>Seminary Home</MenuItem>
                <MenuItem onClick={goToFormation}>Formation</MenuItem>
                <MenuItem onClick={goToRequirements}>Requirements</MenuItem>
                <MenuItem onClick={goToFoundations}>Formation</MenuItem>
                {/* Add other Seminary options here */}
              </Menu>
            </div>
          ) : (
            <Button color="inherit" onClick={handleLogin}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  );
};

export default Layout;

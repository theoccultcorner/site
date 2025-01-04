import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import Footer from './Footer'; // Import Footer component
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

  const navigateTo = (path) => {
    handleClose();
    navigate(path);
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
                <MenuItem onClick={() => navigateTo('/about')}>About</MenuItem>
                <MenuItem onClick={() => navigateTo('/profile')}>Profile</MenuItem>
                <MenuItem onClick={() => navigateTo('/profiles')}>Community</MenuItem>
                <MenuItem onClick={handleSubMenu}>Seminary</MenuItem>
                <MenuItem onClick={() => navigateTo('/meta')}>Pleroma</MenuItem>
                <MenuItem onClick={() => navigateTo('/blogs')}>Blogs</MenuItem>
                <MenuItem onClick={() => navigateTo('/contact')}>Contact</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>

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
                <MenuItem onClick={() => navigateTo('/seminary')}>Seminary Home</MenuItem>
                <MenuItem onClick={() => navigateTo('/seminary/formation')}>Formation</MenuItem>
                <MenuItem onClick={() => navigateTo('/seminary/requirements')}>Requirements</MenuItem>
                <MenuItem onClick={() => navigateTo('/seminary/foundations')}>Foundations</MenuItem>
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
      <Footer />
    </>
  );
};

export default Layout;

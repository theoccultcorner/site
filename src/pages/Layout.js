import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebaseConfig';

const Layout = () => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
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

      // Store user profile in Firestore if not already stored
      const userRef = doc(db, 'profiles', result.user.uid);
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        await setDoc(userRef, {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL
          // Add more profile data as needed
        });
      }

      // Example: Add a document to a collection
      const blogCollection = collection(db, 'blogs');
      await addDoc(blogCollection, {
        title: 'New Blog Post',
        content: 'This is the content of the new blog post.',
        author: result.user.uid
      });

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

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToProfile = () => {
    setAnchorEl(null);
    navigate('/profile');
  };

  const goToProfiles = () => {
    setAnchorEl(null);
    navigate('/profiles');
  };

  const goToBlogs = () => {
    setAnchorEl(null);
    navigate('/blogs');
  };

  const goToContact = () => {
    setAnchorEl(null);
    navigate('/contact');
  };

  return (
    <>
      <AppBar position="static" style={{ background: 'black' }}>
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
            TheGnosticChristian.Org
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
                <MenuItem onClick={goToBlogs}>Blogs</MenuItem>
                <MenuItem onClick={goToContact}>Contact</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button color="inherit" onClick={handleLogin}>Login</Button>
          )}
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  );
};

export default Layout;

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  Box,
  useMediaQuery,
} from "@mui/material";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Footer from "./Footer"; // Moved Footer to be in the same folder as Layout.js
import { auth } from "../firebaseConfig"; // Adjusted to stay within src/ directory
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Layout = () => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [seminaryAnchorEl, setSeminaryAnchorEl] = useState(null);
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width:600px)");

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

      const userRef = doc(db, "profiles", result.user.uid);
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        await setDoc(userRef, {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          bio: "This is a sample bio",
          website: "https://example.com",
        });
      }

      navigate("/profileList");
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setAnchorEl(null);
    } catch (error) {
      console.error("Error occurred during logout:", error);
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSeminaryAnchorEl(null);
  };

  const navigateTo = (path) => {
    handleClose();
    navigate(path);
  };

  const handleSeminaryMenu = (event) => {
    setSeminaryAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="static" style={{ background: "black" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
          >
            The Gnostic Union
          </Typography>

          {user ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {isMobile && (
                <Typography variant="body2" color="inherit">
                  Menu
                </Typography>
              )}
              <Tooltip title="Click to access the menu" placement="bottom">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  style={{ position: "relative" }}
                >
                  {user.photoURL ? (
                    <Avatar src={user.photoURL} alt={user.displayName} />
                  ) : (
                    <Avatar>
                      {user.displayName ? user.displayName.charAt(0) : ""}
                    </Avatar>
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => navigateTo("/about")}>About</MenuItem>
                <MenuItem onClick={() => navigateTo("/profileList")}>Community</MenuItem>
                <MenuItem onClick={() => navigateTo("/meta")}>Διαλεκτικὸς Χῶρος</MenuItem>
                <MenuItem onClick={() => navigateTo("/blogs")}>Blogs</MenuItem>
                <MenuItem onClick={handleSeminaryMenu}>Seminary ▸</MenuItem>
                <Menu
                  anchorEl={seminaryAnchorEl}
                  open={Boolean(seminaryAnchorEl)}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                >
                  <MenuItem onClick={() => navigateTo("/seminary")}>Overview</MenuItem>
                  <MenuItem onClick={() => navigateTo("/seminary/requirements")}>Requirements</MenuItem>
                  <MenuItem onClick={() => navigateTo("/seminary/recommended")}>Recommended Reading</MenuItem>
                  <MenuItem onClick={() => navigateTo("/seminary/ministry")}>Ministry</MenuItem>
                  <MenuItem onClick={() => navigateTo("/seminary/foundations")}>Foundations</MenuItem>
                  <MenuItem onClick={() => navigateTo("/seminary/degree-programs")}>Degree Programs</MenuItem>
                  <MenuItem onClick={() => navigateTo("/seminary/certificate-programs")}>Certificate Programs</MenuItem>
                  <MenuItem onClick={() => navigateTo("/seminary/accreditation")}>Accreditation</MenuItem>
                  <MenuItem onClick={() => navigateTo("/seminary/events")}>Events</MenuItem>
                </Menu>
                <MenuItem onClick={() => navigateTo("/contact")}>Contact</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
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

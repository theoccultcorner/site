import React, { useEffect, useState } from "react";
import {
  Alert,
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Snackbar,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ArrowDropDownRounded,
  CloseRounded,
  LoginRounded,
  MenuRounded,
} from "@mui/icons-material";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import Footer from "./Footer";

const publicLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Journal", path: "/blogs" },
  { label: "Contact", path: "/contact" },
];

const seminaryLinks = [
  { label: "Overview", path: "/seminary" },
  { label: "Formation", path: "/seminary/formation" },
  { label: "Requirements", path: "/seminary/requirements" },
  { label: "Foundations", path: "/seminary/foundations" },
  { label: "Ministry", path: "/seminary/ministry" },
  { label: "Reading", path: "/seminary/recommended" },
  { label: "Accreditation", path: "/seminary/accreditation" },
];

const Layout = () => {
  const [user, setUser] = useState(null);
  const [userMenu, setUserMenu] = useState(null);
  const [seminaryMenu, setSeminaryMenu] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => onAuthStateChanged(auth, setUser), []);
  useEffect(() => setDrawerOpen(false), [location.pathname]);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const userRef = doc(db, "profiles", result.user.uid);
      const profile = await getDoc(userRef);
      if (!profile.exists()) {
        await setDoc(userRef, {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          bio: "",
          website: "",
        });
      }
      navigate("/profilelist");
    } catch (error) {
      console.error("Error occurred during login:", error);
      setAuthError(
        error?.code === "auth/unauthorized-domain"
          ? "This domain must be authorized in Firebase before Google sign-in can be used."
          : "We could not sign you in. Please try again."
      );
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserMenu(null);
      navigate("/");
    } catch (error) {
      setAuthError("We could not sign you out. Please try again.");
    }
  };

  const goTo = (path) => {
    setUserMenu(null);
    setSeminaryMenu(null);
    setDrawerOpen(false);
    navigate(path);
  };

  const navButtonSx = (path) => ({
    color: location.pathname === path ? "primary.main" : "text.secondary",
    px: 1.25,
    minWidth: 0,
    fontSize: "0.84rem",
    "&:hover": { color: "text.primary", backgroundColor: "rgba(255,255,255,.04)" },
  });

  return (
    <Box className="site-frame">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "rgba(9, 12, 20, 0.86)",
          borderBottom: "1px solid",
          borderColor: "divider",
          backdropFilter: "blur(18px)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: { xs: 68, md: 78 } }}>
            <Box component={Link} to="/" aria-label="The Gnostic Union home" sx={{ display: "flex", mr: "auto" }}>
              <Box component="img" src="/fish.png" alt="The Gnostic Union" sx={{ width: { xs: 128, md: 158 }, height: 58, objectFit: "contain" }} />
            </Box>

            {!isMobile && (
              <Box component="nav" aria-label="Primary navigation" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                {publicLinks.map((item) => (
                  <Button key={item.path} component={Link} to={item.path} sx={navButtonSx(item.path)}>
                    {item.label}
                  </Button>
                ))}
                <Button
                  endIcon={<ArrowDropDownRounded />}
                  onClick={(event) => setSeminaryMenu(event.currentTarget)}
                  sx={navButtonSx("/seminary")}
                >
                  Seminary
                </Button>
                {user && (
                  <Button component={Link} to="/profilelist" sx={navButtonSx("/profilelist")}>Community</Button>
                )}
              </Box>
            )}

            <Divider orientation="vertical" flexItem sx={{ mx: { xs: 1, md: 2 }, my: 2 }} />

            {user ? (
              <Tooltip title="Account menu">
                <IconButton onClick={(event) => setUserMenu(event.currentTarget)} sx={{ p: 0.5 }}>
                  <Avatar src={user.photoURL || undefined} alt={user.displayName || "Account"} sx={{ width: 38, height: 38, border: "1px solid", borderColor: "primary.main" }}>
                    {user.displayName?.charAt(0) || "G"}
                  </Avatar>
                </IconButton>
              </Tooltip>
            ) : (
              <Button variant="contained" color="primary" startIcon={<LoginRounded />} onClick={handleLogin} sx={{ display: { xs: "none", sm: "inline-flex" } }}>
                Member login
              </Button>
            )}

            {isMobile && (
              <IconButton aria-label="Open navigation" onClick={() => setDrawerOpen(true)} sx={{ ml: 1 }}>
                <MenuRounded />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Menu anchorEl={seminaryMenu} open={Boolean(seminaryMenu)} onClose={() => setSeminaryMenu(null)} PaperProps={{ sx: { mt: 1, minWidth: 220, border: "1px solid", borderColor: "divider" } }}>
        {seminaryLinks.map((item) => <MenuItem key={item.path} onClick={() => goTo(item.path)}>{item.label}</MenuItem>)}
      </Menu>

      <Menu anchorEl={userMenu} open={Boolean(userMenu)} onClose={() => setUserMenu(null)} PaperProps={{ sx: { mt: 1, minWidth: 210, border: "1px solid", borderColor: "divider" } }}>
        <MenuItem onClick={() => goTo("/profilelist")}>Community</MenuItem>
        <MenuItem onClick={() => goTo("/meta")}>Διαλεκτικὸς Χῶρος</MenuItem>
        <MenuItem onClick={() => goTo("/blogs")}>Journal</MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </Menu>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ sx: { width: "min(88vw, 360px)", p: 2.5, backgroundColor: "#0d111a" } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h5" color="primary.main">Explore</Typography>
          <IconButton aria-label="Close navigation" onClick={() => setDrawerOpen(false)}><CloseRounded /></IconButton>
        </Box>
        <Divider />
        <List>
          {publicLinks.map((item) => <ListItemButton key={item.path} onClick={() => goTo(item.path)} selected={location.pathname === item.path}><ListItemText primary={item.label} /></ListItemButton>)}
          <Typography variant="overline" color="primary.main" sx={{ display: "block", px: 2, pt: 2 }}>Seminary</Typography>
          {seminaryLinks.map((item) => <ListItemButton key={item.path} onClick={() => goTo(item.path)} sx={{ pl: 3 }}><ListItemText primary={item.label} /></ListItemButton>)}
          {user && <ListItemButton onClick={() => goTo("/profilelist")}><ListItemText primary="Community" /></ListItemButton>}
        </List>
        {!user && <Button fullWidth variant="contained" startIcon={<LoginRounded />} onClick={handleLogin} sx={{ mt: "auto" }}>Member login</Button>}
      </Drawer>

      <Box id="main-content" component="main" className="site-main" tabIndex={-1}><Outlet /></Box>
      <Footer />

      <Snackbar open={Boolean(authError)} autoHideDuration={6000} onClose={() => setAuthError("")}>
        <Alert severity="error" variant="filled" onClose={() => setAuthError("")}>{authError}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Layout;

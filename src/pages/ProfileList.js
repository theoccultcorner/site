import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import {
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Button,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useNavigate } from "react-router-dom";

function ProfileList() {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [expandedProfile, setExpandedProfile] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

  // Fetch profiles and track online users
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "profiles"));
        const fetchedProfiles = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProfiles(fetchedProfiles);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    const trackOnlineUsers = () => {
      const onlineRef = collection(db, "onlineUsers");
      const unsubscribe = onSnapshot(onlineRef, (snapshot) => {
        const onlineData = {};
        snapshot.forEach((doc) => {
          onlineData[doc.id] = doc.data();
        });
        setOnlineUsers(onlineData);
      });

      return unsubscribe;
    };

    fetchProfiles();
    const unsubscribeOnlineUsers = trackOnlineUsers();

    return () => unsubscribeOnlineUsers();
  }, []);

  useEffect(() => {
    const updateOnlineStatus = async (isOnline) => {
      if (!auth.currentUser) return;
      setCurrentUserId(auth.currentUser.uid);

      const userRef = doc(db, "onlineUsers", auth.currentUser.uid);
      if (isOnline) {
        await setDoc(
          userRef,
          {
            displayName: auth.currentUser.displayName || "Anonymous",
            photoURL: auth.currentUser.photoURL || "",
            online: true,
            lastActive: new Date().toISOString(),
          },
          { merge: true }
        );
      } else {
        await setDoc(
          userRef,
          {
            online: false,
            lastActive: new Date().toISOString(),
          },
          { merge: true }
        );
      }
    };

    const handleOnline = () => updateOnlineStatus(true);
    const handleOffline = () => updateOnlineStatus(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    handleOnline();

    return () => {
      handleOffline();
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleExpand = (profileId) => {
    setExpandedProfile(expandedProfile === profileId ? null : profileId);
  };

  const handleManageBlogs = (profile) => {
    if (profile.id === currentUserId) {
      navigate(`/blogs/${profile.displayName}`, { state: { userId: profile.id } });
    } else {
      alert("You can only manage your own blogs!");
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h6">Loading...</Typography>
      </div>
    );
  }

  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}
    >
      <Typography variant="h5" gutterBottom>
        The Community
      </Typography>
      <List>
        {profiles.map((profile) => {
          const isOnline = onlineUsers[profile.id]?.online || false;

          return (
            <div key={profile.id}>
              <ListItem
                button
                onClick={() => handleExpand(profile.id)}
                style={{ borderBottom: "1px solid #eee", cursor: "pointer" }}
              >
                <ListItemAvatar>
                  <Avatar src={profile.photoURL} alt={profile.displayName}>
                    {profile.photoURL ? "" : profile.displayName.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" component="span">
                      {profile.displayName}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      component="span"
                      variant="body2"
                      color={isOnline ? "green" : "textSecondary"}
                    >
                      {isOnline ? "Online" : "Offline"}
                    </Typography>
                  }
                />
                {expandedProfile === profile.id ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </ListItem>
              <Collapse
                in={expandedProfile === profile.id}
                timeout="auto"
                unmountOnExit
              >
                <div style={{ paddingLeft: "20px", paddingBottom: "10px" }}>
                  <Typography variant="body2">
                    <strong>Bio:</strong> {profile.bio || "No bio available"}
                  </Typography>
                  {profile.email && (
                    <Typography variant="body2">
                      <strong>Email:</strong>{" "}
                      <a
                        href={`mailto:${profile.email}`}
                        style={{ color: "#1976d2" }}
                      >
                        {profile.email}
                      </a>
                    </Typography>
                  )}
                  {profile.website && (
                    <Typography variant="body2">
                      <strong>Website:</strong>{" "}
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#1976d2" }}
                      >
                        {profile.website}
                      </a>
                    </Typography>
                  )}
                  {currentUserId === profile.id && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleManageBlogs(profile)}
                      style={{ marginTop: "10px" }}
                    >
                      Manage Blogs
                    </Button>
                  )}
                </div>
              </Collapse>
            </div>
          );
        })}
      </List>
    </Paper>
  );
}

export default ProfileList;

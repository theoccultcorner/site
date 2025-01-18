import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { Avatar, Typography, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

function ProfileList() {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState({});

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'profiles'));
        const fetchedProfiles = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProfiles(fetchedProfiles);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setLoading(false);
      }
    };

    const trackOnlineUsers = () => {
      const onlineRef = collection(db, 'onlineUsers');
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

    return () => unsubscribeOnlineUsers(); // Cleanup listener on component unmount
  }, []);

  useEffect(() => {
    const updateOnlineStatus = async (isOnline) => {
      if (!auth.currentUser) return;
      const userRef = doc(db, 'onlineUsers', auth.currentUser.uid);
      if (isOnline) {
        await setDoc(
          userRef,
          {
            displayName: auth.currentUser.displayName || 'Anonymous',
            photoURL: auth.currentUser.photoURL || '',
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

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    handleOnline(); // Set online status when the component mounts

    return () => {
      handleOffline(); // Set offline status when the component unmounts
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const sanitizeDisplayName = (name) =>
    name.replace(/\s+/g, '').replace(/[^a-zA-Z0-9()]/g, ''); // Remove spaces and special characters

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  return (
    <Grid container spacing={3} sx={{ padding: '20px' }}>
      {profiles.map((profile) => {
        const isOnline = onlineUsers[profile.id]?.online || false;

        return (
          <Grid item xs={12} sm={6} md={4} key={profile.id}>
            <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
              <Link
                to={`/users/${sanitizeDisplayName(profile.displayName)}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Avatar
                  src={profile.photoURL}
                  alt={profile.displayName}
                  sx={{ width: 80, height: 80, margin: '0 auto', marginBottom: '10px' }}
                />
                <Typography variant="h6" gutterBottom>
                  {profile.displayName}
                </Typography>
              </Link>
              <Typography variant="body1" sx={{ color: isOnline ? 'green' : 'gray' }}>
                {isOnline ? 'Online' : 'Offline'}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong>{' '}
                {profile.email ? (
                  <a href={`mailto:${profile.email}`} style={{ color: 'inherit' }}>
                    {profile.email}
                  </a>
                ) : (
                  'Not provided'
                )}
              </Typography>
              <Typography variant="body1">
                <strong>Bio:</strong> {profile.bio || 'No bio available'}
              </Typography>
              <Typography variant="body1">
                <strong>Website:</strong>{' '}
                {profile.website ? (
                  <a href={profile.website} target="_blank" rel="noopener noreferrer">
                    {profile.website}
                  </a>
                ) : (
                  'Not provided'
                )}
              </Typography>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ProfileList;

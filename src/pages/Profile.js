import React, { useState, useEffect } from 'react';
import { Button, Avatar, TextField, Paper, Typography } from '@mui/material';
import { auth } from '../firebaseConfig';
import { getDatabase, ref, update, get } from 'firebase/database';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        setDisplayName(user.displayName || '');
        setPhotoURL(user.photoURL || '');
        // Fetch additional profile data from the database if available
        fetchProfileData(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchProfileData = async (userId) => {
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      setBio(userData.bio || '');
      setWebsite(userData.website || '');
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    const db = getDatabase();
    const userRef = ref(db, `users/${user.uid}`);
    try {
      await update(userRef, {
        displayName: displayName.trim(),
        photoURL: photoURL.trim(),
        bio: bio.trim(),
        website: website.trim()
      });
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <Typography variant="h5" style={{ marginBottom: '20px' }}>Edit Profile</Typography>
      <Avatar src={photoURL} alt={displayName} sx={{ width: 100, height: 100, marginBottom: 10 }} />
      <TextField
        label="Display Name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        fullWidth
        style={{ marginBottom: 10 }}
      />
      <TextField
        label="Profile Picture URL"
        value={photoURL}
        onChange={(e) => setPhotoURL(e.target.value)}
        fullWidth
        style={{ marginBottom: 10 }}
      />
      <TextField
        label="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        fullWidth
        multiline
        rows={3}
        style={{ marginBottom: 10 }}
      />
      <TextField
        label="Website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        fullWidth
        style={{ marginBottom: 10 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveProfile}
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Profile'}
      </Button>
    </Paper>
  );
};

export default Profile;

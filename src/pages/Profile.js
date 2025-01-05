import React, { useState, useEffect } from 'react';
import { Button, Avatar, TextField, Paper, Typography, Grid, Box } from '@mui/material';
import { auth } from '../firebaseConfig';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        setDisplayName(user.displayName || '');
        setPhotoURL(user.photoURL || '');
        await fetchProfileData(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchProfileData = async (userId) => {
    try {
      const docRef = doc(db, 'profiles', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setBio(userData.bio || '');
        setWebsite(userData.website || '');
        setProfileData(userData);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, 'profiles', user.uid);
      await updateDoc(docRef, {
        displayName: displayName.trim(),
        photoURL: photoURL.trim(),
        bio: bio.trim(),
        website: website.trim(),
      });
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper style={styles.paper}>
      <Typography variant="h5" style={styles.title}>
        Edit Profile
      </Typography>
      <Box style={styles.avatarBox}>
        <Avatar src={photoURL} alt={displayName} style={styles.avatar} />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            fullWidth
            style={styles.input}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Profile Picture URL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            fullWidth
            style={styles.input}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            fullWidth
            multiline
            rows={3}
            style={styles.input}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            fullWidth
            style={styles.input}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveProfile}
            disabled={loading}
            fullWidth
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </Button>
        </Grid>
      </Grid>

      {profileData && (
        <Box style={styles.profileData}>
          <Typography variant="h6">Profile Data</Typography>
          <Typography>
            <strong>Email:</strong> {profileData.email}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

const styles = {
  paper: {
    padding: '30px',
    maxWidth: '600px',
    margin: 'auto',
    marginTop: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
  },
  title: {
    marginBottom: '20px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  avatarBox: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  avatar: {
    width: '120px',
    height: '120px',
  },
  input: {
    marginBottom: '15px',
  },
  profileData: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    textAlign: 'center',
  },
};

export default Profile;

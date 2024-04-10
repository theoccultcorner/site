import React, { useState, useEffect } from 'react';
import { Button, Avatar, TextField, Paper, Typography } from '@mui/material';
import { auth } from '../firebaseConfig';
import { getDatabase, ref, update, get } from 'firebase/database';
import { db } from '../firebaseConfig'; // Import Firestore db instance
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'; // Import updateDoc from firestore

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
        // Fetch additional profile data from Firestore if available
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
        setProfileData(userData); // Set all profile data
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, 'profiles', user.uid);
      await updateDoc(docRef, { // Change from update to updateDoc
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

      {profileData && (
        <div>
          <Typography variant="h5" style={{ marginTop: '20px' }}>Profile Data</Typography>
          <Typography><strong>Email:</strong> {profileData.email}</Typography>
          {/* Display other profile attributes here */}
        </div>
      )}
    </Paper>
  );
};

export default Profile;

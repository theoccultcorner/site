import React, { useState, useEffect } from 'react';
import {
  Button,
  Avatar,
  TextField,
  Paper,
  Typography,
  Box,
  Divider,
  IconButton,
  Modal,
} from '@mui/material';
import { auth } from '../firebaseConfig';
import { db } from '../firebaseConfig';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import UserBlogManager from './UserBlogManager'; // Import the UserBlogManager component

const Profile = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [links, setLinks] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || '');
        setPhotoURL(currentUser.photoURL || '');
        await fetchProfileData(currentUser.uid);
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
        setLinks(userData.links || '');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSaveProfile = async () => {
    let profileImageUrl = photoURL;

    if (imageFile) {
      const storage = getStorage();
      const imageRef = storageRef(storage, `profileImages/${imageFile.name}`);
      try {
        const snapshot = await uploadBytes(imageRef, imageFile);
        profileImageUrl = await getDownloadURL(snapshot.ref);
      } catch (error) {
        console.error('Error uploading profile image:', error);
      }
    }

    try {
      const docRef = doc(db, 'profiles', user.uid);
      await updateDoc(docRef, {
        photoURL: profileImageUrl,
        bio: bio.trim(),
        website: website.trim(),
        links: links.trim(),
      });

      setPhotoURL(profileImageUrl);
      setProfileModalOpen(false);
      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Paper style={styles.paper}>
      {/* Profile Section */}
      <Box style={styles.profileHeader}>
        <input
          type="file"
          accept="image/*"
          id="profile-image-upload"
          style={{ display: 'none' }}
          onChange={handleProfileImageChange}
        />
        <label htmlFor="profile-image-upload">
          <Avatar src={imagePreview || photoURL} alt={displayName} style={styles.avatar} />
          <IconButton component="span" style={styles.editIcon}>
            <AddPhotoAlternateIcon />
          </IconButton>
        </label>
        <Typography variant="h5" style={styles.displayName}>
          {displayName || 'Your Display Name'}
        </Typography>
        <Typography variant="body2" style={styles.bio}>
          {bio || 'Add a short bio about yourself.'}
        </Typography>
        <Button variant="outlined" onClick={() => setProfileModalOpen(true)}>
          Edit Profile
        </Button>
      </Box>

      <Divider style={{ margin: '20px 0' }} />

      {/* User Blog Manager */}
      {user && <UserBlogManager userId={user.uid} displayName={displayName} />}

      {/* Edit Profile Modal */}
      <Modal open={profileModalOpen} onClose={() => setProfileModalOpen(false)}>
        <Box style={styles.modal}>
          <Typography variant="h6">Edit Profile</Typography>
          <TextField
            label="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Links"
            value={links}
            onChange={(e) => setLinks(e.target.value)}
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <Button variant="contained" color="primary" onClick={handleSaveProfile}>
            Save
          </Button>
        </Box>
      </Modal>
    </Paper>
  );
};

const styles = {
  paper: {
    padding: '30px',
    maxWidth: '800px',
    margin: 'auto',
    marginTop: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
  },
  profileHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  avatar: {
    width: '120px',
    height: '120px',
    marginBottom: '10px',
  },
  editIcon: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
};

export default Profile;

import React, { useState, useEffect } from 'react';
import {
  Button,
  Avatar,
  TextField,
  Paper,
  Typography,
  Grid,
  Box,
  Divider,
  Modal,
  IconButton,
} from '@mui/material';
import { auth } from '../firebaseConfig';
import { db } from '../firebaseConfig';
import { getDatabase, ref, push } from 'firebase/database'; // Added missing imports
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import UserBlogPosts from './UserBlogPosts';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // State for the blog creation modal
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [postImagePreview, setPostImagePreview] = useState('');

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
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
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
        displayName: displayName.trim(),
        photoURL: profileImageUrl,
        bio: bio.trim(),
        website: website.trim(),
      });

      setPhotoURL(profileImageUrl);
      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleCreatePost = async () => {
    if (!postTitle.trim() || !postContent.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    let postImageUrl = '';
    if (postImage) {
      const storage = getStorage();
      const imageRef = storageRef(storage, `blogImages/${postImage.name}`);
      try {
        const snapshot = await uploadBytes(imageRef, postImage);
        postImageUrl = await getDownloadURL(snapshot.ref);
      } catch (error) {
        console.error('Error uploading post image:', error);
      }
    }

    const newPost = {
      title: postTitle.trim(),
      content: postContent.trim(),
      imageUrl: postImageUrl || '',
      author: displayName,
      date: new Date().toISOString(),
    };

    try {
      const database = getDatabase(); // Initialize the Realtime Database
      await push(ref(database, 'blogPosts'), newPost); // Push the new post
      console.log('Post created successfully!');
      setPostTitle('');
      setPostContent('');
      setPostImage(null);
      setPostImagePreview('');
      setCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handlePostImageChange = (e) => {
    const file = e.target.files[0];
    setPostImage(file);
    setPostImagePreview(URL.createObjectURL(file));
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
          <Avatar
            src={imagePreview || photoURL}
            alt={displayName}
            style={styles.avatar}
          />
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
        {website && (
          <Typography variant="body2">
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.websiteLink}
            >
              {website}
            </a>
          </Typography>
        )}
      </Box>

      <Divider style={{ margin: '20px 0' }} />

      {/* Profile Edit Form */}
      <Box>
        <Typography variant="h6" style={styles.sectionTitle}>
          Edit Your Profile
        </Typography>
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
              style={styles.saveButton}
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Divider style={{ margin: '20px 0' }} />

      {/* My Blogs Section */}
      <Box>
        <Typography variant="h6" style={styles.sectionTitle}>
          My Blogs
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCreateModalOpen(true)}
          style={styles.createButton}
        >
          Create Blog Post
        </Button>
        <UserBlogPosts displayName={displayName} />
      </Box>

      {/* Create Blog Modal */}
      <Modal open={createModalOpen} onClose={() => setCreateModalOpen(false)}>
        <Box sx={styles.modal}>
          <Typography variant="h6" gutterBottom>Create a New Blog Post</Typography>
          <TextField
            label="Title"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            fullWidth
            style={styles.input}
          />
          <TextField
            label="Content"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            fullWidth
            multiline
            rows={4}
            style={styles.input}
          />
          <Box style={styles.imageUpload}>
            <input
              type="file"
              accept="image/*"
              id="post-image-upload"
              style={{ display: 'none' }}
              onChange={handlePostImageChange}
            />
            <label htmlFor="post-image-upload">
              <IconButton color="primary" component="span">
                <AddPhotoAlternateIcon />
              </IconButton>
            </label>
            <Typography variant="body2">Upload an image (optional)</Typography>
          </Box>
          {postImagePreview && (
            <img
              src={postImagePreview}
              alt="Preview"
              style={{ width: '100%', maxHeight: '200px', marginBottom: '15px', borderRadius: '8px' }}
            />
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreatePost}
            fullWidth
            style={styles.saveButton}
          >
            Create Post
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
    backgroundColor: '#fff',
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
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
  },
  editIcon: {
    position: 'absolute',
    top: '110px',
    right: 'calc(50% - 60px)',
    backgroundColor: 'white',
  },
  displayName: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '5px',
  },
  bio: {
    textAlign: 'center',
    color: '#666',
    marginBottom: '10px',
  },
  websiteLink: {
    color: '#1976d2',
    textDecoration: 'none',
    textAlign: 'center',
    display: 'block',
    marginTop: '5px',
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  input: {
    marginBottom: '15px',
  },
  saveButton: {
    padding: '10px',
  },
  createButton: {
    marginBottom: '20px',
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '500px',
    backgroundColor: 'white',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
  },
  imageUpload: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '15px',
  },
};

export default Profile;

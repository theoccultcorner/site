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
  IconButton,
  Modal,
} from '@mui/material';
import { auth } from '../firebaseConfig';
import { db } from '../firebaseConfig';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, doc, getDoc, updateDoc, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [links, setLinks] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({ id: null, title: '', content: '' });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || '');
        setPhotoURL(currentUser.photoURL || '');
        await fetchProfileData(currentUser.uid);
        await fetchBlogs(currentUser.uid);
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

  const fetchBlogs = async (userId) => {
    try {
      const blogsRef = collection(db, `profiles/${userId}/blogs`);
      const querySnapshot = await getDocs(blogsRef);
      const fetchedBlogs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBlogs(fetchedBlogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
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
        photoURL: profileImageUrl,
        bio: bio.trim(),
        website: website.trim(),
        links: links.trim(),
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

  const handleSaveBlog = async () => {
    if (!currentBlog.title || !currentBlog.content) {
      alert('Title and content are required.');
      return;
    }

    try {
      const blogsRef = collection(db, `profiles/${user.uid}/blogs`);
      if (editMode) {
        const blogDoc = doc(db, `profiles/${user.uid}/blogs/${currentBlog.id}`);
        await updateDoc(blogDoc, {
          title: currentBlog.title,
          content: currentBlog.content,
        });
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog.id === currentBlog.id
              ? { ...blog, title: currentBlog.title, content: currentBlog.content }
              : blog
          )
        );
      } else {
        const newDoc = await addDoc(blogsRef, {
          title: currentBlog.title,
          content: currentBlog.content,
        });
        setBlogs([...blogs, { id: newDoc.id, title: currentBlog.title, content: currentBlog.content }]);
      }
    } catch (error) {
      console.error('Error saving blog:', error);
    } finally {
      setModalOpen(false);
      setCurrentBlog({ id: null, title: '', content: '' });
      setEditMode(false);
    }
  };

  const handleEditBlog = (blog) => {
    setCurrentBlog(blog);
    setEditMode(true);
    setModalOpen(true);
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      const blogDoc = doc(db, `profiles/${user.uid}/blogs/${blogId}`);
      await deleteDoc(blogDoc);
      setBlogs(blogs.filter((blog) => blog.id !== blogId));
    } catch (error) {
      console.error('Error deleting blog:', error);
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
              fullWidth
              disabled // Prevent editing of display name
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
            <TextField
              label="Links (e.g., Linktree)"
              value={links}
              onChange={(e) => setLinks(e.target.value)}
              fullWidth
              multiline
              rows={2}
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

      {/* Blog Section */}
      <Box>
        <Typography variant="h6" style={styles.sectionTitle}>
          My Blogs
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModalOpen(true)}
          style={styles.createButton}
        >
          Create Blog Post
        </Button>
        <Grid container spacing={2}>
          {blogs.map((blog) => (
            <Grid item xs={12} key={blog.id}>
              <Paper style={{ padding: '20px' }}>
                <Typography variant="h6">{blog.title}</Typography>
                <Typography variant="body1" style={{ marginBottom: '10px' }}>
                  {blog.content}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEditBlog(blog)}
                  style={{ marginRight: '10px' }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDeleteBlog(blog.id)}
                >
                  Delete
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Create/Edit Blog Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box style={styles.modal}>
          <Typography variant="h6">{editMode ? 'Edit Blog Post' : 'Create Blog Post'}</Typography>
          <TextField
            label="Title"
            value={currentBlog.title}
            onChange={(e) => setCurrentBlog({ ...currentBlog, title: e.target.value })}
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Content"
            value={currentBlog.content}
            onChange={(e) => setCurrentBlog({ ...currentBlog, content: e.target.value })}
            fullWidth
            multiline
            rows={4}
            style={{ marginBottom: '10px' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveBlog}
            fullWidth
          >
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
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  createButton: {
    marginBottom: '20px',
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
};

export default Profile;

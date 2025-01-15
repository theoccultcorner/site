import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Typography,
  Paper,
  Modal,
  Box,
  Grid,
} from '@mui/material';
import { db } from '../firebaseConfig';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const UserBlogManager = ({ userId }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({ id: null, title: '', content: '', imageUrl: '' });
  const [blogImage, setBlogImage] = useState(null);
  const [blogImagePreview, setBlogImagePreview] = useState('');

  useEffect(() => {
    if (!userId) {
      console.error('User ID is missing');
      return;
    }
    fetchBlogs();
  }, [userId]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const blogsRef = collection(db, `profiles/${userId}/blogs`);
      const querySnapshot = await getDocs(blogsRef);
      const fetchedBlogs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBlogs(fetchedBlogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBlog = async () => {
    if (!currentBlog.title || !currentBlog.content) {
      alert('Title and content are required.');
      return;
    }

    let imageUrl = currentBlog.imageUrl;

    if (blogImage) {
      try {
        const storage = getStorage();
        const imageRef = storageRef(storage, `blogImages/${blogImage.name}`);
        const snapshot = await uploadBytes(imageRef, blogImage);
        imageUrl = await getDownloadURL(snapshot.ref);
      } catch (error) {
        console.error('Error uploading blog image:', error);
      }
    }

    try {
      const blogsRef = collection(db, `profiles/${userId}/blogs`);
      if (editMode) {
        const blogDoc = doc(db, `profiles/${userId}/blogs/${currentBlog.id}`);
        await updateDoc(blogDoc, {
          title: currentBlog.title,
          content: currentBlog.content,
          imageUrl,
        });
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog.id === currentBlog.id ? { ...blog, title: currentBlog.title, content: currentBlog.content, imageUrl } : blog
          )
        );
      } else {
        const newDoc = await addDoc(blogsRef, {
          title: currentBlog.title,
          content: currentBlog.content,
          imageUrl,
        });
        setBlogs([...blogs, { id: newDoc.id, title: currentBlog.title, content: currentBlog.content, imageUrl }]);
      }
    } catch (error) {
      console.error('Error saving blog:', error);
    } finally {
      setModalOpen(false);
      setCurrentBlog({ id: null, title: '', content: '', imageUrl: '' });
      setBlogImage(null);
      setBlogImagePreview('');
      setEditMode(false);
    }
  };

  const handleEditBlog = (blog) => {
    setCurrentBlog(blog);
    setBlogImagePreview(blog.imageUrl || '');
    setEditMode(true);
    setModalOpen(true);
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      const blogDoc = doc(db, `profiles/${userId}/blogs/${blogId}`);
      await deleteDoc(blogDoc);
      setBlogs(blogs.filter((blog) => blog.id !== blogId));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleBlogImageChange = (e) => {
    const file = e.target.files[0];
    setBlogImage(file);
    setBlogImagePreview(URL.createObjectURL(file));
  };

  return (
    <Box>
      <Typography variant="h6" style={{ marginBottom: '20px' }}>
        Manage Blogs
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setCurrentBlog({ id: null, title: '', content: '', imageUrl: '' });
          setBlogImage(null);
          setBlogImagePreview('');
          setEditMode(false);
          setModalOpen(true);
        }}
        style={{ marginBottom: '20px' }}
      >
        Create Blog Post
      </Button>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container spacing={2}>
          {blogs.map((blog) => (
            <Grid item xs={12} key={blog.id}>
              <Paper style={{ padding: '20px' }}>
                {blog.imageUrl && (
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
                  />
                )}
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
      )}
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
          <Box style={{ marginBottom: '10px' }}>
            <input
              type="file"
              accept="image/*"
              id="blog-image-upload"
              style={{ display: 'none' }}
              onChange={handleBlogImageChange}
            />
            <label htmlFor="blog-image-upload">
              <Button variant="outlined" component="span">
                Upload Image
              </Button>
            </label>
            {blogImagePreview && (
              <img
                src={blogImagePreview}
                alt="Preview"
                style={{ width: '100%', height: 'auto', marginTop: '10px', borderRadius: '8px' }}
              />
            )}
          </Box>
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
    </Box>
  );
};

const styles = {
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

export default UserBlogManager;

import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getDatabase, ref, onValue, push, update, remove } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Box, Typography, Button, TextField, Modal, Grid, Card, CardContent, CardMedia } from '@mui/material';

function ManageBlogs() {
  const { displayName } = useParams();
  const { state } = useLocation();
  const userId = state?.userId;
  const [blogs, setBlogs] = useState([]);
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogImageFile, setBlogImageFile] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const fetchUserBlogs = () => {
      const db = getDatabase();
      const blogsRef = ref(db, 'blogPosts');
      onValue(blogsRef, (snapshot) => {
        const data = snapshot.val();
        const userBlogs = data
          ? Object.entries(data)
              .map(([key, value]) => ({ id: key, ...value }))
              .filter((blog) => blog.authorId === userId)
          : [];
        setBlogs(userBlogs.reverse());
      });
    };

    if (userId) fetchUserBlogs();
  }, [userId]);

  const handleCreateOrEditBlog = async () => {
    if (!blogTitle.trim() || !blogContent.trim()) return;

    let blogImageUrl = null;
    if (blogImageFile) {
      const storage = getStorage();
      const imageRef = storageRef(storage, `blogImages/${blogImageFile.name}`);
      try {
        const snapshot = await uploadBytes(imageRef, blogImageFile);
        blogImageUrl = await getDownloadURL(snapshot.ref);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    const db = getDatabase();
    const blogsRef = ref(db, 'blogPosts');
    const blogData = {
      title: blogTitle,
      content: blogContent,
      imageUrl: blogImageUrl,
      authorId: userId,
      authorDisplayName: displayName,
      date: new Date().toISOString(),
    };

    try {
      if (selectedBlog) {
        await update(ref(db, `blogPosts/${selectedBlog.id}`), blogData);
      } else {
        await push(blogsRef, blogData);
      }
      setBlogModalOpen(false);
      setBlogTitle('');
      setBlogContent('');
      setBlogImageFile(null);
      setSelectedBlog(null);
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    const db = getDatabase();
    try {
      await remove(ref(db, `blogPosts/${blogId}`));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Manage Blogs for {displayName}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setBlogModalOpen(true)}
        sx={{ marginBottom: '20px' }}
      >
        Create Blog
      </Button>
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog.id}>
            <Card>
              {blog.imageUrl && <CardMedia component="img" height="140" image={blog.imageUrl} />}
              <CardContent>
                <Typography variant="h6">{blog.title}</Typography>
                <Typography variant="body2">{blog.content}</Typography>
                <Typography variant="caption">{new Date(blog.date).toLocaleString()}</Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    setSelectedBlog(blog);
                    setBlogTitle(blog.title);
                    setBlogContent(blog.content);
                    setBlogModalOpen(true);
                  }}
                  sx={{ marginRight: '10px' }}
                >
                  Edit
                </Button>
                <Button variant="outlined" color="error" onClick={() => handleDeleteBlog(blog.id)}>
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal open={blogModalOpen} onClose={() => setBlogModalOpen(false)}>
        <Box sx={{ width: '90%', margin: '50px auto', padding: '20px', backgroundColor: '#fff' }}>
          <Typography variant="h6">{selectedBlog ? 'Edit Blog' : 'Create Blog'}</Typography>
          <TextField
            fullWidth
            label="Title"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            fullWidth
            label="Content"
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
            multiline
            rows={4}
            sx={{ marginBottom: '10px' }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setBlogImageFile(e.target.files[0])}
            style={{ marginBottom: '10px' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateOrEditBlog}
            fullWidth
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default ManageBlogs;

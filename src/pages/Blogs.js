import React, { useState, useEffect } from 'react';
import { Button, TextField, Paper, Typography, Card, CardContent, CardMedia, Modal, Box } from '@mui/material';
import { auth } from '../firebaseConfig';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const Blogs = () => {
  const [user, setUser] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    const fetchData = async () => {
      const db = getDatabase();
      const postsRef = ref(db, 'blogPosts');
      onValue(postsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const postsArray = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          setBlogPosts(postsArray.reverse());
        }
      });
    };

    fetchData();

    return () => {
      unsubscribe();
    };
  }, []);

  const handleUpload = async () => {
    if (!imageFile) return null;
    const storage = getStorage();
    const imageRef = storageRef(storage, `images/${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    return getDownloadURL(imageRef);
  };

  const handlePost = async () => {
    if (!postTitle.trim() || !postContent.trim() || !imageFile) return;

    const db = getDatabase();
    const postData = {
      title: postTitle.trim(),
      content: postContent.trim(),
      author: user.displayName,
      date: new Date().toISOString(),
      comments: [],
    };

    try {
      const imageUrl = await handleUpload();
      if (imageUrl) {
        postData.imageUrl = imageUrl;
      }
      await push(ref(db, 'blogPosts'), postData);
      setPostTitle('');
      setPostContent('');
      setImageFile(null);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const openModal = (post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <div style={styles.container}>
      {user && (
        <Paper style={styles.postForm}>
          <Typography variant="h5" style={styles.formTitle}>
            Create a New Post
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Title"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            style={styles.input}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            style={{ display: 'none' }}
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <Button variant="outlined" component="span" color="primary" style={styles.uploadButton}>
              Upload Image
            </Button>
          </label>
          <TextField
            multiline
            fullWidth
            variant="outlined"
            placeholder="Write your post..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            style={styles.input}
          />
          <Button onClick={handlePost} variant="contained" color="primary" fullWidth>
            Post
          </Button>
        </Paper>
      )}
      <div style={styles.articles}>
        {blogPosts.map((post) => (
          <Card key={post.id} style={styles.articleCard}>
            <CardMedia
              component="img"
              height="140"
              image={post.imageUrl}
              alt="Post image"
              style={styles.articleImage}
            />
            <CardContent>
              <Typography variant="h5">{post.title}</Typography>
              <Typography variant="subtitle1" style={styles.author}>
                {post.author}
              </Typography>
              <Typography variant="subtitle2" style={styles.date}>
                {new Date(post.date).toLocaleString()}
              </Typography>
              <Button onClick={() => openModal(post)} variant="contained" style={styles.readMoreButton}>
                Read More
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal open={modalOpen} onClose={closeModal}>
        <Box style={styles.modal}>
          {selectedPost && (
            <>
              <Typography variant="h4" style={styles.modalTitle}>
                {selectedPost.title}
              </Typography>
              <img src={selectedPost.imageUrl} alt="Post" style={styles.modalImage} />
              <Typography variant="subtitle1" style={styles.modalAuthor}>
                By {selectedPost.author} on {new Date(selectedPost.date).toLocaleString()}
              </Typography>
              <Typography style={styles.modalContent}>{selectedPost.content}</Typography>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  postForm: {
    padding: '20px',
    marginBottom: '20px',
    background: '#f9f9f9',
    borderRadius: '8px',
  },
  input: {
    marginBottom: '20px',
  },
  articles: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  articleCard: {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxHeight: '80%',
    overflowY: 'auto',
    backgroundColor: 'white',
    border: '2px solid #000',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    marginBottom: '20px',
  },
  modalImage: {
    width: '100%',
    marginBottom: '20px',
    borderRadius: '8px',
  },
  modalAuthor: {
    marginBottom: '10px',
    color: '#666',
  },
  modalContent: {
    lineHeight: '1.6',
  },
};

export default Blogs;

import React, { useState, useEffect } from 'react';
import { Button, IconButton, Avatar, TextField, Paper, Typography, Divider } from '@mui/material';
import { auth } from '../firebaseConfig';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

import DeleteButton from './DeleteButton';
import Comments from './Comments';

const Blogs = () => {
  const [user, setUser] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [imageFile, setImageFile] = useState(null);

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
    if (!imageFile) return null; // No file selected
    const storage = getStorage();
    const imageRef = storageRef(storage, `images/${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    return getDownloadURL(imageRef); // Get download URL after upload
  };

  const handlePost = async () => {
    if (!postTitle.trim() || !commentText.trim() || !imageFile) return;

    const db = getDatabase();
    const postData = {
      title: postTitle.trim(),
      content: commentText.trim(),
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
      setCommentText('');
      setImageFile(null);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleComment = async (postId) => {
    if (!commentText.trim()) return;
    const db = getDatabase();
    const commentsRef = ref(db, `blogPosts/${postId}/comments`);
    await push(commentsRef, {
      text: commentText.trim(),
      userId: user.uid,
      userName: user.displayName,
      timestamp: new Date().toISOString(),
    });
    setCommentText('');
  };

  const handleLike = async (postId) => {
    const db = getDatabase();
    const likesRef = ref(db, `blogPosts/${postId}/likes/${user.uid}`);
    await push(likesRef, true);
  };

  return (
    <div style={styles.container}>
      {user && (
        <Paper style={styles.postForm}>
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
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            style={styles.input}
          />
          <Button onClick={handlePost} variant="contained" color="primary">
            Post
          </Button>
        </Paper>
      )}
      <div style={styles.articles}>
        {blogPosts.map((post) => (
          <Paper key={post.id} style={styles.article}>
            <Typography variant="h5" style={styles.articleTitle}>
              {post.title}
            </Typography>
            <Typography variant="subtitle2" style={styles.articleMeta}>
              By {post.author} | {post.date}
            </Typography>
            {user && <DeleteButton postId={post.id} />}
            <Divider style={{ margin: '10px 0' }} />
            {post.imageUrl && <img src={post.imageUrl} alt="Post" style={styles.image} />}
            <Typography style={styles.articleContent}>{post.content}</Typography>
            <Comments postId={post.id} user={user} comments={post.comments} />
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              style={styles.input}
            />
            <Button onClick={() => handleComment(post.id)} variant="contained" color="primary">
              Comment
            </Button>
            {user && (
              <IconButton onClick={() => handleLike(post.id)}>
                {user.photoURL ? (
                  <Avatar src={user.photoURL} alt={user.displayName} />
                ) : (
                  <Avatar>{user.displayName.charAt(0)}</Avatar>
                )}
              </IconButton>
            )}
          </Paper>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  postForm: {
    padding: '20px',
    marginBottom: '20px',
  },
  input: {
    marginBottom: '20px',
  },
  uploadButton: {
    marginBottom: '20px',
  },
  articles: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  article: {
    padding: '20px',
    background: '#fff',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  articleTitle: {
    marginBottom: '10px',
  },
  articleMeta: {
    color: '#666',
    marginBottom: '10px',
  },
  image: {
    width: '100%',
    marginBottom: '10px',
    borderRadius: '8px',
  },
  articleContent: {
    marginBottom: '10px',
  },
};

export default Blogs;

import React, { useState, useEffect } from 'react';
import { Button, Avatar, TextField, Paper, Typography, Divider } from '@mui/material';
import { auth } from '../firebaseConfig';
import { getDatabase, ref, onValue, push, update, remove } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import DeleteButton from './DeleteButton';
import Comments from './Comments';
import Likes from './Likes';

const Blogs = () => {
  const [user, setUser] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);

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
      if (editingPostId) {
        await update(ref(db, `blogPosts/${editingPostId}`), postData);
        setEditingPostId(null);
      } else {
        await push(ref(db, 'blogPosts'), postData);
      }
      setPostTitle('');
      setPostContent('');
      setCommentText('');
      setImageFile(null);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleDelete = async (postId) => {
    const db = getDatabase();
    if (window.confirm('Are you sure you want to delete this post?')) {
      await remove(ref(db, `blogPosts/${postId}`));
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
            {editingPostId ? 'Update Post' : 'Post'}
          </Button>
        </Paper>
      )}
      <div style={styles.articles}>
        {blogPosts.map((post) => (
          <Paper key={post.id} style={styles.article}>
            <Typography variant="h5" style={styles.articleTitle}>
              {post.title}
            </Typography>
            <div style={styles.authorSection}>
              <Avatar src={user?.photoURL} alt={user?.displayName} style={styles.avatar} />
              <Typography variant="subtitle1" style={styles.authorName}>
                {post.author}
              </Typography>
            </div>
            <Typography variant="subtitle2" style={styles.date}>
              {new Date(post.date).toLocaleString()}
            </Typography>
            <Divider style={{ margin: '10px 0' }} />
            {post.imageUrl && <img src={post.imageUrl} alt="Post" style={styles.image} />}
            <Typography style={styles.articleContent}>{post.content}</Typography>
            <Comments
              postId={post.id}
              user={user}
              comments={post.comments}
              allowDelete={user && user.uid === post.userId}
            />
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              style={styles.input}
            />
            <Button onClick={() => handleComment(post.id)} variant="contained" color="primary" style={styles.commentButton}>
              Comment
            </Button>
            <Likes postId={post.id} user={user} />
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
    background: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  formTitle: {
    marginBottom: '15px',
    fontWeight: 'bold',
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
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)',
    borderRadius: '8px',
  },
  articleTitle: {
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  authorSection: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  avatar: {
    marginRight: '10px',
  },
  authorName: {
    fontWeight: 'bold',
  },
  date: {
    marginBottom: '10px',
    color: '#666',
  },
  image: {
    width: '100%',
    marginBottom: '10px',
    borderRadius: '8px',
  },
  articleContent: {
    marginBottom: '10px',
  },
  commentButton: {
    marginTop: '10px',
  },
};

export default Blogs;

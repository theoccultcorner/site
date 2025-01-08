import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Card, CardContent, CardMedia, Modal, Box } from '@mui/material';
import { auth } from '../firebaseConfig';
import { getDatabase, ref, onValue, update, remove } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const Blogs = () => {
  const [user, setUser] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [readMoreModalOpen, setReadMoreModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postToDelete, setPostToDelete] = useState(null);

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
          const postsArray = Object.entries(data)
            .map(([key, value]) => ({ id: key, ...value }))
            .filter((post) => post.title && post.content); // Exclude blank posts
          setBlogPosts(postsArray.reverse());
        } else {
          setBlogPosts([]); // Clear posts if database is empty
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
    try {
      await uploadBytes(imageRef, imageFile);
      return await getDownloadURL(imageRef);
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleEditModalOpen = (post) => {
    setSelectedPost(post);
    setPostTitle(post.title);
    setPostContent(post.content);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setSelectedPost(null);
    setPostTitle('');
    setPostContent('');
    setImageFile(null);
  };

  const handleEditPost = async () => {
    if (!selectedPost || !postTitle.trim() || !postContent.trim()) {
      alert('Title and Content are required.');
      return;
    }

    const db = getDatabase();
    const updatedPostData = {
      title: postTitle.trim(),
      content: postContent.trim(),
      author: user.displayName,
      date: new Date().toISOString(),
    };

    try {
      if (imageFile) {
        const imageUrl = await handleUpload();
        if (imageUrl) {
          updatedPostData.imageUrl = imageUrl;
        }
      } else if (selectedPost.imageUrl) {
        updatedPostData.imageUrl = selectedPost.imageUrl;
      }

      await update(ref(db, `blogPosts/${selectedPost.id}`), updatedPostData);

      setPostTitle('');
      setPostContent('');
      setImageFile(null);
      setSelectedPost(null);
      setEditModalOpen(false);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleReadMoreModalOpen = (post) => {
    setSelectedPost(post);
    setReadMoreModalOpen(true);
  };

  const handleReadMoreModalClose = () => {
    setReadMoreModalOpen(false);
    setSelectedPost(null);
  };

  const handleDeleteModalOpen = (post) => {
    setPostToDelete(post);
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
    setPostToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    const db = getDatabase();
    try {
      if (postToDelete) {
        await remove(ref(db, `blogPosts/${postToDelete.id}`));
        setPostToDelete(null);
        setDeleteModalOpen(false);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div style={styles.container}>
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
              <Button
                onClick={() => handleReadMoreModalOpen(post)}
                variant="contained"
                style={styles.readMoreButton}
              >
                Read More
              </Button>
              {user && user.displayName === post.author && (
                <div>
                  <Button
                    onClick={() => handleEditModalOpen(post)}
                    variant="outlined"
                    style={styles.editButton}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteModalOpen(post)}
                    variant="outlined"
                    color="error"
                    style={styles.deleteButton}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Read More Modal */}
      <Modal open={readMoreModalOpen} onClose={handleReadMoreModalClose}>
        <Box style={styles.modal}>
          {selectedPost && (
            <>
              <Typography variant="h4" style={styles.modalTitle}>
                {selectedPost.title}
              </Typography>
              <img
                src={selectedPost.imageUrl}
                alt="Post"
                style={styles.modalImage}
              />
              <Typography variant="subtitle1" style={styles.modalAuthor}>
                By {selectedPost.author} on {new Date(selectedPost.date).toLocaleString()}
              </Typography>
              <Typography style={styles.modalContent}>{selectedPost.content}</Typography>
            </>
          )}
        </Box>
      </Modal>

      {/* Edit Modal */}
      <Modal open={editModalOpen} onClose={handleEditModalClose}>
        <Box style={styles.modal}>
          <Typography variant="h4" style={styles.modalTitle}>
            Edit Post
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Title"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            style={styles.input}
          />
          <TextField
            multiline
            fullWidth
            variant="outlined"
            label="Content"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            style={styles.input}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            style={{ display: 'none' }}
            id="image-upload-edit"
          />
          <label htmlFor="image-upload-edit">
            <Button
              variant="outlined"
              component="span"
              color="primary"
              style={styles.uploadButton}
            >
              Upload New Image
            </Button>
          </label>
          <Button
            onClick={handleEditPost}
            variant="contained"
            color="primary"
            fullWidth
            style={styles.saveButton}
          >
            Save Changes
          </Button>
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={deleteModalOpen} onClose={handleDeleteModalClose}>
        <Box style={styles.confirmationModal}>
          <Typography variant="h5" style={styles.modalTitle}>
            Are you sure you want to delete this post?
          </Typography>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            style={styles.confirmButton}
          >
            Yes
          </Button>
          <Button
            onClick={handleDeleteModalClose}
            variant="outlined"
            style={styles.cancelButton}
          >
            No
          </Button>
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
    maxWidth: '500px',
    maxHeight: '80%',
    overflowY: 'auto',
    backgroundColor: 'white',
    border: '2px solid #000',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  confirmationModal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    backgroundColor: 'white',
    border: '2px solid #000',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
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
    whiteSpace: 'pre-wrap',
  },
  input: {
    marginBottom: '20px',
  },
  uploadButton: {
    marginBottom: '20px',
  },
  saveButton: {
    marginTop: '20px',
  },
  deleteButton: {
    marginTop: '10px',
  },
  editButton: {
    marginTop: '10px',
    marginRight: '10px',
  },
  confirmButton: {
    marginTop: '10px',
    marginRight: '10px',
  },
  cancelButton: {
    marginTop: '10px',
  },
};

export default Blogs;

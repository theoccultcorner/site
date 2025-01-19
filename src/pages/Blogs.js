import React, { useState, useEffect } from 'react';
import { Button, Typography, Card, CardContent, CardMedia, Modal, Box } from '@mui/material';
import { getDatabase, ref, onValue } from 'firebase/database';

const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [readMoreModalOpen, setReadMoreModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase();
      const postsRef = ref(db, 'blogPosts');
      onValue(postsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const postsArray = Object.entries(data)
            .map(([key, value]) => ({ id: key, ...value }))
            .filter((post) => post.title && post.content);
          setBlogPosts(postsArray.reverse());
        } else {
          setBlogPosts([]);
        }
      });
    };

    fetchData();
  }, []);

  const handleReadMoreModalOpen = (post) => {
    setSelectedPost(post);
    setReadMoreModalOpen(true);
  };

  const handleReadMoreModalClose = () => {
    setReadMoreModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.articles}>
        {blogPosts.map((post) => (
          <Card key={post.id} style={styles.articleCard}>
            <CardMedia
              component="img"
              height="140"
              image={post.imageUrl || 'https://via.placeholder.com/150'}
              alt="Post image"
              style={styles.articleImage}
            />
            <CardContent>
              <Typography variant="h5">{post.title}</Typography>
              <Typography variant="subtitle1" style={styles.author}>
                {`By: ${post.authorDisplayName || "Unknown Author"}`}
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
                src={selectedPost.imageUrl || 'https://via.placeholder.com/150'}
                alt="Post"
                style={styles.modalImage}
              />
              <Typography variant="subtitle1" style={styles.modalAuthor}>
                {`By: ${selectedPost.authorDisplayName || "Unknown Author"} on ${new Date(
                  selectedPost.date
                ).toLocaleString()}`}
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
    maxWidth: 500,
    maxHeight: '80%',
    overflowY: 'auto',
    backgroundColor: 'white',
    border: '2px solid #000',
    borderRadius: '8px',
    padding: '20px',
  },
  modalTitle: { marginBottom: '20px' },
  modalImage: { width: '100%', marginBottom: '20px', borderRadius: '8px' },
  modalAuthor: { marginBottom: '10px', color: '#666' },
  modalContent: { lineHeight: '1.6', whiteSpace: 'pre-wrap' },
};

export default Blogs;

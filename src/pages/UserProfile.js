import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { getDatabase, ref, onValue } from 'firebase/database';
import { db } from '../firebaseConfig';
import { Avatar, Card, CardContent, Typography, Modal, Box, Grid } from '@mui/material';

function UserProfile() {
  const { displayName } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileRef = doc(db, 'profiles', displayName);
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
          setProfile({ id: profileSnap.id, ...profileSnap.data() });
        } else {
          console.log('No such document!');
          setProfile({ id: profileRef.id, displayName, email: '', bio: '', website: '' });
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchBlogPosts = () => {
      const db = getDatabase();
      const postsRef = ref(db, 'blogPosts');
      onValue(postsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const postsArray = Object.entries(data)
            .map(([key, value]) => ({ id: key, ...value }))
            .filter((post) => post.author === displayName);
          setBlogPosts(postsArray.reverse());
        }
      });
    };

    fetchProfile();
    fetchBlogPosts();
  }, [displayName]);

  const openModal = (post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPost(null);
  };

  if (loading) {
    return <Typography variant="h6" align="center" style={{ marginTop: '20px' }}>Loading...</Typography>;
  }

  if (!profile) {
    return <Typography variant="h6" align="center" style={{ marginTop: '20px' }}>Profile not found.</Typography>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <Card sx={{ maxWidth: 600, padding: '20px', textAlign: 'center' }}>
          <CardContent>
            <Avatar
              src={profile.photoURL}
              alt={profile.displayName}
              sx={{
                width: 120,
                height: 120,
                margin: '0 auto 20px auto',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Typography variant="h5" gutterBottom>
              {profile.displayName || 'No Display Name'}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {profile.email ? (
                <a
                  href={`mailto:${profile.email}`}
                  style={{ color: '#1976d2', textDecoration: 'none' }}
                >
                  {profile.email}
                </a>
              ) : (
                'No Email Available'
              )}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {profile.bio || 'No Bio Available'}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              {profile.website ? (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#1976d2', textDecoration: 'none' }}
                >
                  {profile.website}
                </a>
              ) : (
                'No Website Available'
              )}
            </Typography>
          </CardContent>
        </Card>
      </div>

      <Typography variant="h6" gutterBottom>
        Blog Posts by {profile.displayName}
      </Typography>
      <Grid container spacing={3}>
        {blogPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card sx={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => openModal(post)}>
              <CardContent>
                <Typography variant="h6">{post.title}</Typography>
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    style={{ width: '100%', height: '150px', objectFit: 'cover', marginTop: '10px' }}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal open={modalOpen} onClose={closeModal}>
        <Box sx={styles.modal}>
          {selectedPost && (
            <>
              <Typography variant="h4" gutterBottom>
                {selectedPost.title}
              </Typography>
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.title}
                style={{ width: '100%', marginBottom: '20px', borderRadius: '8px' }}
              />
              <Typography variant="body1">{selectedPost.content}</Typography>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}

const styles = {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxHeight: '90%',
    overflowY: 'auto',
    backgroundColor: 'white',
    border: '2px solid #000',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
};

export default UserProfile;

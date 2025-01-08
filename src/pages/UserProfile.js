import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Avatar, Typography, Grid, Card, CardContent, Paper, Divider } from '@mui/material';

function UserProfile() {
  const { displayName } = useParams(); // Get displayName from route params
  const [profile, setProfile] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profilesRef = collection(db, 'profiles');
        const q = query(profilesRef, where('displayName', '==', displayName));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const profileData = querySnapshot.docs[0].data(); // Assuming displayName is unique
          setProfile(profileData);
        } else {
          console.error('No profile found for displayName:', displayName);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchBlogPosts = () => {
      const database = getDatabase();
      const postsRef = ref(database, 'blogPosts');
      onValue(postsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const postsArray = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          const userPosts = postsArray.filter(
            (post) => post.author?.toLowerCase() === displayName.toLowerCase()
          );
          setBlogPosts(userPosts);
        }
      });
    };

    fetchProfile();
    fetchBlogPosts();
  }, [displayName]);

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  if (!profile) {
    return <Typography variant="h6" align="center">User profile not found.</Typography>;
  }

  return (
    <div style={{ padding: '20px' }}>
      {/* Profile Details */}
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', textAlign: 'center' }}>
        <Avatar
          src={profile.photoURL}
          alt={profile.displayName}
          sx={{
            width: 100,
            height: 100,
            margin: '0 auto',
            marginBottom: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Typography variant="h5" gutterBottom>{profile.displayName}</Typography>
        <Typography variant="body1" color="textSecondary">{profile.bio || 'No bio available'}</Typography>
        {profile.website && (
          <Typography variant="body2">
            <a href={profile.website} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#1976d2' }}>
              {profile.website}
            </a>
          </Typography>
        )}
      </Paper>

      <Divider style={{ margin: '20px 0' }} />

      {/* Blog Posts */}
      <Typography variant="h6" gutterBottom>
        Blog Posts by {profile.displayName}
      </Typography>
      <Grid container spacing={3}>
        {blogPosts.length > 0 ? (
          blogPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card>
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                  />
                )}
                <CardContent>
                  <Typography variant="h6">{post.title}</Typography>
                  <Typography variant="body2" style={{ marginTop: '10px' }}>
                    {post.content.substring(0, 100)}...
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body2" align="center" style={{ width: '100%' }}>
            No blog posts available.
          </Typography>
        )}
      </Grid>
    </div>
  );
}

export default UserProfile;

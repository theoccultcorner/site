import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { getDatabase, ref, onValue } from 'firebase/database';
import { db } from '../firebaseConfig';
import { Avatar, Typography, Paper, Box, Grid, Card, CardContent, CardMedia } from '@mui/material';

function UserProfile() {
  const { displayName } = useParams(); // Get displayName from URL
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const sanitizeDisplayName = (name) =>
    name.replace(/\s+/g, '').replace(/[^a-zA-Z0-9()]/g, ''); // Same sanitization logic

  useEffect(() => {
    const fetchUserAndBlogs = async () => {
      try {
        // Fetch user profile
        const querySnapshot = await getDocs(collection(db, 'profiles'));
        const sanitizedDisplayName = sanitizeDisplayName(displayName);
        const matchingProfile = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .find((profile) => sanitizeDisplayName(profile.displayName) === sanitizedDisplayName);

        if (matchingProfile) {
          setUser(matchingProfile);

          // Fetch blogs associated with the user
          const db = getDatabase();
          const blogsRef = ref(db, 'blogPosts');
          onValue(blogsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
              const userBlogs = Object.entries(data)
                .map(([key, value]) => ({ id: key, ...value }))
                .filter((blog) => blog.authorId === matchingProfile.id);
              setBlogs(userBlogs.reverse());
            } else {
              setBlogs([]);
            }
          });
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching user profile or blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndBlogs();
  }, [displayName]);

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  if (!user) {
    return <Typography variant="h6" align="center">User not found.</Typography>;
  }

  return (
    <Paper style={styles.paper}>
      {/* User Profile Section */}
      <Box style={styles.profileHeader}>
        <Avatar
          src={user.photoURL}
          alt={user.displayName}
          style={styles.avatar}
        />
        <Typography variant="h5" style={styles.displayName}>
          {user.displayName}
        </Typography>
        <Typography variant="body2" style={styles.bio}>
          {user.bio || 'No bio available'}
        </Typography>
        {user.email && (
          <Typography variant="body2" style={styles.email}>
            <a href={`mailto:${user.email}`} style={styles.emailLink}>
              {user.email}
            </a>
          </Typography>
        )}
        {user.website && (
          <Typography variant="body2">
            <a
              href={user.website}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.websiteLink}
            >
              {user.website}
            </a>
          </Typography>
        )}
        {user.links && (
          <Box style={styles.linksContainer}>
            <Typography variant="h6" style={styles.linksTitle}>
              Additional Links
            </Typography>
            <ul style={styles.linksList}>
              {user.links.split(',').map((link, index) => (
                <li key={index} style={styles.linksItem}>
                  <a
                    href={link.trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.link}
                  >
                    {link.trim()}
                  </a>
                </li>
              ))}
            </ul>
          </Box>
        )}
      </Box>

      {/* User Blogs Section */}
      <Box>
        <Typography variant="h6" style={{ marginTop: '20px', marginBottom: '10px' }}>
          {user.displayName}'s Blogs
        </Typography>
        <Grid container spacing={3}>
          {blogs.length === 0 ? (
            <Typography>No blogs found.</Typography>
          ) : (
            blogs.map((blog) => (
              <Grid item xs={12} sm={6} md={4} key={blog.id}>
                <Card>
                  {blog.imageUrl && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={blog.imageUrl}
                      alt={blog.title}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6">{blog.title}</Typography>
                    <Typography variant="body2">{blog.content}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {new Date(blog.date).toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Paper>
  );
}

const styles = {
  paper: {
    padding: '20px',
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
  },
  avatar: {
    width: '100px',
    height: '100px',
    marginBottom: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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
  email: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '10px',
  },
  emailLink: {
    color: '#1976d2',
    textDecoration: 'none',
  },
  websiteLink: {
    color: '#1976d2',
    textDecoration: 'none',
    textAlign: 'center',
  },
  linksContainer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  linksTitle: {
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  linksList: {
    listStyleType: 'none',
    padding: 0,
  },
  linksItem: {
    marginBottom: '10px',
  },
  link: {
    color: '#1976d2',
    textDecoration: 'none',
  },
};

export default UserProfile;

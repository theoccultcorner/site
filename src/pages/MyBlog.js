import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Typography, Card, CardContent, Grid, CardMedia } from '@mui/material';
import { auth } from '../firebaseConfig';

const MyBlog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchUserPosts(currentUser.displayName);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserPosts = (displayName) => {
    const db = getDatabase();
    const postsRef = ref(db, 'blogPosts');
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userPosts = Object.entries(data)
          .map(([key, value]) => ({
            id: key,
            ...value,
          }))
          .filter((post) => post.author?.toLowerCase() === displayName?.toLowerCase());
        setBlogPosts(userPosts.reverse());
      }
    });
  };

  if (!user) {
    return <Typography variant="h6" align="center">Please log in to view your blog posts.</Typography>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h6" gutterBottom>
        My Blog Posts
      </Typography>
      <Grid container spacing={3}>
        {blogPosts.length > 0 ? (
          blogPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card>
                {post.imageUrl && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={post.imageUrl}
                    alt={post.title}
                  />
                )}
                <CardContent>
                  <Typography variant="h6">{post.title}</Typography>
                  <Typography variant="body2" style={{ marginTop: '10px' }}>
                    {post.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" style={{ marginTop: '20px', width: '100%' }}>
            No blog posts available.
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default MyBlog;

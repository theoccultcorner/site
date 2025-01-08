import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

function UserBlogPosts({ displayName }) {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!displayName) {
      setLoading(false);
      return;
    }

    const fetchBlogPosts = () => {
      const db = getDatabase();
      const postsRef = ref(db, 'blogPosts');
      onValue(postsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const postsArray = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          // Filter posts by matching `author` with `displayName`
          const userPosts = postsArray.filter(
            (post) =>
              post.author &&
              post.author.trim().toLowerCase() === displayName.trim().toLowerCase()
          );
          setBlogPosts(userPosts.reverse());
        } else {
          setBlogPosts([]);
        }
        setLoading(false);
      });
    };

    fetchBlogPosts();
  }, [displayName]);

  if (loading) {
    return <Typography variant="h6" align="center">Loading blog posts...</Typography>;
  }

  if (blogPosts.length === 0) {
    return <Typography variant="body1" align="center">No blog posts available.</Typography>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h6" gutterBottom>
        Blog Posts by {displayName}
      </Typography>
      <Grid container spacing={3}>
        {blogPosts.map((post) => (
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
        ))}
      </Grid>
    </div>
  );
}

export default UserBlogPosts;

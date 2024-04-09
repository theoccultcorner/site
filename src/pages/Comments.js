import React, { useState, useEffect } from 'react';
import { Grid, IconButton, Avatar, Typography } from '@mui/material';
import { getDatabase, ref, onValue, remove } from 'firebase/database';

const Comments = ({ postId, user }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const commentsRef = ref(db, `blogPosts/${postId}/comments`);
    
    // Listen for changes in comments and update state
    onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const commentsArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setComments(commentsArray);
      } else {
        setComments([]);
      }
    });
  }, [postId]);

  const handleDeleteComment = async (commentId) => {
    const db = getDatabase();
    const commentRef = ref(db, `blogPosts/${postId}/comments/${commentId}`);
    await remove(commentRef);
  };

  return (
    <div>
      {/* Render each comment */}
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} user={user} onDelete={handleDeleteComment} />
      ))}
    </div>
  );
};

const Comment = ({ comment, user, onDelete }) => {
  return (
    <Grid container spacing={2} alignItems="flex-start" style={{ marginTop: '16px' }}>
      <Grid item>
        <Avatar src={user && user.photoURL} />
      </Grid>
      <Grid item xs>
        <Typography variant="body1" style={{ marginBottom: '8px' }}>
          <strong>{comment.userName}</strong>: {comment.text}
        </Typography>
        {user && user.uid === comment.userId && (
          <IconButton onClick={() => onDelete(comment.id)}>
            Delete
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
};

export default Comments;

import React from 'react';
import { Button } from '@mui/material';
import { getDatabase, ref, remove } from 'firebase/database';

const DeleteButton = ({ postId, user }) => {
  const handleDeletePost = async () => {
    const db = getDatabase();
    await remove(ref(db, `blogPosts/${postId}`));
  };

  return (
    // Render the button only if the user owns the post
    user && (
      <Button onClick={handleDeletePost} color="error">
        Delete
      </Button>
    )
  );
};

export default DeleteButton;

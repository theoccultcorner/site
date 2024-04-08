import React from 'react';
import { Button } from '@mui/material';
import { getDatabase, ref, remove } from 'firebase/database';

const DeleteButton = ({ postId }) => {
  const handleDeletePost = async () => {
    const db = getDatabase();
    await remove(ref(db, `blogPosts/${postId}`));
  };

  return (
    <Button onClick={handleDeletePost} color="error">Delete</Button>
  );
};

export default DeleteButton;

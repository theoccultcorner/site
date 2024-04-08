import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { getDatabase, ref, set, onValue } from 'firebase/database';

const Likes = ({ postId, user }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    const db = getDatabase();
    const likesRef = ref(db, `blogPosts/${postId}/likes`);
    onValue(likesRef, (snapshot) => {
      const likes = snapshot.val();
      if (likes) {
        setLikesCount(Object.keys(likes).length);
        setLiked(user.uid in likes);
      } else {
        setLikesCount(0);
        setLiked(false);
      }
    });
  }, [postId, user]);

  const handleLike = async () => {
    if (!user) return;
    const db = getDatabase();
    const likesRef = ref(db, `blogPosts/${postId}/likes/${user.uid}`);
    if (!liked) {
      await set(likesRef, true);
      setLiked(true);
      setLikesCount((prevCount) => prevCount + 1);
    } else {
      // Unlike
      await set(likesRef, null);
      setLiked(false);
      setLikesCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <div>
      <Button onClick={handleLike}>{liked ? 'Unlike' : 'Like'} ({likesCount})</Button>
    </div>
  );
};

export default Likes;

import React, { useState, useEffect } from 'react';
import { Button, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { getDatabase, ref, set, onValue, get } from 'firebase/database';

const Likes = ({ postId, user }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [likers, setLikers] = useState([]);
  const [open, setOpen] = useState(false);
  const [userNames, setUserNames] = useState({});

  useEffect(() => {
    if (!user) return;
    const db = getDatabase();
    const likesRef = ref(db, `blogPosts/${postId}/likes`);
    onValue(likesRef, (snapshot) => {
      const likes = snapshot.val();
      if (likes) {
        setLikesCount(Object.keys(likes).length);
        setLiked(user.uid in likes);
        setLikers(Object.keys(likes));
        setUserNames({}); // Reset userNames state
        fetchUserNames(Object.keys(likes)); // Fetch user names
      } else {
        setLikesCount(0);
        setLiked(false);
        setLikers([]);
        setUserNames({});
      }
    });
  }, [postId, user]);

  const fetchUserNames = async (userIds) => {
    const db = getDatabase();
    const promises = userIds.map(async (userId) => {
      if (userId === user.uid) {
        return { [userId]: user.displayName };
      } else {
        const userSnapshot = await get(ref(db, `profiles/${userId}/displayName`));
        return { [userId]: userSnapshot.val() };
      }
    });
    Promise.all(promises).then((results) => {
      const userNamesObj = results.reduce((acc, result) => ({ ...acc, ...result }), {});
      setUserNames(userNamesObj);
    });
  };

  const handleLike = async () => {
    if (!user) return;
    const db = getDatabase();
    const likesRef = ref(db, `blogPosts/${postId}/likes/${user.uid}`);
    const likedSnapshot = await get(likesRef);

    if (!likedSnapshot.exists()) {
      await set(likesRef, true);
      setLiked(true);
    } else {
      await set(likesRef, null);
      setLiked(false);
    }

    refreshLikesCount();
  };

  const refreshLikesCount = () => {
    const db = getDatabase();
    const likesRef = ref(db, `blogPosts/${postId}/likes`);
    onValue(likesRef, (snapshot) => {
      const likes = snapshot.val();
      if (likes) {
        setLikesCount(Object.keys(likes).length);
        setLikers(Object.keys(likes));
        setUserNames({});
        fetchUserNames(Object.keys(likes));
      } else {
        setLikesCount(0);
        setLikers([]);
        setUserNames({});
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button onClick={handleLike}>{liked ? 'Unlike' : 'Like'} ({likesCount})</Button>
      <Button onClick={handleOpen}>({likesCount}) Likers</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Likers</DialogTitle>
        <DialogContent>
          <List>
            {likers.map((likerId) => (
              <ListItem key={likerId}>
                <ListItemText primary={userNames[likerId]} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Likes;

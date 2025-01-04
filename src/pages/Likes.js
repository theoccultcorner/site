import React, { useState, useEffect, useCallback } from 'react';
import { Button, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { getDatabase, ref, set, onValue, get } from 'firebase/database';

const Likes = ({ postId, user }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [likers, setLikers] = useState([]);
  const [open, setOpen] = useState(false);
  const [userNames, setUserNames] = useState({});

  const fetchUserNames = useCallback(async (userIds) => {
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
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const db = getDatabase();
    const likesRef = ref(db, `blogPosts/${postId}/likes`);
    onValue(likesRef, (snapshot) => {
      const likes = snapshot.val();
      if (likes) {
        const likerIds = Object.keys(likes);
        setLikesCount(likerIds.length);
        setLiked(user.uid in likes);
        setLikers(likerIds);
        setUserNames({});
        fetchUserNames(likerIds);
      } else {
        setLikesCount(0);
        setLiked(false);
        setLikers([]);
        setUserNames({});
      }
    });
  }, [postId, user, fetchUserNames]);

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
                <ListItemText primary={userNames[likerId] || 'Loading...'} />
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

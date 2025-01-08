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
    if (!userIds || userIds.length === 0) return;

    const db = getDatabase();
    const userNamesObj = {};

    for (const userId of userIds) {
      try {
        const userSnapshot = await get(ref(db, `profiles/${userId}/displayName`));
        if (userSnapshot.exists()) {
          userNamesObj[userId] = userSnapshot.val();
        } else {
          console.warn(`No displayName found for userId: ${userId}`);
          userNamesObj[userId] = 'Anonymous';
        }
      } catch (error) {
        console.error(`Error fetching displayName for userId: ${userId}`, error);
        userNamesObj[userId] = 'Anonymous';
      }
    }

    setUserNames((prev) => ({ ...prev, ...userNamesObj }));
  }, []);

  useEffect(() => {
    if (!postId || !user) return;

    const db = getDatabase();
    const likesRef = ref(db, `messages/${postId}/likes`);
    onValue(likesRef, (snapshot) => {
      const likes = snapshot.val();
      if (likes) {
        const likerIds = Object.keys(likes);
        setLikesCount(likerIds.length);
        setLiked(!!likes[user.uid]);
        setLikers(likerIds);
        fetchUserNames(likerIds); // Fetch usernames of the likers
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
    const likesRef = ref(db, `messages/${postId}/likes/${user.uid}`);

    const likedSnapshot = await get(likesRef);
    if (likedSnapshot.exists()) {
      await set(likesRef, null); // Unlike
    } else {
      await set(likesRef, true); // Like
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleLike}>{liked ? 'Unlike' : 'Like'} ({likesCount})</Button>
      <Button onClick={handleOpen}>Likers ({likesCount})</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Likers</DialogTitle>
        <DialogContent>
          <List>
            {likers.length > 0 ? (
              likers.map((likerId) => (
                <ListItem key={likerId}>
                  <ListItemText primary={userNames[likerId] || 'Loading...'} />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No likers yet" />
              </ListItem>
            )}
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

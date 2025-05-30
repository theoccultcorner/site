import React, { useState, useEffect, useCallback } from 'react';
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button, // Add this import
} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { getDatabase, ref, set, onValue, get } from 'firebase/database';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';


const Likes = ({ postId, user }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [likers, setLikers] = useState([]);
  const [open, setOpen] = useState(false);
  const [userNames, setUserNames] = useState({});

  const fetchUserNames = useCallback(async (userIds) => {
    if (!userIds || userIds.length === 0) return;

    const userNamesObj = {};
    await Promise.all(
      userIds.map(async (userId) => {
        try {
          const userRef = doc(db, 'profiles', userId);
          const userSnap = await getDoc(userRef);
          userNamesObj[userId] = userSnap.exists()
            ? userSnap.data().displayName || 'Anonymous'
            : 'Anonymous';
        } catch (error) {
          console.error(`Error fetching displayName for userId: ${userId}`, error);
          userNamesObj[userId] = 'Anonymous';
        }
      })
    );

    setUserNames((prev) => ({ ...prev, ...userNamesObj }));
  }, []);

  useEffect(() => {
    if (!postId || !user) return;

    const db = getDatabase();
    const likesRef = ref(db, `messages/${postId}/likes`);

    const unsubscribe = onValue(likesRef, (snapshot) => {
      const likes = snapshot.val();
      if (likes) {
        const likerIds = Object.keys(likes);
        setLikesCount(likerIds.length);
        setLiked(!!likes[user.uid]);
        setLikers(likerIds);
        fetchUserNames(likerIds);
      } else {
        setLikesCount(0);
        setLiked(false);
        setLikers([]);
        setUserNames({});
      }
    });

    return () => unsubscribe();
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
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {/* Like Button */}
      <IconButton onClick={handleLike} color={liked ? 'primary' : 'default'}>
        {liked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
      </IconButton>

      {/* Likes Count */}
      <Typography
        variant="body2"
        onClick={handleOpen}
        style={{ cursor: 'pointer', color: '#1976d2', fontWeight: 'bold' }}
      >
        {likesCount}
      </Typography>

      {/* Likers Dialog */}
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

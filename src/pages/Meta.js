import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Paper,
  IconButton,
  AppBar,
  Toolbar,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { auth, db } from '../firebaseConfig';
import { getDatabase, ref, push, onValue, update, remove } from 'firebase/database';
import { doc, getDoc } from 'firebase/firestore';
import { Edit, Delete } from '@mui/icons-material';
import Likes from './Likes';

const Meta = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [userProfiles, setUserProfiles] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async (user) => {
      if (user) {
        const userRef = doc(db, 'profiles', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setCurrentUser({
            uid: user.uid,
            name: userSnap.data().displayName || 'Anonymous',
            avatar: userSnap.data().photoURL || 'https://via.placeholder.com/50',
          });
        }
      }
    };

    const fetchMessages = () => {
      const db = getDatabase();
      const messagesRef = ref(db, 'messages');
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        const loadedMessages = data
          ? Object.entries(data).map(([key, value]) => ({
              id: key,
              ...value,
            }))
          : [];
        setMessages(loadedMessages);
        fetchProfiles(loadedMessages);
      });
    };

    const fetchProfiles = async (loadedMessages) => {
      const profileRefs = Array.from(new Set(loadedMessages.map((msg) => msg.uid)));
      const profiles = {};
      await Promise.all(
        profileRefs.map(async (uid) => {
          try {
            const userRef = doc(db, 'profiles', uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              profiles[uid] = {
                name: userSnap.data().displayName || 'Anonymous',
                avatar: userSnap.data().photoURL || 'https://via.placeholder.com/50',
              };
            }
          } catch (error) {
            console.error(`Error fetching profile for uid: ${uid}`, error);
          }
        })
      );
      setUserProfiles(profiles);
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      fetchUserData(user);
    });

    fetchMessages();

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!currentUser || input.trim() === '') return;

    const db = getDatabase();
    const messagesRef = ref(db, 'messages');

    if (editingMessageId) {
      const messageRef = ref(db, `messages/${editingMessageId}`);
      update(messageRef, { text: input }).then(() => {
        setEditingMessageId(null);
        setInput('');
      });
    } else {
      push(messagesRef, {
        text: input,
        sender: currentUser.name,
        avatar: currentUser.avatar,
        uid: currentUser.uid,
        timestamp: Date.now(),
      });
      setInput('');
    }
  };

  const handleEdit = (message) => {
    setInput(message.text);
    setEditingMessageId(message.id);
  };

  const handleOpenDeleteDialog = (messageId) => {
    setMessageToDelete(messageId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    const db = getDatabase();
    const messageRef = ref(db, `messages/${messageToDelete}`);
    remove(messageRef);
    setMessageToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setMessageToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <AppBar position="sticky" sx={{ backgroundColor: '#000000' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Διαλεκτικὸς (Dialektikós)
          </Typography>
        </Toolbar>
      </AppBar>

      <Paper
        ref={chatBoxRef}
        sx={{
          flex: 1,
          overflowY: 'auto',
          backgroundColor: '#ffffff',
          padding: '10px',
        }}
      >
        <List>
          {messages.map((message) => (
            <React.Fragment key={message.id}>
              <ListItem sx={{ alignItems: 'flex-start', gap: 2 }}>
                <ListItemAvatar>
                  <Avatar
                    src={userProfiles[message.uid]?.avatar || 'https://via.placeholder.com/50'}
                    alt={userProfiles[message.uid]?.name || 'User'}
                  />
                </ListItemAvatar>
                <Box sx={{ flexGrow: 1 }}>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight="bold">
                        {userProfiles[message.uid]?.name || 'Anonymous'}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="caption" color="textSecondary">
                          {formatTimestamp(message.timestamp)}
                        </Typography>
                        <Typography variant="body2">{message.text}</Typography>
                      </>
                    }
                  />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {currentUser && currentUser.uid === message.uid && (
                      <>
                        <IconButton onClick={() => handleEdit(message)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleOpenDeleteDialog(message.id)}>
                          <Delete />
                        </IconButton>
                      </>
                    )}
                    <Likes postId={message.id} user={currentUser} />
                  </Box>
                </Box>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
          backgroundColor: '#ffffff',
          borderTop: '1px solid #ccc',
          position: 'sticky',
          bottom: 0,
          zIndex: 10,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="Type your message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button variant="contained" color="primary" onClick={handleSend} sx={{ marginLeft: '10px' }}>
          {editingMessageId ? 'Update' : 'Send'}
        </Button>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>Do you really want to delete this message?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>No</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Meta;

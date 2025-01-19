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
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc } from 'firebase/firestore';
import { Edit, Delete, Image, ImageOutlined } from '@mui/icons-material';
import Likes from './Likes';

const Meta = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    const fetchCurrentUser = async (user) => {
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
      });
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      fetchCurrentUser(user);
    });

    fetchMessages();

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!currentUser || (input.trim() === '' && !imageFile)) return;

    const db = getDatabase();
    const messagesRef = ref(db, 'messages');

    let imageUrl = null;
    if (imageFile) {
      const storage = getStorage();
      const imageRef = storageRef(storage, `messageImages/${imageFile.name}`);
      try {
        const snapshot = await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    if (editingMessageId) {
      const messageRef = ref(db, `messages/${editingMessageId}`);
      update(messageRef, { text: input, imageUrl }).then(() => {
        setEditingMessageId(null);
        setInput('');
        setImageFile(null);
      });
    } else {
      push(messagesRef, {
        text: input,
        sender: currentUser.name,
        avatar: currentUser.avatar,
        uid: currentUser.uid,
        timestamp: Date.now(),
        imageUrl,
      });
      setInput('');
      setImageFile(null);
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
    if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault();
      setInput((prev) => prev + '\n');
    } else if (event.key === 'Enter') {
      event.preventDefault();
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
                    src={message.avatar || 'https://via.placeholder.com/50'}
                    alt={message.sender || 'User'}
                  />
                </ListItemAvatar>
                <Box sx={{ flexGrow: 1 }}>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight="bold">
                        {message.sender || 'Anonymous'}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="caption" color="textSecondary">
                          {formatTimestamp(message.timestamp)}
                        </Typography>
                        <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
                          {message.text}
                        </Typography>
                        {message.imageUrl && (
                          <img
                            src={message.imageUrl}
                            alt="Uploaded content"
                            style={{
                              marginTop: '10px',
                              maxWidth: '100%',
                              maxHeight: '300px',
                              borderRadius: '8px',
                            }}
                          />
                        )}
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
          multiline
        />
        <IconButton
          component="label"
          sx={{
            marginLeft: '10px',
            color: imageFile ? 'primary.main' : 'inherit', // Highlight when image is uploaded
          }}
        >
          {imageFile ? <Image /> : <ImageOutlined />}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </IconButton>
        <Button variant="contained" color="primary" onClick={handleSend} sx={{ marginLeft: '10px' }}>
          {editingMessageId ? 'Update' : 'Send'}
        </Button>
      </Box>

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

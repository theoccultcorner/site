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
} from '@mui/material';
import { auth, db } from '../firebaseConfig';
import { getDatabase, ref, push, onValue, update, remove } from 'firebase/database';
import { doc, getDoc } from 'firebase/firestore';
import { Edit, Delete } from '@mui/icons-material';
import Likes from './Likes'; // Import the updated Likes component

const Meta = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [userProfiles, setUserProfiles] = useState({});
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

  const handleDelete = (messageId) => {
    const db = getDatabase();
    const messageRef = ref(db, `messages/${messageId}`);
    remove(messageRef);
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
      {/* AppBar for title */}
      <AppBar position="sticky" sx={{ backgroundColor: '#000000' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Διαλεκτικὸς Χῶρος (Dialektikós Chōros)
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Chat messages */}
      <Paper
        ref={chatBoxRef}
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          backgroundColor: '#ffffff',
          border: '1px solid #ccc',
          borderRadius: '0 0 8px 8px',
          padding: '10px',
        }}
      >
        <List>
          {messages.map((message) => (
            <ListItem key={message.id} sx={{ alignItems: 'flex-start', gap: 2 }}>
              <ListItemAvatar>
                <Avatar
                  src={userProfiles[message.uid]?.avatar || 'https://via.placeholder.com/50'}
                  alt={userProfiles[message.uid]?.name || 'User'}
                />
              </ListItemAvatar>
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
              <Box>
                {currentUser && currentUser.uid === message.uid && (
                  <>
                    <IconButton onClick={() => handleEdit(message)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(message.id)}>
                      <Delete />
                    </IconButton>
                  </>
                )}
                <Likes postId={message.id} user={currentUser} />
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Input area */}
      <Box
        sx={{
          display: 'flex',
          padding: '10px',
          backgroundColor: '#ffffff',
          borderTop: '1px solid #ccc',
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
    </Box>
  );
};

export default Meta;

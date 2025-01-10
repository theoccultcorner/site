import React from 'react';
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const RecommendedReading = () => {
  const books = [
    { title: "Gnosticism: New Light on the Ancient Tradition of Inner Knowing", author: "Stephan A. Hoeller" },
    { title: "Care of Mind Care of Spirit", author: "Gerald G. May" },
    { title: "Religions, Values, and Peak Experiences", author: "Abraham Maslow" },
    { title: "The Gospel of Thomas: The Gnostic Wisdom of Jesus", author: "Jean-Yves Leloup" },
    { title: "The Gnostic Catechism", author: "Stephan A. Hoeller" },
    { title: "The Mystery and Magic of the Eucharist", author: "Stephan A. Hoeller" },
    { title: "A Gnostic Book of Hours", author: "June Singer" },
    { title: "The Gnostic Gospels", author: "Elaine Pagels" },
    { title: "Living Mysteries", author: "John Plummer" },
    { title: "The Many Paths of the Independent Sacramental Movement", author: "John P. Plummer" },
    { title: "The Science of the Sacraments", author: "Bishop C.W. Leadbeater", note: "(PDF available)" },
    { title: "Wandering Bishops", author: "Lewis Keizer", note: "(PDF available)" },
  ];

  return (
    <Box style={styles.container}>
      <Typography variant="h4" style={styles.title}>
        Recommended Reading
      </Typography>
      <Typography variant="body1" style={styles.text}>
        Below are some sources that we recommend reading to gain a broader understanding of Theology as a whole as well as Gnostic Catholicism. Some titles are available as PDF documents.
      </Typography>
      <List>
        {books.map((book, index) => (
          <ListItem key={index} style={styles.listItem}>
            <ListItemText
              primary={
                <>
                  <Typography variant="h6" style={styles.bookTitle}>
                    {book.title}
                  </Typography>
                  <Typography variant="body2" style={styles.bookAuthor}>
                    {book.author}
                  </Typography>
                  {book.note && (
                    <Typography variant="body2" style={styles.bookNote}>
                      {book.note}
                    </Typography>
                  )}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  text: {
    marginBottom: '20px',
    lineHeight: '1.6',
    color: '#555',
  },
  listItem: {
    marginBottom: '15px',
  },
  bookTitle: {
    fontWeight: 'bold',
    color: '#444',
  },
  bookAuthor: {
    fontStyle: 'italic',
    color: '#666',
  },
  bookNote: {
    color: '#888',
  },
};

export default RecommendedReading;

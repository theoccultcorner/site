import React, { useState } from 'react';
<<<<<<< HEAD
import './Contact.css'; // Import external CSS file for additional styling

=======
import { TextField, Button, Typography, Container, Grid, Link } from '@mui/material';
import './Contact.css'; // Import external CSS file for additional styling
 
>>>>>>> 247d632b1ebba9d8e9195825b66c40aac5cb18ad
const Contact = () => {
  const [name, setName] = useState(''); // State for name input
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can handle the form submission, e.g., send the email and message data to your backend
    console.log('Name:', name); // Log name input
    console.log('Email:', email);
    console.log('Message:', message);

    // Construct the email body
    const emailBody = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

    // Send email
    try {
      const response = await fetch('https://formspree.io/f/moqgpdrk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'theoccultcorner@gmail.com', message: emailBody }),
      });

      if (response.ok) {
        // Email sent successfully
        console.log('Email sent successfully');
        // Clear the form fields after successful submission
        setName('');
        setEmail('');
        setMessage('');
      } else {
        // Error occurred while sending email
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
<<<<<<< HEAD
    <div className="contact-container">
      <h1>Contact Me</h1>
      <div className="social-media">
        <a href="https://twitter.com/example" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://facebook.com/example" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://instagram.com/example" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
      <form onSubmit={handleSubmit} className="contact-form">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-field"
        />
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          className="input-field"
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
=======
    <Container maxWidth="sm">
      <div className="contact-container">
        <Typography variant="h4" gutterBottom>
          Send us a message.
        </Typography>
      
        <form onSubmit={handleSubmit} className="contact-form">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1rem' }}>
            Submit
          </Button>
        </form>
      </div>
    </Container>
>>>>>>> 247d632b1ebba9d8e9195825b66c40aac5cb18ad
  );
};

export default Contact;

import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid, Link } from '@mui/material';
import './Contact.css'; // Import external CSS file for additional styling
import { FaFacebook, FaDiscord, FaInstagram, FaTiktok, FaYoutube, FaPatreon } from 'react-icons/fa';
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
    <Container maxWidth="sm">
      <div className="contact-container">
        <Typography variant="h4" gutterBottom>
          Send us a message.
        </Typography>
           <div style={styles.socialIcons}>
        <a href="https://www.facebook.com/LorenzoNevarez" target="_blank" rel="noopener noreferrer"><FaFacebook size={30} style={styles.icon} /></a>
        <a href="https://discord.gg/Jq8tw8h2" target="_blank" rel="noopener noreferrer"><FaDiscord size={30} style={styles.icon} /></a>
        <a href="https://www.instagram.com/theoccultcorner" target="_blank" rel="noopener noreferrer"><FaInstagram size={30} style={styles.icon} /></a>
        <a href="https://www.tiktok.com/@theoccultcorner" target="_blank" rel="noopener noreferrer"><FaTiktok size={30} style={styles.icon} /></a>
        <a href="https://www.youtube.com/channel/UCzLm4X0CrxlSwRqggjvL3jA" target="_blank" rel="noopener noreferrer"><FaYoutube size={30} style={styles.icon} /></a>
        <a href="https://www.patreon.com/occultcorner" target="_blank" rel="noopener noreferrer"><FaPatreon size={30} style={styles.icon} /></a>
      </div>
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
  );
};

export default Contact;

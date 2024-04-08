import React, { useState } from 'react';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission, e.g., send the email and message data to your backend
    console.log('Email:', email);
    console.log('Message:', message);
    // Clear the form fields after submission
    setEmail('');
    setMessage('');
  };

  return (
    <div style={styles.container}>
      <h1>Contact Me</h1>
      <div style={styles.socialMedia}>
        <a href="https://twitter.com/example" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://facebook.com/example" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://instagram.com/example" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <label>Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  socialMedia: {
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    maxWidth: '400px',
    padding: '8px',
    margin: '8px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px 20px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Contact;

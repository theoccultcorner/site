import React, { useState } from 'react';
import './Contact.css'; // Import external CSS file for additional styling

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
  );
};

export default Contact;

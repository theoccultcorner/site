import React, { useState } from 'react';
import './Contact.css'; // Import external CSS file for additional styling

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
    <div className="contact-container">
      <h1>Contact Me</h1>
      <div className="social-media">
        <a href="https://twitter.com/example" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://facebook.com/example" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://instagram.com/example" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
      <form onSubmit={handleSubmit} className="contact-form">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input-field"
        />
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

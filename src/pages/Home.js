import React from 'react';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Our Dope Homepage</h1>
      <p style={styles.subtitle}>Where Awesome Stuff Happens!</p>
    
      <p style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '36px',
    color: '#333',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '24px',
    color: '#666',
    marginBottom: '20px',
  },
  imageContainer: {
    maxWidth: '500px',
    margin: '0 auto',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  description: {
    fontSize: '18px',
    color: '#777',
    marginTop: '20px',
  },
};

export default Home;

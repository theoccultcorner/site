import React from 'react';

const NoPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404</h1>
      <p>The page you are looking for does not exist.</p>
      <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
        Go back to Home
      </a>
    </div>
  );
};

export default NoPage;

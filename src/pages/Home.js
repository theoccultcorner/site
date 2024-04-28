import React from 'react';
import { FaFacebook, FaDiscord, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to TheGnosticChristian.Org</h1>
      <p style={styles.subtitle}>The Social Pleroma for Gnostikoi.</p>

      <p style={styles.description}>
        TheGnosticChristian.org is a vibrant and inclusive social platform designed for Gnostikoi – seekers of spiritual wisdom
        and knowledge. It serves as a gathering place for individuals interested in exploring ancient Gnostic teachings, engaging
        in meaningful discussions, and connecting with like-minded individuals from around the world.
      </p>

      <p style={styles.description}>
        On this website, you'll find a rich tapestry of content, including articles, forums, and multimedia resources, all aimed at
        deepening your understanding of Gnosticism and its relevance to contemporary spiritual pursuits.
      </p>

      <p style={styles.description}>
        As a member of TheGnosticChristian.org, you'll have the opportunity to create and customize your profile, sharing
        information about yourself and your spiritual journey with the community. Additionally, you can participate in discussions,
        post your own thoughts and insights, and engage with other members through comments and private messages.
      </p>

      <div style={styles.socialIcons}>
        <a href="https://www.facebook.com/LorenzoNevarez" target="_blank" rel="noopener noreferrer">
          <FaFacebook size={30} style={styles.icon} />
        </a>
        <a href="https://discord.gg/Jq8tw8h2" target="_blank" rel="noopener noreferrer">
          <FaDiscord size={30} style={styles.icon} />
        </a>
        <a href="https://www.instagram.com/theoccultcorner" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={30} style={styles.icon} />
        </a>
        <a href="https://www.tiktok.com/@theoccultcorner" target="_blank" rel="noopener noreferrer">
          <FaTiktok size={30} style={styles.icon} />
        </a>
        <a href="https://www.youtube.com/channel/UCzLm4X0CrxlSwRqggjvL3jA" target="_blank" rel="noopener noreferrer">
          <FaYoutube size={30} style={styles.icon} />
        </a>
      </div>
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
  description: {
    fontSize: '18px',
    color: '#777',
    marginTop: '20px',
    lineHeight: '1.6',
  },
  socialIcons: {
    marginTop: '40px',
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    margin: '0 10px',
    cursor: 'pointer',
    color: 'black', // Change color to black
  },
};

export default Home;

import React from 'react';
import { FaFacebook, FaDiscord, FaInstagram, FaTiktok, FaYoutube, FaPatreon } from 'react-icons/fa';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to The Gnostic Christian</h1>
      <p style={styles.subtitle}>Exploring the Ancient Wisdom of Gnosticism</p>
    
     

      <p style={styles.description}>
        TheGnosticChristian.org is dedicated to uncovering the rich history and profound teachings of Gnosticism. 
        Gnosticism was a diverse spiritual movement that emerged in the early centuries of Christianity, offering 
        alternative interpretations of Christian doctrine and emphasizing personal spiritual knowledge (gnosis) 
        as the path to salvation.
      </p>
      
      <p style={styles.description}>
        On this website, you'll find articles, resources, and discussions exploring various aspects of Gnostic 
        belief, including the role of myth, the nature of the divine, and the significance of esoteric knowledge. 
        Join us on a journey to discover the hidden truths of Gnosticism and its enduring relevance in the modern world.
      </p>
      <div style={styles.socialIcons}>
        <a href="https://www.facebook.com/LorenzoNevarez" target="_blank" rel="noopener noreferrer"><FaFacebook size={30} style={styles.icon} /></a>
        <a href="https://discord.gg/Jq8tw8h2" target="_blank" rel="noopener noreferrer"><FaDiscord size={30} style={styles.icon} /></a>
        <a href="https://www.instagram.com/theoccultcorner" target="_blank" rel="noopener noreferrer"><FaInstagram size={30} style={styles.icon} /></a>
        <a href="https://www.tiktok.com/@theoccultcorner" target="_blank" rel="noopener noreferrer"><FaTiktok size={30} style={styles.icon} /></a>
        <a href="https://www.youtube.com/channel/UCzLm4X0CrxlSwRqggjvL3jA" target="_blank" rel="noopener noreferrer"><FaYoutube size={30} style={styles.icon} /></a>
        <a href="https://www.patreon.com/occultcorner" target="_blank" rel="noopener noreferrer"><FaPatreon size={30} style={styles.icon} /></a>
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

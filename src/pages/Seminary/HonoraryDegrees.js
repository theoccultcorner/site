import React from 'react';
import { Button } from '@mui/material';

const HonoraryDegrees = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Honorary Degree Programs</h1>
      
      <p style={styles.text}>
        We offer the Honorary Doctor of Divinity, the Honorary Doctor of Ministry, and the Honorary Doctor of Letters in Gnostic Theology. The honorary degree is “not earned but deserved.” This degree is for the person who does not need to prepare for ministry with an earned degree but has already made an impact with their ministry. This degree acknowledges this fact.
      </p>

      <h3 style={styles.heading}>Available Honorary Degrees</h3>
      <ul style={styles.list}>
        <li>Doctor of Divinity</li>
        <li>Doctor of Ministry</li>
        <li>Doctor of Letters</li>
      </ul>

      <h3 style={styles.heading}>Requirements</h3>
      <p style={styles.text}>
        There are several requirements for the honorary degree:
      </p>
      <ul style={styles.list}>
        <li>Submit a resume or curriculum vitae, and a photo.</li>
        <li>Must be aged 40 or older.</li>
        <li>
          Provide three (3) letters of recommendation written by individuals who have known the applicant for a minimum of five years. These individuals must have a professional or ministerial relationship with the applicant. Each letter must:
          <ul style={styles.subList}>
            <li>Be at least one page long.</li>
            <li>Include the recommender's name, address, and telephone number.</li>
          </ul>
        </li>
        <li>
          Submit any completed written works, such as a book, booklet, or an outstanding article, as part of the application.
        </li>
      </ul>

      <h3 style={styles.heading}>Administrative Fee</h3>
      <p style={styles.text}>
        There is an administrative fee of <strong>$1,000.00 (US)</strong>.
      </p>

      <h3 style={styles.heading}>Contact Information</h3>
      <p style={styles.text}>
        For more information, please contact:
      </p>
      <div style={styles.contact}>
        <p>Bishop Jason Jones, G.S.J., S.T.L., M.S., DMin., Ed.D.</p>
        <p>Rector and Academic Dean of The Gnostic Catholic Union Seminary</p>
        <Button
          variant="contained"
          color="primary"
          href="mailto:BishopJasonJones@TheGnosticCatholicUnion.org"
          style={styles.button}
        >
          Contact Us
        </Button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: 'auto',
    textAlign: 'left',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  heading: {
    marginTop: '20px',
    marginBottom: '10px',
    color: '#444',
    fontSize: '20px',
  },
  text: {
    marginBottom: '10px',
    lineHeight: '1.6',
    color: '#555',
  },
  list: {
    marginBottom: '20px',
    paddingLeft: '20px',
    listStyleType: 'disc',
  },
  subList: {
    marginLeft: '20px',
    listStyleType: 'circle',
  },
  contact: {
    marginTop: '30px',
    textAlign: 'center',
  },
  button: {
    marginTop: '10px',
  },
};

export default HonoraryDegrees;

import React from 'react';
import { Button } from '@mui/material';

const MinistryDegrees = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Ministry Degrees</h1>

      <h3 style={styles.heading}>Programs Offered</h3>
      <ul style={styles.list}>
        <li>Doctor of Ministry in Pastoral Leadership</li>
        <li>Master of Ministry in Pastoral Leadership</li>
        <li>Bachelor of Ministry in Pastoral Leadership</li>
        <li>Diploma in Ministry</li>
      </ul>

      <p style={styles.text}>
        The Gnostic Union Seminary offers a comprehensive Ministry Track program designed to deepen faith,
        develop leadership skills, and prepare individuals for community pastoral leadership roles within the Gnostic
        Catholic tradition. The program recognizes prior life experience, allowing significant credit for an applicant's
        proven record of service accomplishment in recognized ministry positions.
      </p>

      <h3 style={styles.heading}>Tailored Learning Experience</h3>
      <p style={styles.text}>
        Students can tailor their program according to their unique needs, skills, and aspirations through individualized
        concentrations and projects designed in consultation with a program advisor. Concentrations may include:
      </p>
      <ul style={styles.list}>
        <li>Designing Educational Media</li>
        <li>Family Ministry</li>
        <li>Youth Ministry</li>
        <li>Worship and Music Ministry</li>
        <li>Pastoral Care</li>
        <li>Community Outreach</li>
      </ul>

      <h3 style={styles.heading}>Program Highlights</h3>
      <p style={styles.text}>
        The Ministry Track program emphasizes specialized skills and hands-on experience, ensuring students develop the
        pastoral abilities required to lead a ministry effectively. By providing a balance of structure and flexibility,
        the program enables students to pursue their passion for ministry while gaining the knowledge and skills
        necessary to serve their communities and the world.
      </p>
      <p style={styles.text}>
        Graduates of the program will be well-equipped to take on increased responsibilities and make a meaningful
        impact in their chosen area of ministry.
      </p>

      <h3 style={styles.heading}>Contact Information</h3>
      <p style={styles.text}>
        For more information, please contact:
      </p>
      <div style={styles.contact}>
        <p>Bishop Nathan Wilson</p>
        <p>Rector and Academic Dean of The Gnostic Union</p>
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
  },
  text: {
    marginBottom: '10px',
    lineHeight: '1.6',
    color: '#555',
  },
  list: {
    marginBottom: '20px',
    paddingLeft: '20px',
  },
  contact: {
    marginTop: '20px',
    textAlign: 'center',
  },
  button: {
    marginTop: '10px',
  },
};

export default MinistryDegrees;

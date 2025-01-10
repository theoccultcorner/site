import React from 'react';
import { Button } from '@mui/material';

const CertificatePrograms = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Certificate Programs</h1>

      <h2 style={styles.heading}>Foundations in Gnostic Catholic Theology</h2>
      <p style={styles.text}>
        This foundational course provides a comprehensive introduction to Gnostic Catholic theology's core beliefs,
        practices, and history. Students will delve into the ancient roots of Gnosticism and explore its evolution into
        modern Gnostic Catholic thought. The course aims to establish a solid theological framework for further studies
        in the Bachelor of Theology program offered by the Gnostic Catholic Union Seminary.
      </p>

      <p style={styles.text}>
        Throughout the course, students will engage with essential texts illuminating Gnostic Catholic theology's
        central tenets. By examining works such as <i>Gnosticism: New Light on the Ancient Tradition of Inner Knowing</i> 
        by Stephan A. Hoeller, <i>Forbidden Faith: The Secret History of Gnosticism</i> by Richard Smoley, and 
        <i>A Gnostic Book of Hours</i> by June Singer, students will gain a deeper understanding of the Gnostic approach 
        to spirituality, self-knowledge, and the divine.
      </p>

      <h3 style={styles.subHeading}>Key Topics Covered</h3>
      <ul style={styles.list}>
        <li>The historical context and development of Gnosticism</li>
        <li>The relationship between Gnosticism and early Christianity</li>
        <li>Central Gnostic myths, symbols, and archetypes</li>
        <li>The role of personal experience and inner knowing in Gnostic spirituality</li>
        <li>Gnostic views on the nature of the divine, creation, and the human condition</li>
        <li>The integration of Gnostic principles into contemporary Gnostic Catholic theology and practice</li>
      </ul>

      <p style={styles.text}>
        Students must write a 5-8 page synopsis for the two designated texts, demonstrating their understanding and
        critical engagement with the material. Throughout the course, students will have the support and guidance of a
        dedicated academic advisor who will assist them in their studies and foster their intellectual and spiritual growth.
      </p>

      <p style={styles.text}>
        By the end of this course, students will have developed a robust foundation in Gnostic Catholic theology,
        preparing them for advanced studies in the Bachelor of Theology program. They will have cultivated a deep
        appreciation for the richness and complexity of Gnostic thought and its relevance to contemporary spiritual
        practice and personal transformation.
      </p>

      <h3 style={styles.subHeading}>Additional Information</h3>
      <ul style={styles.list}>
        <li><strong>Prerequisite:</strong> Access to a computer and MS Word with internet capabilities</li>
        <li><strong>Tuition:</strong> $300.00 (US)</li>
      </ul>

      <h3 style={styles.subHeading}>Contact Information</h3>
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
  },
  subHeading: {
    marginTop: '20px',
    marginBottom: '10px',
    color: '#555',
    fontWeight: 'bold',
  },
  text: {
    marginBottom: '10px',
    lineHeight: '1.6',
    color: '#555',
  },
  list: {
    marginBottom: '20px',
    paddingLeft: '20px',
    lineHeight: '1.6',
  },
  contact: {
    marginTop: '20px',
    textAlign: 'center',
  },
  button: {
    marginTop: '10px',
  },
};

export default CertificatePrograms;

import React from 'react';
import { Button } from '@mui/material';

const Foundations = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Foundations in Gnostic Christian Theology</h1>
      <p style={styles.text}>
        The courses provided by The Gnostic Union offer a comprehensive introduction to Gnostic Christian theology, core beliefs, practices, and history. Students will delve into the roots of ancient Christianity and explore its evolution into modern Gnostic Christian thought. The course aims to establish a solid theological framework for further studies and independent work students may decide to undertake with support from our team.
      </p>

      <h3 style={styles.heading}>Course Overview</h3>
      <p style={styles.text}>
        Throughout the courses, students will engage with essential ancient Gnostic texts, as well as explore Gnostic theology and beliefs within canonical texts. By collaborating with and learning from our Bishops and Priests, students will examine works such as:
      </p>
      <ul style={styles.list}>
        <li><i>The Gospel of Thomas</i></li>
        <li><i>The Gospel of Mary</i></li>
        <li><i>The Gospel of Philip</i></li>
        <li><i>The Gospel of Judas</i></li>
        <li>Bishop Nathan Wilson’s translation of the Greek Gospels:
          <ul style={{ paddingLeft: '20px' }}>
            <li>Matthew</li>
            <li>Mark</li>
            <li>John</li>
          </ul>
        </li>
      </ul>
      <p style={styles.text}>
        Students will gain a deeper understanding of the Gnostic approach to spirituality, self-knowledge, and the divine.
      </p>

      <h3 style={styles.heading}>Course Requirements</h3>
      <p style={styles.text}>
        Students must provide a written 6-9 page synopsis for the designated texts to demonstrate their understanding and engagement with the source material. They will also submit a book review and personal reflections for texts such as:
      </p>
      <ul style={styles.list}>
        <li><i>The Gospel of Thomas</i></li>
        <li><i>The Gospel of Mary</i></li>
        <li><i>The Gospel of Philip</i></li>
        <li><i>The Gospel of Judas</i></li>
        <li><i>The Proto-Gospel of James</i></li>
      </ul>
      <p style={styles.text}>
        Throughout the course, students will have the support and guidance of dedicated Bishops and Priests, assisting them in their spiritual growth.
      </p>

      <h3 style={styles.heading}>Learning Outcomes</h3>
      <p style={styles.text}>
        By the end of this course, students will develop a deeper understanding of Gnostic Christianity. They will be prepared for advanced studies and will have cultivated a unique appreciation for the richness of Gnostic thought and its relevance to contemporary spiritual practice and personal transformation.
      </p>

      <h3 style={styles.heading}>Additional Information</h3>
      <ul style={styles.list}>
        <li><strong>Prerequisite:</strong> Access to a computer and MS Word with internet capabilities</li>
        <li><strong>Tuition:</strong> $300.00 (US)</li>
      </ul>

      <h3 style={styles.heading}>Contact Information</h3>
      <p style={styles.text}>
        For more information, please contact:
      </p>
      <div style={styles.contact}>
        <p>Bishop Nathan Wilson</p>
        <p>Archbishop of The Gnostic Union</p>
        <Button
          variant="contained"
          color="primary"
          href="mailto:BishopNathanWilson@TheGnosticUnion.org"
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

export default Foundations;

import React from 'react';
import { Typography, Divider } from '@mui/material'; // Added Divider import
import { Button } from '@mui/material';

const Fellowships = () => {
  return (
    <div style={styles.container}>
      <Typography variant="h4" style={styles.title}>
        The Brungart Research Fellowship
      </Typography>
      <Divider style={styles.divider} /> {/* Divider added */}
      <Typography style={styles.text}>
        Affording a quality seminary education is more difficult now than ever before. Through their generosity, our donors are helping graduate students bridge that financial gap.
      </Typography>

      <Typography style={styles.text}>
        Scholarly research, writing, and formal education are integral components of the academic world today. Publishing papers in academic journals is the mechanism by which scholarship moves forward. Scholarly research is a way to contribute to the existing knowledge base and to advance the field of theological study.
      </Typography>

      <Typography style={styles.text}>
        The Gnostic Catholic Union Seminary is pleased to offer The Brungart Research Fellowship for students pursuing a Master in Theology, Licentiate in Sacred Theology, and publication. Fellowships provide a tuition grant equal to 50% of tuition for up to two years of study.
      </Typography>

      <Typography variant="h4" style={styles.title}>
        Doctoral Research Fellowship
      </Typography>
      <Divider style={styles.divider} /> {/* Divider added */}
      <Typography style={styles.text}>
        Affording a quality seminary education is more difficult now than ever before. Through their generosity, our donors are helping graduate students bridge that financial gap.
      </Typography>

      <Typography style={styles.text}>
        Scholarly research, writing, and formal education are integral components of the academic world today. Publishing papers in academic journals is the mechanism by which scholarship moves forward. Scholarly research is a way to contribute to the existing knowledge base and to advance the field of theological study.
      </Typography>

      <Typography style={styles.text}>
        The Gnostic Catholic Union Seminary is pleased to offer The Doctoral Research Fellowship for students pursuing a Doctor of Theology and publication. Fellowships provide a tuition grant equal to 50% of tuition for up to two years of study.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        href="mailto:BishopJasonJones@TheGnosticCatholicUnion.org"
        style={styles.button}
      >
        Contact Us
      </Button>
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
  text: {
    marginBottom: '20px',
    lineHeight: '1.6',
    color: '#555',
  },
  divider: {
    margin: '20px 0',
  },
  button: {
    display: 'block',
    margin: '30px auto 0',
  },
};

export default Fellowships;

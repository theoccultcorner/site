import React from 'react';
import { Button } from '@mui/material';

const DegreePrograms = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Degree Programs</h1>
      <p style={styles.text}>
        Theology is the systematic study of the nature of the divine and, more broadly, of religious belief. It examines
        the human experience of faith, and how different people and cultures express it.
      </p>

      <p style={styles.text}>
        Education to help you build your ministry should be affordable and easily accessible.
      </p>

      <p style={styles.text}>
        All degrees conferred by The Gnostic Catholic Union Seminary are purely Ecclesiastical degrees intended for use
        within The Gnostic Catholic Church or affiliated ministries. They are not to be confused with accredited
        academic degrees from other religious or secular educational institutions.
      </p>

      <h3 style={styles.heading}>Degree by Dissertation / Thesis</h3>
      <p style={styles.text}>
        We are pleased to announce our Degree by Dissertation / Thesis Program. Although this learning model can be done
        in a shorter amount of time compared to the traditional coursework method, it is by no means less taxing. These
        programs are rigorous but just as rewarding as the result is a work of publishable quality and depth. Once
        admitted, students will be assigned a thesis advisor who serves as a student’s primary advisor until graduation.
      </p>

      <h3 style={styles.heading}>What is the difference between a Thesis and a Dissertation?</h3>
      <p style={styles.text}>
        A thesis and a dissertation are both academic papers that are written to fulfill the requirements for a degree.
        The main difference between a thesis and a dissertation is the scope of the research. A thesis is usually
        written for a master’s degree, whereas a dissertation is written for a doctoral degree. A thesis is based on
        existing research, while a dissertation requires the student to conduct their own research and then perform
        analysis.
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
  },
  text: {
    marginBottom: '10px',
    lineHeight: '1.6',
    color: '#555',
  },
  contact: {
    marginTop: '20px',
    textAlign: 'center',
  },
  button: {
    marginTop: '10px',
  },
};

export default DegreePrograms;

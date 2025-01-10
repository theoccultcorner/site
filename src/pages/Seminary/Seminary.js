import React from 'react';
import { Button } from '@mui/material';

const Seminary = () => {
  return (
    <div className="seminary-container">
      <header className="seminary-header">
        <h1>Training Leaders for the 21st Century</h1>
      </header>

      <section className="seminary-intro">
        <h2>Are you called to serve?</h2>
        <p>
          The Gnostic Union Seminary is preparing students to answer that call. Today, independent Gnostic Christians of
          all ages are being called to the way of peace, the way of Gnosis. Many people from all backgrounds and ages have
          transformed their lives thanks to Gnostic Christianity and the teachings of Jesus the Christ.
        </p>
      </section>

      <section className="seminary-programs">
        <p>
          We at The Gnostic Union offer several certificate programs that include bachelor, master, and doctoral-level
          degrees free of charge. Education to help you build your ministry should be affordable and easily accessible.
        </p>
      </section>

      <section className="seminary-dissertation">
        <h3>Degree by Dissertation / Thesis Program</h3>
        <p>
          We are pleased to announce our Degree by Dissertation/Thesis Program. Although this model of learning can be
          completed in a shorter amount of time compared to the traditional coursework method, it is by no means less
          rigorous. These programs can be challenging but equally rewarding, as the result is a work of publishable quality
          and depth.
        </p>
      </section>

      <section className="seminary-contact">
        <h3>Contact Us</h3>
        <p>
          Find us on Facebook at <strong>The Gnostic Union</strong>, or connect with us here on our website. You can also
          find us on YouTube. Additionally, there is another associated branch of The Gnostic Union on Facebook, run by
          Bishop Jody, called <strong>The Gnostic Union Seminary</strong>. This branch offers its own unique courses and
          degrees.
        </p>
        <p>
          Degrees will be recognized by both parties and by other associations within and allied with The Gnostic Union.
          However, they are not to be confused with accredited academic degrees from other religious or secular educational
          institutions.
        </p>
      </section>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          href="mailto:BishopJasonJones@TheGnosticCatholicUnion.org"
        >
          Contact Us
        </Button>
      </div>
    </div>
  );
};

export default Seminary;

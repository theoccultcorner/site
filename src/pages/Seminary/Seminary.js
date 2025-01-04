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
          The Gnostic Catholic Union Seminary is preparing students to answer that call. Today, Independent Catholics of
          all ages are being called to a life of service and witness in the church.
        </p>
      </section>

      <section className="seminary-programs">
        <p>
          We, at the Gnostic Catholic Union Seminary, offer several certificate programs as well as bachelor, master, and
          doctoral-level degrees at very reasonable tuition. Education to help you build your ministry should be affordable
          and easily accessible.
        </p>
      </section>

      <section className="seminary-dissertation">
        <h3>Degree by Dissertation / Thesis Program</h3>
        <p>
          We are pleased to announce our Degree by Dissertation / Thesis Program. Although this model of learning can be
          completed in a shorter amount of time compared to the traditional coursework method, it is by no means less
          rigorous. These programs are challenging but equally rewarding, as the result is a work of publishable quality and
          depth.
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

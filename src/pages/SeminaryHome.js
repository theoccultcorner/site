import React from 'react';

const SeminaryHeader = () => {
  return (
    <header className="seminary-home-header">
      <h1>Training Leaders for the 21st Century</h1>
      <h2>The Gnostic Catholic Union Seminary</h2>
    </header>
  );
};

const SeminaryCall = () => {
  return (
    <section className="seminary-home-call">
      <h3>Are you called to serve?</h3>
      <p>
        Today Independent Catholics of all ages are being called to a life of service and witness in the church.
      </p>
    </section>
  );
};

const SeminaryIntro = () => {
  return (
    <section className="seminary-home-intro">
      <p>
        The Gnostic Catholic Union Seminary is preparing students to answer that call.
      </p>
      <p>
        We, at the Gnostic Catholic Union Seminary, in addition to offering several certificate programs, offer bachelor,
        master, and doctoral level degrees at very reasonable tuition. Education to help you build your ministry should
        be affordable and easily accessible.
      </p>
    </section>
  );
};

const SeminaryProgram = () => {
  return (
    <section className="seminary-home-program">
      <h3>Degree by Dissertation / Thesis Program</h3>
      <p>
        We are pleased to announce our Degree by Dissertation / Thesis Program. Although this model of learning can be done
        in a shorter amount of time compared to the traditional coursework method, it is by no means less taxing. These
        programs are rigorous but just as rewarding as the result is a work of publishable quality and depth.
      </p>
    </section>
  );
};

const SeminaryHome = () => {
  return (
    <div className="seminary-home-container">
      <SeminaryHeader />
      <SeminaryCall />
      <SeminaryIntro />
      <SeminaryProgram />
    </div>
  );
};

export default SeminaryHome;
export { SeminaryHeader, SeminaryCall, SeminaryIntro, SeminaryProgram };

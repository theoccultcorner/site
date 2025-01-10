import React from 'react';
import { Button } from '@mui/material';

const Formation = () => {
  return (
    <div className="formation-container">
      <header className="formation-header">
        <h1>Formation</h1>
        <h2>The Seminary of The Gnostic Union</h2>
      </header>

      <section className="formation-intro">
        <h3>Introduction</h3>
        <p>
          There are many belief systems within the Gnostic movement or school of thought. Some use the same format and
          worship as the Roman Catholic Church, with additional scriptures added. Others are more esoteric or mystic,
          offering Kabbalistic ceremonies and writings. Many fall somewhere in between, some even choosing a more spiritual,
          monk-like lifestyle. However, there are many commonalities that The Gnostic Union seeks to present and develop
          in its leadership.
        </p>
        <p>
          The Gnostic formation is more than just shaping a person into uniformity and following orders. We, as Gnostic
          Christians, encourage self-development and connecting with the Spirit within to build a special personal
          relationship with the Divine. We believe that spiritual knowledge comes directly through the Spirit within.
          Our bishops and priests also wish to help and inspire others to grow spiritually and encourage more Gnostic
          teachers.
        </p>
      </section>

      <section className="formation-education">
        <h3>Education</h3>
        <p>
          Education within The Gnostic Union seeks further insight into the direct experiences of the Spirit and
          knowledge of Gnostic scripture. Unfortunately, many seminaries neglect individual spiritual development
          in favor of dogmatic thinking and voluminous writing, rather than focusing on spiritual experience and enlightenment.
        </p>
        <p>
          Scholarship is not rejected. We, at The Gnostic Union, encourage our students to be educated and to educate
          themselves, not only mentally but spiritually. We do not sterilize religion; we make it more spiritually accessible.
          Our friends in the Catholic orthodox world deleted and suppressed critical writings and views of early Christianity,
          condemning any perspective outside of their understanding of Christianity. We do not. Instead, we encourage
          our students to develop their own understanding and views.
        </p>
      </section>

      <section className="formation-clergy">
        <h3>The Role of Gnostic Clergy</h3>
        <p>
          Orthodox groups have tried to form spiritual organizations, while Gnostics have been more liberal and focused
          on inner Christianity. We seek to include many forms of Christianity instead of strictly adhering to dogma.
          Our clergy are well-educated in the various practices that have preserved Gnostic thought over the centuries
          since this spiritual movement was forbidden.
        </p>
        <p>
          The ideal Gnostic clergy is a risk-taker, communicator, and guidance provider. Unfortunately, Gnosticism is
          still not widely accepted, so our clergy must be willing to put forth spiritual concepts not widely accepted
          by organized religion. The Gnostic Union Seminary prepares individuals to communicate complex spiritual
          concepts in writing and orally. Public teaching, sermons, and ceremonies are vital to spreading Gnosticism,
          which student clergy learn during their seminary development.
        </p>
      </section>

      <section className="formation-resurgence">
        <h3>Gnosticism in the Modern World</h3>
        <p>
          Gnosticism has experienced a resurgence of interest in society. Various movies and the rediscovery of our
          ancient scriptures over the last decades have made it necessary to prepare clergy to address the spiritual
          needs of the public. While successful as a worldly organization, orthodox Christianity has not always met
          people's needs or assisted the Spirit within to emerge.
        </p>
        <p>
          The Gnostic Union seeks to educate clergy and inform the public of hidden Christianity, long suppressed
          but ready to re-emerge.
        </p>
      </section>

      <footer className="formation-footer">
        <p>
          <strong>In the Light of the Logos,</strong>
        </p>
        <p>
          Bishop Nathan Wilson, DMin<br />
          Foreign Distant Educator and Archbishop of The Gnostic Union
        </p>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            href="mailto:BishopNathanWilson@TheGnosticUnion.org"
          >
            Contact Us
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Formation;

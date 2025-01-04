import React from 'react';
import { Button } from '@mui/material';

const Formation = () => {
  return (
    <div className="formation-container">
      <header className="formation-header">
        <h1>Formation</h1>
        <h2>The Seminary of the Gnostic Catholic Union</h2>
      </header>

      <section className="formation-intro">
        <h3>Introduction</h3>
        <p>
          There are many types of belief systems within the Gnostic Movement. Some use the same format and worship forms as the Roman Catholic Church, with additional scriptures added. Others are more esoteric, offering Kabbalistic ceremonies and writings. Many are somewhere in between these extremes. However, there are many commonalities that The Gnostic Catholic Union seeks to present and develop in its leadership.
        </p>
        <p>
          The Gnostic formation is more than just molding or shaping a person into a uniform, rigid, religious professional. Inspiration for an individual seeking holy orders comes first from the Spirit. Most Gnostics are inclined to seek knowledge of the Spirit directly, feeling that something is missing in traditional orthodox spirituality. More than the average Gnostic, the person seeking Holy Orders within Gnosticism has developed deep insights, so much so that they want to teach and help others to discover the Spirit within.
        </p>
      </section>

      <section className="formation-education">
        <h3>Education</h3>
        <p>
          Education within The Gnostic Catholic Union Seminary seeks further insight into the direct experience of the Spirit and knowledge of Gnostic scripture. Unfortunately, many seminaries neglect individual spiritual development in favor of intellectual understanding and voluminous writing, making spirituality a compartmentalized paradigm rather than a spiritual experience.
        </p>
        <p>
          While scholarship is not neglected, the Gnostic Catholic clergy education process emphasizes the individual spiritual understanding of the clergy and the lay people to be served. We do not sterilize religion; we make it accessible. Our friends, the Orthodox Catholics, deleted critical writings like the Gospel of Thomas and others, which Gnostics have revived, offering a roadmap toward individual peak spiritual experiences.
        </p>
      </section>

      <section className="formation-clergy">
        <h3>The Role of Gnostic Clergy</h3>
        <p>
          Orthodox groups have tried to form a spiritual organization, while Gnostics have been more liberal and focused on inner Christianity. We seek to include many forms of Christianity instead of strictly adhering to dogma. Clergy are well-educated in the various practices that preserved Gnostic thought over the centuries since this religion was forbidden.
        </p>
        <p>
          The ideal Gnostic clergy is a risk taker, communicator, and guidance provider. Unfortunately, Gnosticism is still not widely accepted, so our clergy must be willing to put forth spiritual concepts not widely accepted by organized religion. The Gnostic Catholic Union Seminary prepares individuals to communicate complex spiritual concepts in writing and orally. Public teaching, sermons, and ceremonies are vital to spreading Gnosticism, which student clergy learn early in their seminary development.
        </p>
      </section>

      <section className="formation-resurgence">
        <h3>Gnosticism in the Modern World</h3>
        <p>
          Gnosticism has experienced a resurgence of interest in society. Various movies and the rediscovery of our scripture over the last decades have made it necessary to prepare clergy to address the spiritual needs of the public. While successful as a worldly organization, orthodox Christianity has not always met people's needs or assisted the Spirit within to emerge.
        </p>
        <p>
          The Gnostic Catholic Union seeks to educate clergy and inform the public of hidden Christianity, long suppressed but ready to re-emerge.
        </p>
      </section>

      <footer className="formation-footer">
        <p><strong>In the Light of the Logos,</strong></p>
        <p>
          Bishop Jason Jones, G.S.J., S.T.L., M.S., DMin., Ed.D.<br />
          Rector and Academic Dean of The Gnostic Catholic Union Seminary
        </p>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          href="mailto:BishopJasonJones@TheGnosticCatholicUnion.org"
        >
          Contact Us
        </Button>
      </div>
      </footer>
    </div>
  );
};

export default Formation;

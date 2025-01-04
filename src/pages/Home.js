import React from 'react';
import { FaFacebook, FaYoutube } from 'react-icons/fa';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to The Gnostic Union</h1>
      <p style={styles.subtitle}>Exploring the Ancient Wisdom of Gnosticism</p>

      <section style={styles.section}>
        <p style={styles.description}>
          The Gnostic Union is an independent sacramental assembly of Gnostic Christian communities and individuals. It exists to uphold the Gnostic Christian traditions and to encourage and promote the work of Christ and the Holy Sophia in the world.
        </p>
        <p style={styles.description}>
          As an international, independent autonomous, and non-political organization, The Gnostic Union is in no way dependent upon any other authority outside of its own administration. We are neither Roman Catholic, Orthodox, nor Protestant. We are Gnostic Christians that encourage self-development and connecting with the spirit within to build a personal relationship with God, The Monad, The Father. Our bishops, priests, and deacons are merely guides to help you on your spiritual journey.
        </p>
        <p style={styles.description}>
          The Gnostic Union aligns itself with the history and teachings of the first Christians of early 1st century Christianity and the teachings of Jesus Christ as found in the Gospel of Thomas. We encourage our new members to read from the Nag Hammadi and to understand how different early Christianity is from modern mainstream Christianity. We welcome all people, regardless of past religious backgrounds or faiths.
        </p>
        <p style={styles.description}>
          Gnosis means knowledge—not just simple intellectual knowledge, but deep spiritual knowledge within you. Knowledge from the Spirit, from the Holy Spirit, and from and of God.
        </p>
      </section>

      <h1 style={styles.title}>Gnostic Christian Theology & History</h1>

      <section style={styles.section}>
        <p style={styles.description}>
          Gnostic Christian Theology differs greatly from Roman Catholicism and Eastern Orthodoxy. Gnostic Christianity does not depend on the authority of a pope or the church. Instead, it emphasizes being reborn in Spirit, building a personal spiritual relationship with God, and becoming Christ-like by enacting the teachings of Jesus Christ in our lives.
        </p>
        <p style={styles.description}>
          Gnostic Christianity began from earlier Gnostic traditions, such as Hermeticism and Mysticism, which arose from Jewish mystics. Gnosticism itself is much older than Judaism and traces back to the Hermetics of ancient Egypt, the Druids, and the ancient Greeks.
        </p>
        <p style={styles.description}>
          Although many Gnostic Christian theologies differed, they shared a common theme of a trapped spiritual essence within the material body—the Divine Spark, the Soul, or the Spark of Sophia. The ultimate goal for Gnostic Christians was to become like Jesus, to be reborn in Spirit (baptism of the Holy Spirit—Sophia), and to "know thyself," reflecting the divine essence within.
        </p>
      </section>

      <div style={styles.socialIcons}>
        <a href="https://www.facebook.com/groups/1683564482015355" target="_blank" rel="noopener noreferrer">
          <FaFacebook size={30} style={styles.icon} />
        </a>
        <a href="https://www.youtube.com/@TheGnosticCatholicUnion" target="_blank" rel="noopener noreferrer">
          <FaYoutube size={30} style={styles.icon} />
        </a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    color: 'black', // Set font color globally
  },
  title: {
    fontSize: '36px',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  section: {
    marginTop: '20px',
  },
  description: {
    fontSize: '18px',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  socialIcons: {
    marginTop: '40px',
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    margin: '0 10px',
    cursor: 'pointer',
    color: 'black', // Icon color set to black
  },
};

export default Home;

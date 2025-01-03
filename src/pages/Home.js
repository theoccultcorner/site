import React from 'react';
import { FaFacebook, FaDiscord, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to The Gnostic Union</h1>
      <p style={styles.subtitle}>Exploring the Ancient Wisdom of Gnosticism</p>
    
     

      <p style={styles.description}>
      The Gnostic Union is an independent Sacramental assembly of Gnostic Christian communities and individuals. It exists to uphold the Gnostic Christian traditions and to encourage and promote the work of Christ and the Holy Sophia in the World.

As an international, independent autonomous, and non-political organisation. The Gnostic Union is in no way dependant upon any other authority outside of its own administration. We are neither Roman Catholic, Orthodox or protestant. We are Gnostic Christians that encourage self development and connecting with the spirit within to build a personal relationship with God, The Monad, The Father. Our Bishops, Priest and Deacons are merely guides to help you on your own Spiritual development. 

The Gnostic Union aligns itself to the history and teaching of the traditions and history of the first Christians of early 1st century Ad Christianity, and the teachings of Jesus Christ as found in the Gospel of Thomas. We encourage our new members to read from the Nag Hammadi and to have an understanding of how different early Christianity is to that of Modern mainstream Christianity. We welcome all people no matter your past religious background or faith.

Gnosis means Knowledge not just simple intellectual knowledge but deep spiritual knowledge within you. Knowledge from the spirit, from the Holy spirit and from and of God.



 
 
      </p>
      <h1 style={styles.title}>    Gnostic Christian Theology & History</h1>
      <p style={styles.description}>
    
Gnostic Christian Theology differs greatly from Roman Catholicism and Eastern Orthodoxy. Gnostic Christianity does not depend on the authority of a pope or the church, rather being reborn in Spirit, building a personal spiritual relationship with God and becoming Christ like for ourselves, by enacting the teachings of Jesus the Christ into our lives. Gnostic Christianity began from earlier Gnostic traditions which would be called Hermeticism and Mysticism, that arose from Jewish Mystics. Gnosticism itself is much older than Judaism and goes back to the Hermetics of ancient Egypt, the druids and the ancient Greeks. Gnostic Christianity began in the 1st century Ad and was amongst the first Jewish and Gentile Christian groups. Gnostic Christianity was originally the most popular form of Christianity having an extensive collection of writings and sub groups, The early Gnostic Christians would preach and encourage their beliefs of equality, non-violence, encouragement of free education and the teachings of Jesus. By the late 2nd century all the way up to the 18th century Gnostic Christians were persecuted and burnt as heretics and witches. 

      </p>
    <p>Although many Gnostic Christian theologies differed, they shared a common theme of a trapped spiritual essence within the material body- The Divine Spark- the Soul- the Spark of Sophia- an emanation or essence of God, and that the true Perfect God Jesus spoke of as his and our Father. Is not the vengeful god of the old testament Yahweh, that many Gnostics called Yaldabaoth or the Demiurge. A false lesser or evil god, or a man made god. The main goal for the Gnostic Christians was while alive to become like Jesus themselves, to become Christ like, and to be reborn in Spirit which is the baptism of the Holy Spirit- Sophia and to know thy self which is the spirit within and what you are. A reflection of the Divine, and by connecting with the Spirit within. One may build a personal relationship with God, by living in accordance with God and our true spiritual nature that is the Christ. Than we can return to the True Perfect God and the Pleroma, the True Heaven, through Gnosis. Not blind faith.
    </p>
      <div style={styles.socialIcons}>
        <a href="https://www.facebook.com/groups/1683564482015355" target="_blank" rel="noopener noreferrer"><FaFacebook size={30} style={styles.icon} /></a>
        <a href="https://discord.gg/Jq8tw8h2" target="_blank" rel="noopener noreferrer"><FaDiscord size={30} style={styles.icon} /></a>
        <a href="https://www.youtube.com/@TheGnosticCatholicUnion" target="_blank" rel="noopener noreferrer"><FaYoutube size={30} style={styles.icon} /></a>
 
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '36px',
    color: '#333',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '24px',
    color: '#666',
    marginBottom: '20px',
  },
  description: {
    fontSize: '18px',
    color: '#777',
    marginTop: '20px',
    lineHeight: '1.6',
  },
  socialIcons: {
    marginTop: '40px',
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    margin: '0 10px',
    cursor: 'pointer',
    color: 'black', // Change color to black
  },
};

export default Home;

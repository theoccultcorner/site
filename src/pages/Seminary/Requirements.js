import React from 'react';
import { Button } from '@mui/material';

const Requirements = () => {
  return (
    <div className="requirements-container">
      <h1>Requirements for Ordination and Incardination</h1>
      <p>
        Ordination to the minor and major orders of The Gnostic Catholic Union is open to both men and women. The minor orders are administered in local parishes. Candidates for holy orders must possess a sincere commitment to the Gnostic tradition and must be determined to exercise pastoral ministry. All persons in major orders are expected to participate in administering the sacraments on a regular basis.
      </p>
      <p>
        The Diploma in Ministry (DipM) is a requirement for ordination to Deacon and is designed to allow you to continue to serve where you are. This unique online ministry degree is formatted to combine seminary training with practical oversight and hands-on training from an approved priest or bishop in your area. This certificate is available online, so it requires that a student have a computer with MS Word and internet access. At this time, it is only offered in English.
      </p>
      <p>
        We ordain clergy for our own jurisdiction and prefer to have parishes led by properly trained priests with a genuine Gnostic commitment. At this time, The Gnostic Catholic Union has parishes in Boston, MA; Florahome, FL; Jacksonville, FL; Mercersburg, PA; Grand Bay, AL; Pomona, NY; and Campbellsville, KY.
      </p>

      <h3>Goals</h3>
      <ul>
        <li>Develop a personal plan for spirituality.</li>
        <li>Know the difference between religion and spirituality.</li>
        <li>Use the Gospel of Thomas as a guide for personal and church spirituality.</li>
        <li>Experience meditative states as a means of spiritual experience.</li>
        <li>Identify peak experiences versus emotional problems.</li>
        <li>Create lesson plans or sermons on Gnostic spirituality.</li>
        <li>Understand and use spiritual direction with church members.</li>
      </ul>
      <p>
        Candidates for ordination to the Priesthood are required to complete The Bachelor of Arts in Theology (ThB) offered by the Gnostic Catholic Union Seminary.
      </p>
      <p>
        Candidates for incardination must read one of the three books listed below and submit a Critical Book Review:
      </p>
      <ul>
        <li><i>Care of Mind Care of Spirit: A Psychiatrist Explores Spiritual Direction</i> by Gerald G. May, MD</li>
        <li><i>Religions, Values, and Peak Experiences</i> by Abraham Maslow</li>
        <li><i>The Gospel of Thomas: The Gnostic Wisdom of Jesus</i> by Jean-Yves Leloup</li>
      </ul>
      <p>
        A clergy candidate must be a whole and healthy person, known by deep character, professional skill, and knowledge. Because these cannot all be learned solely in an academic classroom, students participate in the Personal Formation (P.F.) program. This experience draws together a network of professionals and mentors who share your journey and guide you in transitioning the theoretical into your practical daily life. Through this, students can grow as whole persons and develop into lifelong learners who value, pursue, and experience growth through relationships with God and others.
      </p>
      <p>
        <strong>In the Light of the Logos,</strong>
      </p>
      <p>
        Bishop Nathan Wilson<br />
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
    </div>
  );
};

export default Requirements;

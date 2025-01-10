import React from 'react';
import { Typography, Box } from '@mui/material';

const Accreditation = () => {
  return (
    <Box style={styles.container}>
      <Typography variant="h4" style={styles.title}>
        Accreditation
      </Typography>

      <Typography variant="h6" style={styles.subTitle}>
        State of California Department of Education
      </Typography>

      <Typography variant="body1" style={styles.text}>
        In the United States of America, jurisdiction over degree-granting institutions rests with the individual state governments. Compliance with state regulations is the necessary condition for offering a legitimate, legal degree. The Gnostic Union grants degrees under the authority of the California Bureau for Private Postsecondary Education (BPPE) in compliance with the California Education Code, Title 3, Division 10, Part 59, Chapter 8. This compliance authorizes the seminary to offer its degree programs.
      </Typography>

      <Typography variant="h6" style={styles.subTitle}>
        Please Note
      </Typography>

      <Typography variant="body1" style={styles.text}>
        The Gnostic Union, as well as other Christian colleges, are <strong>NOT</strong> required to be regionally accredited by the California Department of Education or other federal accrediting bodies. While the institution operates legally within California, credits earned from the seminary may not transfer to other institutions or qualify for state licensure.
      </Typography>

      <Typography variant="body1" style={styles.text}>
        The Gnostic Union emphasizes the spiritual and ecclesiastical application of its programs and degrees. These degrees are intended for ministry and theological enrichment within The Gnostic Union and affiliated organizations.
      </Typography>
    </Box>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  subTitle: {
    marginTop: '20px',
    marginBottom: '10px',
    color: '#444',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  text: {
    marginBottom: '15px',
    lineHeight: '1.6',
    color: '#555',
  },
};

export default Accreditation;

import React from 'react';
import { Typography, Box } from '@mui/material';

const Accreditation = () => {
  return (
    <Box style={styles.container}>
      <Typography variant="h4" style={styles.title}>
        Accreditation
      </Typography>

      <Typography variant="h6" style={styles.subTitle}>
        State of Florida Department of Education
      </Typography>

      <Typography variant="body1" style={styles.text}>
        In the United States of America, jurisdiction over degree-granting institutions rests with the individual state governments. Compliance with state regulations is the necessary condition for offering a legitimate, legal degree. The Gnostic Catholic Union Seminary grants degrees under the authority of the Florida State Board of Independent Colleges and Universities in compliance with Section 1005.06(1)(f), Florida Statutes. The State of Florida does not require regional or theological accreditation.
      </Typography>

      <Typography variant="h6" style={styles.subTitle}>
        Please Note
      </Typography>

      <Typography variant="body1" style={styles.text}>
        The Gnostic Catholic Union Seminary, as well as other Christian colleges, are <strong>NOT</strong> required to be regulated by the Florida Department of Education (FLDOE); therefore, this institution is not listed with the FLDOE as a ‘regulated’ institution. That being said, credits from the Gnostic Jesuit School of Theology likely will not transfer to another institution.
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

import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const About = () => {
  const sections = [
    {
      title: 'Welcome to The Gnostic Union',
      content:
        'We are a world church and communion of churches in the tradition of the Independent Gnostic faiths and are guided by "A Gnostic Catechism" prepared by The Most Reverend Stephan A. Hoeller. We are welcoming and inclusive of all people.',
    },
    {
      title: 'Who We Are',
      content:
        'The Gnostic Union is hereby constituted for the purpose of creating a unified presence for the Gnostic Apostolic jurisdictions in the United States of America and Canada, providing a network of communication amongst these groups, and providing a mechanism for the resolution of disputes in accord with the honor and dignity befitting our calling.',
    },
    {
      title: 'Our Mission',
      content:
        'The Gnostic Union is an Independent Sacramental assembly of Liberal and Gnostic communities and individuals. The Union exists to uphold the Gnostic tradition and to encourage and forward the work of the Christ and the Holy Sophia in the world.',
    },
    {
      title: 'Independence',
      content:
        'As an international, independent, autonomous, and non-political organization, the Gnostic Union is in no way dependent upon any other authority outside its own administration. We are neither Roman Catholic nor Protestant.',
    },
    {
      title: 'Gnosis',
      content:
        'Gnosis means knowledge, not simply intellectual knowledge, but a deep, spiritual knowledge. Our Apostolic Lineages trace back through many paths most notably to the Old Gnostic traditions and the French Gnostic Church.',
    },
    {
      title: 'Gnostic Theology',
      content:
        'Gnostic Theology refers to a number of theologies originating among the Hellenistic Jewish and Christian communities, influenced by the Greek Mystery Traditions, in the 1st century. Gnostic-Christianity, in its various forms, flourished in the 2nd century within the early Christian Church and Gnostic influences are noticeable even in today\'s most conventional Churches.',
    },
    {
      title: 'Unity',
      content:
        'Originating in the intellectual “café societies” of Alexandria around 200 BCE, the original Gnostics were Greek-educated Jews, living in Egypt, on the doorstep of the Roman Empire. While it does seem odd to found a religion in an ancient Egyptian Starbucks with a group of Jews debating Greek philosophy, this is precisely where our story begins: with artists and initiates inhaling the erotic perfume of dangerous ideas.',
    },
    {
      title: 'The Nag Hammadi Library',
      content:
        'Since the discovery of the Nag Hammadi Library of Coptic Gnostic scriptures in 1945 and its subsequent translation and publication in 1977, a considerable number of organizations bearing the name "Gnostic" have emerged. Gnosticism now stands revealed as a fascinating and creative early variant of Christianity that possesses many features of contemporary relevance.',
    },
    {
      title: 'Modern Practices',
      content:
        'While there are a number of established Gnostic churches with robed priests and deacons with apostolic succession, this is the exception. Most practicing Gnostics are solitary practitioners or lead small study groups or home churches in living rooms, restaurant meeting rooms, or even storefronts. This is a valued and time-honored tradition, too.',
    },
  ];

  return (
    <div style={styles.container}>
      <Typography variant="h3" style={styles.title}>
        About Us
      </Typography>
      <Grid container spacing={3}>
        {sections.map((section, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card style={styles.card}>
              <CardContent>
                <Typography variant="h5" style={styles.cardTitle}>
                  {section.title}
                </Typography>
                <Typography variant="body1" style={styles.cardContent}>
                  {section.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
    color: '#333',
  },
  card: {
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  cardTitle: {
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  cardContent: {
    color: '#555',
    lineHeight: '1.6',
  },
};

export default About;

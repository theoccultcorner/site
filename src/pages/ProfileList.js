import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Avatar, Typography, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

function ProfileList() {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'profiles'));
        const fetchedProfiles = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProfiles(fetchedProfiles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  return (
    <Grid container spacing={3} style={{ padding: '20px' }}>
      {profiles.map((profile) => (
        <Grid item xs={12} sm={6} md={4} key={profile.id}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            {/* Avatar with link */}
            <Link to={`/profile/${profile.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Avatar
                src={profile.photoURL}
                alt={profile.displayName}
                sx={{ width: 80, height: 80, margin: '0 auto', marginBottom: '10px' }}
              />
              <Typography variant="h6" gutterBottom>
                {profile.displayName}
              </Typography>
            </Link>
            <Typography variant="body1">
              <strong>Email:</strong> {profile.email || 'Not provided'}
            </Typography>
            <Typography variant="body1">
              <strong>Bio:</strong> {profile.bio || 'No bio available'}
            </Typography>
            <Typography variant="body1">
              <strong>Website:</strong>{' '}
              {profile.website ? (
                <a href={profile.website} target="_blank" rel="noopener noreferrer">
                  {profile.website}
                </a>
              ) : (
                'Not provided'
              )}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default ProfileList;

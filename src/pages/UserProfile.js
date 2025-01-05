import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Avatar, Card, CardContent, Typography } from '@mui/material';

function UserProfile() {
  const { displayName } = useParams(); // Get the displayName from URL parameter
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileRef = doc(db, 'profiles', displayName);
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
          setProfile({ id: profileSnap.id, ...profileSnap.data() });
        } else {
          console.log('No such document!');
          setProfile({ id: profileRef.id, displayName, email: '', bio: '', website: '' });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [displayName]);

  if (loading) {
    return <Typography variant="h6" align="center" style={{ marginTop: '20px' }}>Loading...</Typography>;
  }

  if (!profile) {
    return <Typography variant="h6" align="center" style={{ marginTop: '20px' }}>Profile not found.</Typography>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', padding: '20px' }}>
      <Card sx={{ maxWidth: 600, padding: '20px', textAlign: 'center' }}>
        <CardContent>
          <Avatar
            src={profile.photoURL}
            alt={profile.displayName}
            sx={{
              width: 120,
              height: 120,
              margin: '0 auto 20px auto',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Typography variant="h5" gutterBottom>
            {profile.displayName || 'No Display Name'}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {profile.email ? (
              <a
                href={`mailto:${profile.email}`}
                style={{ color: '#1976d2', textDecoration: 'none' }}
              >
                {profile.email}
              </a>
            ) : (
              'No Email Available'
            )}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {profile.bio || 'No Bio Available'}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {profile.website ? (
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#1976d2', textDecoration: 'none' }}
              >
                {profile.website}
              </a>
            ) : (
              'No Website Available'
            )}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserProfile;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import Firestore database instance
import { Avatar, Card, CardContent, Typography } from '@mui/material';

function UserProfile() {
  const { displayName } = useParams(); // Get the displayName from URL parameter
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Construct profile reference
        const profileRef = doc(db, 'profiles', displayName);
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
          // Set the profile data if it exists
          setProfile({ id: profileSnap.id, ...profileSnap.data() });
        } else {
          console.log('No such document!');
          // If profile does not exist, create a new one with initial data
          setProfile({ id: profileRef.id, displayName, email: '', bio: '', website: '' });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error); // Log any errors
        setLoading(false);
      }
    };

    fetchProfile();
  }, [displayName]); // Re-run effect when displayName changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Profile not found.</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent style={{ textAlign: 'center' }}>
          <Avatar src={profile.photoURL} alt={profile.displayName} sx={{ width: 100, height: 100, marginBottom: 2 }} />
          <Typography variant="h5" gutterBottom>
            {profile.displayName}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {profile.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {profile.bio}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {profile.website}
          </Typography>
          {/* Add more profile details here */}
        </CardContent>
      </Card>
    </div>
  );
}

export default UserProfile;

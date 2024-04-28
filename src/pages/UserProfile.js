import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import Firestore database instance
import { Avatar } from '@mui/material';

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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>User Profile</h2>
      <Avatar src={profile.photoURL} alt={profile.displayName} sx={{ width: 100, height: 100, marginBottom: 5 }} />
      <div>
        <strong>Name:</strong> {profile.displayName}
      </div>
      <div>
        <strong>Email:</strong> {profile.email}
      </div> 
      <div>
        <strong>Bio:</strong> {profile.bio}
      </div> 
      <div>
        <strong>Website:</strong> {profile.website}
      </div> 
      {/* Add more profile details here */}
    </div>
  );
}

export default UserProfile;

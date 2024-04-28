import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from React Router

function ProfileList() {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'profiles'));
        const fetchedProfiles = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

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
    return <div>Loading...</div>;
  }

  return (
    <div>
 
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {profiles.map(profile => (
          <li key={profile.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            {/* Wrap Avatar component in Link */}
            <Link to={`/profile/${profile.id}`}>
              <Avatar src={profile.photoURL} alt={profile.displayName} sx={{ width: 100, height: 100, marginBottom: 2 }} />
            </Link>
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileList;

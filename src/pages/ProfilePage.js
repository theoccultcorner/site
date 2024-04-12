import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const ProfilePage = () => {
  const { displayName } = useParams(); // Get displayName from URL
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profilesCollection = collection(db, 'profiles');
        const q = query(profilesCollection, where("displayName", "==", displayName));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0]; // Taking the first document found
          setProfile(docSnap.data());
        } else {
          console.log("No such profile!");
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [displayName]);

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <h1>{profile.displayName}'s Profile</h1>
      {/* Render profile details */}
      <div>Email: {profile.email}</div>
      {/* Add more profile information */}
    </div>
  );
};

export default ProfilePage;

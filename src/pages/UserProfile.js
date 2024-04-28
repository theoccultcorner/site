import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import Firestore database instance
import { Avatar } from '@mui/material';

function UserProfile() {
  const { displayName } = useParams(); // Get the displayName from URL parameter
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editableProfile, setEditableProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Construct profile reference
        const profileRef = doc(db, 'profiles', displayName);
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
          // Set the profile data if it exists
          setProfile({ id: profileSnap.id, ...profileSnap.data() });
          setEditableProfile({ id: profileSnap.id, ...profileSnap.data() });
        } else {
          console.log('No such document!');
          // If profile does not exist, create a new one with initial data
          await setDoc(profileRef, { displayName, email: '', bio: '', website: '' });
          setProfile({ id: profileRef.id, displayName, email: '', bio: '', website: '' });
          setEditableProfile({ id: profileRef.id, displayName, email: '', bio: '', website: '' });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error); // Log any errors
        setLoading(false);
      }
    };

    fetchProfile();
  }, [displayName]); // Re-run effect when displayName changes

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const profileRef = doc(db, 'profiles', displayName);
      await updateDoc(profileRef, editableProfile);
      setProfile({ ...editableProfile });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile({ ...editableProfile, [name]: value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Profile not found.</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2> </h2>
      <Avatar src={profile.photoURL} alt={profile.displayName} sx={{ width: 100, height: 100, marginBottom: 5 }} />
      <div>
        <strong>Name:</strong> {profile.displayName}
      </div>
      <div>
        <strong>Email:</strong> {isEditing ? <input type="text" name="email" value={editableProfile.email} onChange={handleChange} /> : profile.email}
      </div> 
      <div>
        <strong>Bio:</strong> {isEditing ? <textarea name="bio" value={editableProfile.bio} onChange={handleChange} /> : profile.bio}
      </div> 
      <div>
        <strong>Website:</strong> {isEditing ? <input type="text" name="website" value={editableProfile.website} onChange={handleChange} /> : profile.website}
      </div> 
      {/* Add more profile details here */}

      {isEditing ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
    </div>
  );
}

export default UserProfile;

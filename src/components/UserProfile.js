import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
import { Form, Button } from 'react-bootstrap';

import { Container, Row, Col } from 'react-bootstrap';

function UserProfile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    beltRank: '',
    bjjSchool: ''
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userRef = firestore.collection('users').doc(auth.currentUser.uid);
      const doc = await userRef.get();
      if (doc.exists) {
        setProfile(doc.data());
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userRef = firestore.collection('users').doc(auth.currentUser.uid);
    await userRef.update(profile);
    // Handle post-update logic
  };

  return (
    <div>
      <h2>User Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            name="name" 
            value={profile.name} 
            onChange={handleChange} 
          />
        </Form.Group>
        {/* Add fields for email, beltRank, and bjjSchool similarly */}
        <Button type="submit">Update Profile</Button>
      </Form>
    </div>
  );
}

export default UserProfile;

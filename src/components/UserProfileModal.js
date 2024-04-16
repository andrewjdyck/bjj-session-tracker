import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
import { Form, Button, Modal } from 'react-bootstrap';

// import { Container, Row, Col } from 'react-bootstrap';

function UserProfileModal( { show, handleClose, user }) {
  // const [user, setUser] = useState(null); // State to store user data
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    beltRank: '',
    bjjSchool: '',
    firstName: '',
    lastName: ''
  });

  useEffect(() => {
    // if (auth.currentUser) {
    if (user) {
      const fetchUserProfile = async () => {
        // const userRef = firestore.collection('users').doc(auth.currentUser.uid);
        const userRef = firestore.collection('users').doc(user.uid);
        const doc = await userRef.get();
        if (doc.exists) {
          setProfile(doc.data());
          // setUser(auth.currentUser);
        }
      };

      fetchUserProfile();
    } else {
      // Optionally handle the case when no user is signed in
      console.log("No user is signed in.");
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth.currentUser) {
      const userRef = firestore.collection('users').doc(auth.currentUser.uid);
      await userRef.update(profile);
      // Handle post-update logic
    } else {
      console.error("No user is signed in.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>User Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>

          {/* Form fields */}
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control 
              type="text" 
              name="firstName" 
              value={profile.firstName} 
              onChange={handleChange} 
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control 
              type="text" 
              name="lastName" 
              value={profile.lastName} 
              onChange={handleChange} 
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Belt Rank</Form.Label>
            <Form.Control 
              type="text" 
              name="beltRank" 
              value={profile.beltRank} 
              onChange={handleChange} 
            />
          </Form.Group>

          {/* Add fields for email, beltRank, and bjjSchool similarly */}
          <Button type="submit">Update Profile</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UserProfileModal;

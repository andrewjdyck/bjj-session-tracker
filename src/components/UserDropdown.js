import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import { auth } from '../firebase';

import UserProfileModal from './UserProfileModal';

function UserDropdown( { user, sessions } ) {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      // Optional: Redirect to sign-in page or display a message
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleShowProfileModal = () => setShowProfileModal(true);
  const handleCloseProfileModal = () => setShowProfileModal(false);

  return (
    <Dropdown align="end" className="ml-auto">
      <UserProfileModal show={showProfileModal} handleClose={handleCloseProfileModal} user={user} />
      <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="ml-auto">
        {/* {user.email} */}
        {user ? user.email : 'Guest'}
      </Dropdown.Toggle>

      <Dropdown.Menu className="ml-auto">
        {/* <Button onClick={handleShowProfileModal}>Edit Profile</Button> */}
        {/* <Dropdown.Item as={Link} to="/">Log Training</Dropdown.Item> */}
        {/* <Dropdown.Item as={Link} to="/sessions">Sessions</Dropdown.Item> */}
        {/* <Dropdown.Item as={Link} to="/profile">User Profile</Dropdown.Item> */}
        <Dropdown.Item onClick={handleShowProfileModal}>Profile</Dropdown.Item>
        <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    
  );
}

export default UserDropdown;
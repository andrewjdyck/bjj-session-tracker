import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

function UserDropdown( {user} ) {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      // Optional: Redirect to sign-in page or display a message
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {/* {user.email} */}
        {user ? user.email : 'Loading...'}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/profile">User Profile</Dropdown.Item>
        {/* <Dropdown.Item href="#/settings">Settings</Dropdown.Item> */}
        <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserDropdown;
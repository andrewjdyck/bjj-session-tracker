import React from 'react';
// import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';

// import UserDropdown from './UserDropdown';

function NavigationBar( { user, sessions } ) {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>BJJ Session Tracker</Navbar.Brand>
        {/* <UserDropdown user={user} sessions={sessions} /> */}
      </Container>
    </Navbar>
  );
}

export default NavigationBar;

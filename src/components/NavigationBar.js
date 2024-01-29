import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

import UserDropdown from './UserDropdown';

function NavigationBar( {user} ) {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">BJJ Session Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link as={Link} to="/home">Home</Nav.Link> */}
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#sessions">Sessions</Nav.Link>
            {/* Add other navigation links here */}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <UserDropdown user={user} />
    </Navbar>
  );
}

export default NavigationBar;

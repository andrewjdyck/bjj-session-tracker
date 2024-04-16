// Header.js
import React from 'react';
import { Container } from 'react-bootstrap';

// import NavigationBar from './NavigationBar';
import UserDropdown from './UserDropdown';

function Header({ user, sessions }) {
  return (
    <header className="d-flex justify-content-end p-3">
      <Container>
        <UserDropdown user={user} className="ml-auto" />
      </Container>
    </header>
    // <header>
    //   {/* <NavigationBar user={user} sessions={sessions} /> */}
    //   <UserDropdown user={user} sessions={sessions} />
    // </header>
  );
}

export default Header;

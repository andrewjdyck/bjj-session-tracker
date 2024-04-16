import React from 'react';
import Header from './Header';
// import Footer from './Footer';
// import UserDropdown from './UserDropdown';

const Layout = ({user, sessions, children }) => {
  return (
    <>
      <Header user={user} sessions={sessions} />
      {/* <UserDropdown user={user} /> */}
      {children}
      {/* <Footer /> */}
    </>
  );
}

export default Layout;
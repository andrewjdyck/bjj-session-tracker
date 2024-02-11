import React from 'react';
import Header from './Header';
// import Footer from './Footer';

const Layout = ({user, sessions, children }) => {
  return (
    <>
      <Header user={user} sessions={sessions} />
      {children}
      {/* <Footer /> */}
    </>
  );
}

export default Layout;
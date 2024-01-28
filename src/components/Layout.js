import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({user, children }) => {
  return (
    <>
      <Header user={user} />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
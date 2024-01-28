// Header.js
import React from 'react';
import { auth } from '../firebase';

function Header({ user }) {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header>
      {user && <button onClick={handleSignOut}>Sign Out</button>}
    </header>
  );
}

export default Header;

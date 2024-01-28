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
      {user && (
        <div>
            <button onClick={handleSignOut}>Sign Out, {user.email}</button>
        </div>
        )}
    </header>
  );
}

export default Header;

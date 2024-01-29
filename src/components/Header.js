// Header.js
import React from 'react';
// import { auth } from '../firebase';

import NavigationBar from './NavigationBar';

function Header({ user }) {
  // const handleSignOut = async () => {
  //   try {
  //     await auth.signOut();
  //   } catch (error) {
  //     console.error('Error signing out:', error);
  //   }
  // };

  return (
    <header>
      {/* {user && (
        <div>
            <button onClick={handleSignOut}>Sign Out, {user.email}</button>
        </div>
        )} */}
      <NavigationBar user={user} />
    </header>
  );
}

export default Header;

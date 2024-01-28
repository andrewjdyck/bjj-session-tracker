import React, { useState } from 'react';
import { auth, firestore } from '../firebase';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Add other states as needed, e.g., belt rank, academy name

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      // After the user is created, you can add additional user info to Firestore
      await firestore.collection('users').doc(user.uid).set({
        // Add user-related data here
        email,
        // beltRank,
        // academyName,
        // etc.
      });
      // Handle post-signup actions (like redirecting to a sign-in page or displaying a success message)
    } catch (error) {
      // Handle errors
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {/* Add more input fields as needed */}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;

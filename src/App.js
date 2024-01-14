import React, { useState, useEffect } from 'react';
import SessionForm from './components/SessionForm';
import SessionList from './components/SessionList';
import SignIn from './components/SignIn';
import { auth, firestore } from './firebase';  // Import firestore from firebase.js
import './App.css';


function App() {
  const [user, setUser] = useState(null); // State to store user data
  const [sessions, setSessions] = useState([]);

  // Set up a listener to update the user state when authentication status changes
  auth.onAuthStateChanged((currentUser) => {
    setUser(currentUser);
  });

  useEffect(() => {
    if (user) {
      const unsubscribe = firestore
        .collection('sessions')
        .doc(user.uid)
        .collection('userSessions')
        .orderBy('date', 'desc')
        .onSnapshot((snapshot) => {
          const userSessions = snapshot.docs.map((doc) => doc.data());
          setSessions(userSessions);
        });

      return () => unsubscribe();
    }
  }, [user]);

  // const addSession = (newSession) => {
  //   setSessions([...sessions, newSession]);
  // };

  const addSession = async (newSession) => {
    if (user) {
      try {
        await firestore.collection('sessions').doc(user.uid).collection('userSessions').add(newSession);
      } catch (error) {
        console.error('Error adding session:', error.message);
      }
    }
  };

  return (
    <div className="App">
      <h1>BJJ Session Tracker</h1>
      {user ? (
        <div>
          <SessionForm onAddSession={addSession} />
          <SessionList sessions={sessions} />
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
}

export default App;

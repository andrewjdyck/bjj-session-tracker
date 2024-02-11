import React, { useState, useEffect } from 'react';
import { auth, firestore } from './firebase';  // Import firestore from firebase.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import UserProfile from './components/UserProfile';
import Layout from './components/Layout';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SessionList from './components/SessionList';
// import './Custom.scss';





function App() {
  const [user, setUser] = useState(null); // State to store user data
  const [sessions, setSessions] = useState([]);
  // const [authOption, setAuthOption] = useState('signIn'); // or 'signUp'


  // Set up a listener to update the user state when authentication status changes
  // This listener is called when the app starts and every time a user signs in or out
  // UseEffect for auth state changes
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      // if (currentUser) {
      //   loadUserSessions(currentUser);
      // }
    });

    // Cleanup function
    return () => unsubscribeAuth();
  }, []);

  // this sets up a real-time listener to a firestore database
  // UseEffect for Firestore listener
  useEffect(() => {
    let unsubscribeFirestore = () => {};

    if (user) {
      unsubscribeFirestore = firestore
        .collection('sessions')
        .doc(user.uid)
        .collection('userSessions')
        .orderBy('date', 'desc')
        .onSnapshot((snapshot) => {
          const userSessions = snapshot.docs.map((doc) => ({
            id: doc.id, // Attach the document ID
            ...doc.data()
          }));
          setSessions(userSessions);
        });
    }

    // Cleanup function
    return () => unsubscribeFirestore();
  }, [user]);

  // const loadUserSessions = (currentUser) => {
  //   // Logic to load user's sessions
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

  // const deleteSession = async (sessionId) => {
  //   if (user) {
  //     try {
  //       await firestore.collection('sessions').doc(user.uid).collection('userSessions').doc(sessionId).delete();
  //     } catch (error) {
  //       console.error('Error deleting session:', error.message);
  //     }
  //   }
  // };
  
  // const editSession = async (sessionId, updatedSession) => {
  //   if (user) {
  //     try {
  //       await firestore.collection('sessions').doc(user.uid).collection('userSessions').doc(sessionId).update(updatedSession);
  //     } catch (error) {
  //       console.error('Error editing session:', error.message);
  //     }
  //   }
  // };

  return (
    <Router>
      <Layout user={user} sessions={sessions} >
        <Routes>
          <Route path="/" element={user ? <HomePage sessions={sessions} onAddSession={addSession} /> : <Navigate replace to="/signin" />} />
          {/* <Route path="/" element={user ? <HomePage sessions={sessions} onAddSession={addSession} onDeleteSession={deleteSession} onEditSession={editSession} /> : <Navigate replace to="/signin" />} /> */}
          <Route path="/signin" element={!user ? <SignIn /> : <Navigate replace to="/" />} />
          <Route path="/signup" element={!user ? <SignUp /> : <Navigate replace to="/" />} />
          <Route path="/profile" element={user ? <UserProfile /> : <Navigate replace to="/signin" />} />
          {/* <Route path="/sessions" element={user ? <SessionList sessions={sessions} onDeleteSession={deleteSession} onEditSession={editSession} /> : <Navigate replace to="/signin" />} /> */}
          {/* <Route path="/sessions" element={user ? <SessionList sessions={sessions} user={user} /> : <Navigate replace to="/signin" />} /> */}
          {/* Add other routes as needed */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

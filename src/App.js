import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Layout from './components/Layout';
import SessionForm from './components/SessionForm';
import SessionList from './components/SessionList';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Header from './components/Header';
import { auth, firestore } from './firebase';  // Import firestore from firebase.js
import './App.css';



function App() {
  const [user, setUser] = useState(null); // State to store user data
  const [sessions, setSessions] = useState([]);
  const [authOption, setAuthOption] = useState('signIn'); // or 'signUp'


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
      // console.log("useEffect called with user:", user);
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

  const deleteSession = async (sessionId) => {
    if (user) {
      try {
        await firestore.collection('sessions').doc(user.uid).collection('userSessions').doc(sessionId).delete();
      } catch (error) {
        console.error('Error deleting session:', error.message);
      }
    }
  };
  
  const editSession = async (sessionId, updatedSession) => {
    if (user) {
      try {
        await firestore.collection('sessions').doc(user.uid).collection('userSessions').doc(sessionId).update(updatedSession);
      } catch (error) {
        console.error('Error editing session:', error.message);
      }
    }
  };

  return (
    <Layout user={user}>
    <div className="App">
      {/* <Header user={user} /> */}
      <h1>BJJ Session Tracker</h1>
      {!user ? (
        <div>
          {authOption === 'signIn' ? (
            <>
              <SignIn />
              <button onClick={() => setAuthOption('signUp')}>Need an account? Sign Up</button>
            </>
          ) : (
            <>
              <SignUp />
              <button onClick={() => setAuthOption('signIn')}>Already have an account? Sign In</button>
            </>
          )}
        </div>
      ) : (
        <>
          <SessionForm onAddSession={addSession} />
          {/* <SessionList sessions={sessions} /> */}
          <SessionList sessions={sessions} onDeleteSession={deleteSession} onEditSession={editSession} />
        </>
      )}
    </div>
    </Layout>
  );
}

export default App;

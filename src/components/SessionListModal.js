import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
import { Form, Button, Modal } from 'react-bootstrap';
import SessionList from './SessionList';

function SessionListModal({ show, handleClose, user, sessions }) {

return (
  <Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>View / Edit Training Sessions</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <SessionList sessions={sessions} />
  </Modal.Body>
  </Modal>
  );
}

export default SessionListModal;
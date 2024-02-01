import React, { useState } from 'react';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';

function SessionList({ sessions, onDeleteSession, onEditSession }) {
  console.log(sessions);
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [updatedSession, setUpdatedSession] = useState({});

  const handleEditClick = (session, sessionId) => {
    setEditingSessionId(sessionId);
    setUpdatedSession(session);
  };

  const handleEditCancelClick = (session, sessionId) => {
    // Reset the editing state
    setEditingSessionId(null);
    setUpdatedSession({});
  };

  const handleDeleteClick = (sessionId) => {
    onDeleteSession(sessionId);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedSession({ ...updatedSession, [name]: value });
  };

  const handleUpdateClick = (sessionId) => {
    onEditSession(sessionId, updatedSession);
    setEditingSessionId(null);
  };

  const sd = [null];

  if (!sessions || sessions.length === 0) {
    return <div>No sessions found</div>;
  }
  
  return (
    <div>
      <h2>Session List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            //  sd = session.sessionData,
            <tr key={session.id}>
              {editingSessionId === session.id ? (
                <>
                  <td>
                    <Form.Control
                      type="text"
                      name="date"
                      value={updatedSession.date}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name="startTime"
                      value={updatedSession.startTime}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name="sessionType"
                      value={updatedSession.sessionType}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <Button variant="success" onClick={() => handleUpdateClick(session.id)}>Update</Button>
                    <Button variant="secondary" onClick={handleEditCancelClick}>Cancel</Button>
                  </td>
                </>
              ) : (
                <>
                  <td>{session.date}</td>
                  <td>{session.startTime}</td>
                  <td>{session.sessionType}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleEditClick(session, session.id)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDeleteClick(session.id)}>Delete</Button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SessionList;

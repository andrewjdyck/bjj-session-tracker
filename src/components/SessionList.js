import React, { useState } from 'react';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';

function SessionList({ sessions, onDeleteSession, onEditSession }) {
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
                      name="time"
                      value={updatedSession.time}
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
                  <td>{session.time}</td>
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


    // <div>
    //   <h2>Session List</h2>
    //   <ul>
    //     {sessions.map((session, index) => (
    //       <li key={index}>
    //         {editingSessionId === session.id ? (
    //           <>
    //             <input name="date" value={updatedSession.date} onChange={handleInputChange} />
    //             <input name="time" value={updatedSession.time} onChange={handleInputChange} />
    //             <input name="sessionType" value={updatedSession.sessionType} onChange={handleInputChange} />
    //             <button onClick={() => handleUpdateClick(session.id)}>Update</button>
    //             <button onClick={handleEditCancelClick}>Cancel</button>
    //           </>
    //         ) : (
    //           <>
    //             Date: {session.date}, Time: {session.time}, Type: {session.sessionType}
    //             <button onClick={() => handleEditClick(session, session.id)}>Edit</button>
    //             <button onClick={() => handleDeleteClick(session.id)}>Delete</button>
    //           </>
    //         )}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default SessionList;

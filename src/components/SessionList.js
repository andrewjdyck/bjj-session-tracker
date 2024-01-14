import React from 'react';

const SessionList = ({ sessions }) => {
  return (
    <div>
      <h2>Session List</h2>
      <ul>
        {sessions.map((session, index) => (
          <li key={index}>
            Date: {session.date}, Time: {session.time}, Type: {session.sessionType}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SessionList;

// TotalTime.js
import React from 'react';

function TotalTime({ sessions }) {
  const totalDuration = sessions.reduce((acc, session) => acc + parseInt(session.duration, 10), 0);

  return (
    <div>
      <h3>Total BJJ Time</h3>
      <p>{totalDuration} minutes</p>
      {/* You can also convert this into hours and minutes if needed */}
    </div>
  );
}

export default TotalTime;

import React, { useState } from 'react';

const SessionForm = ({ onAddSession }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [sessionType, setSessionType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming you'll add more validation here
    onAddSession({ date, time, sessionType });
    setDate('');
    setTime('');
    setSessionType('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Date:</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

      <label>Time:</label>
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />

      <label>Session Type:</label>
      <select value={sessionType} onChange={(e) => setSessionType(e.target.value)} required>
        <option value="">Select Session Type</option>
        <option value="gi">Gi Training</option>
        <option value="no-gi">No-Gi Training</option>
      </select>

      <button type="submit">Log Session</button>
    </form>
  );
};

export default SessionForm;

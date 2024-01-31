import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function SessionForm ({ onAddSession }) {
  const [sessionData, setSessionData] = useState({
    date: '',
    startTime: '',
    sessionType: '',
    duration: 0, // Duration in minutes
  });

  const handleChange = (e) => {
    setSessionData({ ...sessionData, [e.target.name]: e.target.value });
  };

  const today = new Date();
  const numberOfDaysToAdd = -1;
  const dt = today.setDate(today.getDate() + numberOfDaysToAdd); 
  const defaultDateValue = new Date(dt).toISOString().split('T')[0]; // yyyy-mm-dd
  console.log(defaultDateValue);
  const [date, setDate] = useState(defaultDateValue);
  const [time, setTime] = useState('19:00');
  const [sessionType, setSessionType] = useState('no-gi');
  const [duration, setDuration] = useState(90);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming you'll add more validation here
    // onAddSession({ date, time, sessionType });
    onAddSession({ sessionData });
    setDate(defaultDateValue); // Reset the date
    setTime('19:00'); // Reset the time
    setSessionType(''); // reset the session type
    setDuration(90); // reset the duration
  };


  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={sessionData.date}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Start Time</Form.Label>
        <Form.Control
          type="time"
          name="startTime"
          value={sessionData.startTime}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Session Type</Form.Label>
        <Form.Control
          as="select"
          name="sessionType"
          value={sessionData.sessionType}
          onChange={handleChange}
        >
          <option value="">Select...</option>
          <option value="gi">Gi</option>
          <option value="no-gi">No-Gi</option>
          {/* Add other session types as needed */}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Duration (minutes)</Form.Label>
        <Form.Control
          type="number"
          name="duration"
          value={sessionData.duration}
          onChange={handleChange}
          min="0"
        />
      </Form.Group>

      <Button type="submit">Add Session</Button>
    </Form>


    // <form onSubmit={handleSubmit}>
    //   <label>Date:</label>
    //   <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

    //   <label>Time:</label>
    //   <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />

    //   <label>Session Type:</label>
    //   <select value={sessionType} onChange={(e) => setSessionType(e.target.value)} required>
    //     <option value="gi">Gi Training</option>
    //     <option value="no-gi">No-Gi Training</option>
    //   </select>

    //   <button type="submit">Log Session</button>
    // </form>
  );
};

export default SessionForm;

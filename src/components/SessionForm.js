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
  const [date, setDate] = useState(defaultDateValue);
  const [time, setTime] = useState('19:00');
  const [sessionType, setSessionType] = useState('no-gi');
  const [duration, setDuration] = useState(90);

  const handleSubmit = (e) => {
    console.log('sessionData:', sessionData);
    e.preventDefault();
    // Assuming you'll add more validation here
    const { date, startTime, sessionType, duration } = sessionData;
    const numericDuration = Number(duration);
    // onAddSession({ sessionData });
    onAddSession({ date, startTime, sessionType, duration: numericDuration });
    setDate(defaultDateValue); // Reset the date
    setTime('19:00'); // Reset the time
    setSessionType(''); // reset the session type
    setDuration(90); // reset the duration
    console.log('new entry submitted.')
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
  );
};

export default SessionForm;

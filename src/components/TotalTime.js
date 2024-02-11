// TotalTime.js
import React from 'react';
import { Card, Col, Row, Container } from 'react-bootstrap';

function TotalTime({ sessions }) {

  // Helper to get the date N months ago
  const getMonthsAgoDate = (months) => {
    const date = new Date();
    date.setMonth(date.getMonth() - months);
    return date;
  };

  // Helper to get the ISO week number
  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  // Filter sessions from the last 3 months
  const startDate = getMonthsAgoDate(3);
  const filteredSessions = sessions.filter(session => {
    const sessionDate = new Date(session.date);
    return sessionDate >= startDate;
  });

  // Filter gi and no-gi sessions
  const giSessions = filteredSessions.filter(session => session.sessionType === 'gi');
  const totalGiDuration = giSessions.reduce((acc, session) => acc + parseInt(session.duration, 10), 0);

  // Aggregate durations by week
  let weeklyDurations = {};
  filteredSessions.forEach(session => {
    const weekNumber = getWeekNumber(new Date(session.date));
    weeklyDurations[weekNumber] = (weeklyDurations[weekNumber] || 0) + parseInt(session.duration, 10);
  });

  // Calculate the average
  const totalWeeks = Object.keys(weeklyDurations).length;
  const totalDuration = Object.values(weeklyDurations).reduce((acc, duration) => acc + duration, 0);
  // const totalDuration = sessions.reduce((acc, session) => acc + parseInt(session.duration, 10), 0);
  const averageWeeklyDuration = totalWeeks ? totalDuration / totalWeeks : 0;

  return (
    <Container>
      <Row md={9} className="justify-content-md-center">
          <Col xs={12} md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Total Training Time</Card.Title>
                <Card.Text>
                  {totalDuration} minutes
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={3}>
            <Card>
            <Card.Body>
              <Card.Title>Weekly Average Training</Card.Title>
              <Card.Text>
                {averageWeeklyDuration} minutes
              </Card.Text>
            </Card.Body>
            </Card>
          </Col>
          
          <Col xs={12} md={3}>
            <Card>
            <Card.Body>
              <Card.Title>No-gi / Gi Training</Card.Title>
              <Card.Text>
                {totalGiDuration} Gi minutes
                <br />
                {totalDuration - totalGiDuration} No-Gi minutes
              </Card.Text>
            </Card.Body>
            </Card>
          </Col>
      </Row>
    </Container>
  );
}

export default TotalTime;

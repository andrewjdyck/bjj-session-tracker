import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import SessionList from './SessionList';
import SessionForm from './SessionForm';
import TotalTime from './TotalTime';

function HomePage( { sessions, onAddSession, onDeleteSession, onEditSession } ) {

    return (
        <div>
            <Container>
                {/* First Row with Two Columns */}
                <Row>
                    {/* <Col md={6}>
                        <TotalTime sessions={sessions} />
                    </Col> */}
                    {/* <Col md={6}> */}
                    <Col>
                        <h3>Log a training session</h3>
                        <SessionForm onAddSession={onAddSession} />
                    </Col>
                </Row>

                {/* Second Row for Session Listing */}
                <Row>
                    <Col>
                        {/* <SessionList sessions={sessions} onDeleteSession={onDeleteSession} onEditSession={onEditSession} /> */}
                        <TotalTime sessions={sessions} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HomePage;

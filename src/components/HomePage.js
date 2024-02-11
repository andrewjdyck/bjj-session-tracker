import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import SessionForm from './SessionForm';
import TotalTime from './TotalTime';
import SessionListModal from './SessionListModal';

function HomePage( { sessions, onAddSession } ) {

    const [showSessionModal, setShowSessionModal] = useState(false);

    const handleShowSessionModal = () => setShowSessionModal(true);
    const handleCloseSessionModal = () => setShowSessionModal(false);

    return (
        <Container>
            <Row>
                <Col>
                    <SessionForm onAddSession={onAddSession} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <a onClick={handleShowSessionModal}>* View / Edit Sessions</a>
                    <SessionListModal show={showSessionModal} handleClose={handleCloseSessionModal} sessions={sessions} />
                </Col>
            </Row>
            <TotalTime sessions={sessions} />
        </Container>
    );
}

export default HomePage;

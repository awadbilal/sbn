import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

function Index({ title, icon, info }) {
  return (
    <Container className='visionMission mt-4'>
      <h1>{title} Statement</h1>
      <Row className='row-equal-height'>
        <Col md={2} lg={2} xxl={2} align='middle'>
          <img src={icon} alt={title} />
        </Col>
        <Col md={9} lg={9} xxl={9}>
          <p>{info}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Index;

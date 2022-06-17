import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { GrInstagram } from 'react-icons/gr';
import { BsWhatsapp } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';

function Index() {
  return (
    <Container className='socials mt-5 mb-5'>
      <h1>Our Social Network</h1>
      <p>
        You can reach us at the platform you are most comfortable with, reach us
        at
      </p>
      <Row className='row-equal-height' align='middle'>
        <Col md={4} lg={4} xxl={4}>
          <Row>
            <GrInstagram size={75} className='mb-4' />
          </Row>
          <Row>
            <h4>@Splash_bynoor</h4>
          </Row>
        </Col>
        <Col md={4} lg={4} xxl={4}>
          <Row>
            <BsWhatsapp size={75} className='mb-4' />
          </Row>
          <Row>
            <h4>+90 545 545 54 54</h4>
          </Row>
        </Col>
        <Col md={4} lg={4} xxl={4}>
          <Row>
            <HiOutlineMail size={75} className='mb-4' />
          </Row>
          <Row>
            <h4>help@splashbynoor.com</h4>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Index;

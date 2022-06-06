import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';
import { BsInstagram, BsWhatsapp } from 'react-icons/bs';
import { IoMailOutline } from 'react-icons/io5';

const Index = () => {
  return (
    <Container fluid id='footer'>
      <Col md={4} lg={4}>
        <span>Copyright ©2022 All rights reserved</span>
      </Col>
      <Col md={4} lg={4}>
        <Link to='/'>
          Splash By <span>Noor.</span>
        </Link>
      </Col>
      <Col md={4} lg={4}>
        <Row>
          <Col sm={4} md={4} lg={4}>
            <a href='https://www.instagram.com/splash_bynoor/' target='_blank'>
              <BsInstagram className='icon' />
            </a>
          </Col>
          <Col sm={4} md={4} lg={4}>
            <a href='https://www.instagram.com/splash_bynoor/' target='_blank'>
              <BsWhatsapp className='icon' />
            </a>
          </Col>
          <Col sm={4} md={4} lg={4}>
            <a href='https://www.instagram.com/splash_bynoor/' target='_blank'>
              <IoMailOutline className='icon' />
            </a>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};
export default Index;

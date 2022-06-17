import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Painter from '../../../../images/aboutUs.jpg';
import YellowBall from '../../../../images/yellowBall.png';

function Index() {
  return (
    <Container className='journey mt-5'>
      <Row className='row-equal-height'>
        <Col md={8} lg={8} xxl={8}>
          <h1>The Journey!</h1>
          <p>
            It all began with a teeny tiny kid curiosity, with a{' '}
            <span>brush and a paint</span> that turned the house into a mess,
            this kid kept trying to paint wonderful stuff until it has become a
            passion, a way to draw creativity, a way to demonstrate love,
            passion, and dedication.
          </p>

          <p>
            From that point forward all that mattered to this kid is to{' '}
            <span>splash</span> different colors to present a lovely picture,
            evolving into objects, sneakers, and wallpapers until it all became
            part of the imagination and what it can paint, which inspired the
            idea of Splash By <span>Noor</span>.
          </p>
        </Col>
        <Col md={4} lg={4} xxl={4} align='middle' className='mobile'>
          <div className='imagesDiv' align='middle'>
            <img src={YellowBall} className='yellowBall' alt='Yellow Ball' />
            <img src={Painter} className='mainImage' alt='Painter' />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Index;

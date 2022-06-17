import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Gallery from './Gallery';
import Information from './Information';

function Index() {
  const location = useLocation();
  const { state } = location;

  const { id, title, price, sizes, discount, image, gallery, description } =
    state;

  return (
    <Container id='singleProduct'>
      <Row className='row-equal-height topHalf'>
        <Col md={6} lg={6} xxl={6} className='topHalfCol'>
          <img src={image} className='mainDisplay' alt={title} />
        </Col>
        <Col md={6} lg={6} xxl={6} className='topHalfCol'>
          <Gallery images={gallery} />
          <br />
          <Information
            id={id}
            title={title}
            price={price}
            discount={discount}
            sizes={sizes}
          />
        </Col>
      </Row>
      <div className='bottomHalf'>
        <h1>Description</h1>
        {description.split('[\n]').map((item, i) => (
          <p key={`break${i}`}>{item}</p>
        ))}
      </div>
    </Container>
  );
}

export default Index;

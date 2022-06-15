import React from 'react';
import { Col, Row } from 'react-bootstrap';

function Index({ images }) {
  return (
    <Row>
      {images.map((image, i) => {
        return (
          <Col md={4} lg={4} xxl={4}>
            <img
              src={image}
              alt={`${image}${i}`}
              key={`${image}${i}`}
              className='galleryImage'
            />
          </Col>
        );
      })}
    </Row>
  );
}

export default Index;

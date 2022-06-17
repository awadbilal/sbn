import { Image } from 'antd';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import FallBackImage from '../../../../../images/fallBackImage.png';

function Index({ images }) {
  return (
    <Row>
      <Image.PreviewGroup>
        {images.map((image, i) => {
          return (
            <Col md={4} lg={4} xxl={4}>
              <Image
                src={image}
                alt={`${image}${i}`}
                key={`${image}${i}`}
                fallback={FallBackImage}
                style={{
                  width: '12rem',
                  height: '12rem',
                  maxWidth: '12rem',
                  maxHeight: '12rem',
                  marginBottom: '1rem',
                  objectFit: 'cover',
                }}
              />
            </Col>
          );
        })}
      </Image.PreviewGroup>
    </Row>
  );
}

export default Index;

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
            <Col xs={6} sm={3} md={4} lg={4} xxl={4}>
              <Image
                src={image}
                alt={`${image}${i}`}
                key={`${image}${i}`}
                fallback={FallBackImage}
                className='imageGrp'
              />
            </Col>
          );
        })}
      </Image.PreviewGroup>
    </Row>
  );
}

export default Index;

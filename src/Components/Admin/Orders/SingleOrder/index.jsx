import React from 'react';
import { Container } from 'react-bootstrap';
import { Card, Col, Row } from 'antd';

function Index({ item }) {
  return (
    <Container className='singleOrder site-card-wrapper'>
      <Row gutter={16}>
        {item.length !== 0 &&
          item.map(({ price, discount, image, title, id }) => {
            return (
              <Col span={8} key={id}>
                <Card
                  title={title}
                  bordered
                  hoverable
                  cover={
                    <img alt={title} src={image} style={{ maxWidth: '100%' }} />
                  }
                >
                  <p>Price: {price} &#8378;</p>
                  <p>Discount: {discount} %</p>
                  <p>Final Price: {(price * (100 - discount)) / 100} &#8378;</p>
                </Card>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
}

export default Index;

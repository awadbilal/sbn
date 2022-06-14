import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Index({ data }) {
  const navigate = useNavigate();

  return (
    <Container id='products'>
      <Row className='row-equal-height productsRow'>
        {Array.isArray(data) && data.length !== 0
          ? data.map((item) => {
              return (
                <Col
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xxl={3}
                  key={`product${item.id}`}
                >
                  <Card
                    className='cardContainer'
                    onClick={() => navigate(`/product${item.id}`)}
                  >
                    <Card.Body>
                      <Card.Title>
                        <p>
                          <span>{item.title}</span>
                          {item.discount !== 0 ? (
                            <span className='price'>
                              <span className='originalPrice'>
                                {item.price}{' '}
                              </span>
                              <span className='afterDiscount'>
                                {item.price -
                                  (item.price * parseInt(item.discount)) /
                                    100}{' '}
                                &#8378;
                              </span>
                            </span>
                          ) : (
                            <span className='price'>{item.price} &#8378;</span>
                          )}
                        </p>
                      </Card.Title>
                    </Card.Body>
                    <Card.Img src={item.image} className='productImage' />
                  </Card>
                </Col>
              );
            })
          : 'There are no products to display :('}
      </Row>
    </Container>
  );
}

export default Index;

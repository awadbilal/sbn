import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ImCross } from 'react-icons/im';

function Index({ data, basket }) {
  const [total, setTotal] = useState();

  useEffect(() => {
    if (data.length !== 0) {
      let finalPrice = 0;
      data.map(({ price, discount }) => {
        if (discount !== 0) finalPrice += price - (price * discount) / 100;
        else finalPrice += price;
      });
      setTotal(finalPrice);
    }
  }, [data]);

  const handleDelete = (id) => {
    console.log(id);
    // Delete it
    // remove it from basket, user, and cloud
  };

  return (
    <Container className='products'>
      <h1>Products List</h1>

      {data.length === 0 ? (
        <h2 align='middle'>No Data Has Been Found</h2>
      ) : (
        <>
          {data.map(({ id, title, image, price, discount }, index) => {
            return (
              <div
                className='itemContainer row-equal-height'
                align='middle'
                key={`${title}${id}`}
              >
                <Col md={2} lg={2} xl={2} align='start'>
                  <img src={image} alt={title} />
                </Col>
                <Col md={7} lg={7} xl={7} align='start'>
                  <Row>
                    <h3>{title}</h3>
                  </Row>
                  <Row>
                    <Col md={4} lg={4} xl={4}>
                      <p>SKU - {id}</p>
                    </Col>
                    <Col>
                      {basket[index].size && <p>Size - {basket[index].size}</p>}
                    </Col>
                  </Row>
                </Col>
                <Col md={2} lg={2} xl={2} className='priceContainer'>
                  {discount !== 0 ? (
                    <Row className='justify-content-center'>
                      <p className='previousPrice'>{price}</p>
                      <p>{price - (price * discount) / 100} &#8378;</p>
                    </Row>
                  ) : (
                    <Row>
                      <p>{price} &#8378;</p>
                    </Row>
                  )}
                </Col>
                <Col md={1} lg={1} xl={1} align='middle'>
                  <button onClick={() => handleDelete(id)}>
                    <ImCross size={30} />
                  </button>
                </Col>
              </div>
            );
          })}
          <h2>
            <span>Total: </span>
            <span>{total} &#8378;</span>
          </h2>
        </>
      )}
    </Container>
  );
}

export default Index;

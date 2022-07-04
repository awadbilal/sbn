import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ImCross } from 'react-icons/im';
import { writeBatch, doc } from 'firebase/firestore';
import { db } from '../../../../firebaseconfig';
import { message } from 'antd';

function Index({ data, updateData, basket, setBasket, total, setTotal }) {
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

  const handleDelete = async (productRef) => {
    const batch = await writeBatch(db);

    setBasket(basket.filter(({ id }) => id !== productRef));
    updateData(data.filter(({ docRef }) => docRef !== productRef));

    const userInfo = JSON.parse(localStorage.getItem('user'));
    userInfo.basket = basket.filter(({ id }) => id !== productRef);
    localStorage.setItem('user', JSON.stringify(userInfo));

    const sfRef = await doc(db, 'users', userInfo.docRef);
    batch.update(sfRef, userInfo);
    await batch
      .commit()
      .then(() => {
        message.success('Product has been removed from the basket');
      })
      .catch((err) => message.error('An error has occured'));
  };

  return (
    <Container className='products'>
      <h1>Products List</h1>
      {data.map(({ docRef, id, title, gallery, price, discount }, index) => {
        return (
          <div
            className='itemContainer row-equal-height'
            align='middle'
            key={`${title}${id}`}
          >
            <Col xs={3} sm={3} md={2} lg={2} xl={1} align='start'>
              <img src={gallery[0]} alt={title} />
            </Col>
            <Col xs={5} sm={5} md={7} lg={7} xl={8} align='start'>
              <Row>
                <h3>{title}</h3>
              </Row>
              <Row>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} className='mobile'>
                  <p>SKU - {docRef}</p>
                </Col>
                <Col>
                  {basket[index]?.size && <p>Size - {basket[index].size}</p>}
                </Col>
              </Row>
            </Col>
            <Col xs={3} sm={3} md={2} lg={2} xl={2} className='priceContainer'>
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
            <Col xs={1} sm={1} md={1} lg={1} xl={1} align='middle'>
              <button onClick={() => handleDelete(docRef)}>
                <ImCross size={30} className='deleteButton' />
              </button>
            </Col>
          </div>
        );
      })}
      <h2>
        <span>Total: </span>
        <span>{total} &#8378;</span>
      </h2>
    </Container>
  );
}

export default Index;

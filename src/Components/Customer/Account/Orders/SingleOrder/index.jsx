import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Card, Col, Row } from 'antd';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../../firebaseconfig';

function Index({ item }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const newArr = [];
    (async () => {
      for (let i = 0; i < item?.length; i++) {
        const docRef = doc(db, 'products', item[i].id);
        const docSnap = await getDoc(docRef);
        newArr.push({ ...docSnap.data(), docRef: docSnap.id });
        if (i === item?.length - 1) setProducts(newArr);
      }
    })();
  }, []);

  return (
    <Container className='singleOrder site-card-wrapper'>
      <Row gutter={16}>
        {products.length !== 0 &&
          products.map(({ price, discount, gallery, title, id }) => {
            return (
              <Col span={8} key={id}>
                <Card
                  title={title}
                  bordered
                  hoverable
                  cover={
                    <img
                      alt={title}
                      src={gallery[0]}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '420px',
                        objectFit: 'cover',
                      }}
                    />
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

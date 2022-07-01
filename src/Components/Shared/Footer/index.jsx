import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';
import { BsInstagram, BsWhatsapp } from 'react-icons/bs';
import { IoMailOutline } from 'react-icons/io5';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebaseconfig';

const Index = () => {
  const [links, setLinks] = useState();

  useEffect(() => {
    (async () => {
      const docRef = doc(db, 'layout', 'footer');
      const docSnap = await getDoc(docRef);
      await setLinks(docSnap.data());
    })();
  }, []);

  return (
    <Container fluid id='footer'>
      <Col md={4} lg={4}>
        <span>Copyright ©2022 All rights reserved</span>
      </Col>
      <Col md={4} lg={4}>
        <Link to='/'>
          Splash By <span>Noor.</span>
        </Link>
      </Col>
      <Col md={4} lg={4}>
        <Row>
          <Col sm={4} md={4} lg={4}>
            <a href={links?.instagram} target='_blank' rel='noreferrer'>
              <BsInstagram className='icon' />
            </a>
          </Col>
          <Col sm={4} md={4} lg={4}>
            <a
              href={`https://wa.me/+90${links?.whatsapp}`}
              target='_blank'
              rel='noreferrer'
            >
              <BsWhatsapp className='icon' />
            </a>
          </Col>
          <Col sm={4} md={4} lg={4}>
            <a
              href={`mailto:${links?.whatsapp}`}
              target='_blank'
              rel='noreferrer'
            >
              <IoMailOutline className='icon' />
            </a>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};
export default Index;

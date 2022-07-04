import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { GrInstagram } from 'react-icons/gr';
import { BsWhatsapp } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebaseconfig';

function Index() {
  const [links, setLinks] = useState();

  useEffect(() => {
    (async () => {
      const docRef = doc(db, 'layout', 'footer');
      const docSnap = await getDoc(docRef);
      await setLinks(docSnap.data());
    })();
  }, []);

  return (
    <Container className='socials mt-5 mb-5'>
      <h1>Our Social Network</h1>
      <p>
        You can reach us at the platform you are most comfortable with, reach us
        at
      </p>
      <Row className='row-equal-height' align='middle'>
        <Col xs={3} sm={3} md={4} lg={4} xxl={4}>
          <a href={links?.instagram} target='_blank' rel='noreferrer'>
            <Row>
              <GrInstagram size={75} className='mb-3 socialsIcon' />
            </Row>
          </a>
        </Col>
        <Col xs={3} sm={3} md={4} lg={4} xxl={4}>
          <a
            href={`https://wa.me/+90${links?.whatsapp}`}
            target='_blank'
            rel='noreferrer'
          >
            <Row>
              <BsWhatsapp size={75} className='mb-3 socialsIcon' />
            </Row>
          </a>
        </Col>
        <Col xs={3} sm={3} md={4} lg={4} xxl={4}>
          <a href={`mailto:${links?.email}`} target='_blank' rel='noreferrer'>
            <Row>
              <HiOutlineMail size={75} className='mb-3 socialsIcon' />
            </Row>
          </a>
        </Col>
      </Row>
    </Container>
  );
}

export default Index;

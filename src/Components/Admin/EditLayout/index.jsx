import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { db } from '../../../firebaseconfig';
import Categories from './Categories';
import Footer from './Footer';

function Index() {
  const [footerInfo, setFooterInfo] = useState();

  useEffect(() => {
    onSnapshot(doc(db, 'layout', 'footer'), (doc) => {
      setFooterInfo(doc.data());
    });
  }, []);

  return (
    <Container id='editLayout'>
      <Categories />
      <Footer footerInfo={footerInfo} />
    </Container>
  );
}

export default Index;

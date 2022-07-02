import React from 'react';
import { Container } from 'react-bootstrap';
import Banner from '../../Shared/Banner';
import { useLocation, useNavigate } from 'react-router-dom';

function Index() {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log('🚀 ~ file: index.jsx ~ line 9 ~ Index ~ state', state);

  return (
    <div id='thankYou'>
      <Banner title='Purchase Received' />
      <Container className='innerContainer mt-5 mb-5'>
        <h1>
          Splash By <span>Noor.</span>
        </h1>
        <p>Thank you, your purchase has been received.</p>
        <p>We will contact you shortly to confirm the purchase.</p>
        <p>
          Order id: <span>{state}</span>
        </p>
        <button onClick={() => navigate('/')}>Return to Home Page</button>
      </Container>
    </div>
  );
}

export default Index;

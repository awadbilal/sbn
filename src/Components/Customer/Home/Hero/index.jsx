import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Index() {
  const navigate = useNavigate();
  return (
    <Container fluid id='heroSection'>
      <h1>
        Splash by <span>Noor.</span>
      </h1>
      <p>Where the imagination becomes the reality</p>
      <button onClick={() => navigate('/shop')}>Start Shopping</button>
    </Container>
  );
}

export default Index;

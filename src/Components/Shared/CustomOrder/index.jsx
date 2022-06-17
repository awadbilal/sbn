import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Index() {
  const navigate = useNavigate();
  return (
    <Container fluid id='customOrder'>
      <h2 className='titleFirst'>Order your own</h2>
      <h2 className='titleSecond'>customization now</h2>
      <p>
        Have you ever had your own design in mind but could not find a place
        where you can implement it ? You are able to visualize the final outcome
        but need help ? Well it must be a holiday for you, because we will
        happily bring your visualization to life!
      </p>
      <button onClick={() => navigate('/customize')}>
        Check our customization service now
      </button>
    </Container>
  );
}

export default Index;

import React from 'react';
import { Container } from 'react-bootstrap';

function Index({ title }) {
  return (
    <Container fluid id='banner'>
      <h1>{title}</h1>
    </Container>
  );
}

export default Index;

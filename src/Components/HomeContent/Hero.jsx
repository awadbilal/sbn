import React from 'react';
import { Container } from 'react-bootstrap';

function Hero() {
  return (
    <Container fluid id="heroSection">
      <h1>
        Splash by <span>Noor.</span>
      </h1>
      <p>
        Where the imagination becomes the reality
      </p>
      <button>
        Start Shopping
      </button>
    </Container>
  );
}

export default Hero;

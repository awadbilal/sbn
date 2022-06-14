import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div id='home'>
      <Container fluid id='heroSection'>
        <h1>
          <span>Error 404, Page Not Found</span>
        </h1>
        <button onClick={() => navigate('/')}>Go Home</button>
      </Container>
    </div>
  );
}

export default Index;

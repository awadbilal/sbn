import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

function Index() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div id='home'>
      <Container fluid id='heroSection'>
        <h1>
          {location.pathname === '/cart' ||
          location.pathname === '/thank-you' ? (
            <span>Please Log-in or Sign-up first</span>
          ) : (
            <span>Error 404, Page Not Found</span>
          )}
        </h1>
        <button onClick={() => navigate('/')}>Go Home</button>
      </Container>
    </div>
  );
}

export default Index;

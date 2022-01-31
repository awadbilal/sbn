import React from 'react';
import { Container } from 'react-bootstrap';
import Dots from '../../images/dots.png';
import Ball from '../../images/yellowBall.png';
import Intro1 from '../../images/intro1.jpg';
import Intro2 from '../../images/intro2.jpg';

function Introduction() {
  return (
    <Container id="introduction" className="pt-5 pb-5 mt-3">
      <h1 className="mobile">Designed & Painted <span>to match your perfect<br />theme!</span></h1>
      <div className="desktop">
        <h1>Designed & Painted <span>to<br />match your perfect theme!</span></h1>
        <img src={Ball} alt="yellow sphere" className="ballImg" />
        <img src={Dots} alt="dots background" className="dotsImg" />
        <img src={Intro1} alt="shoe product" className="intro1Img" />
        <img src={Intro2} alt="shoe product" className="intro2Img" />
      </div>
    </Container>
  );
}

export default Introduction;

import React from 'react';
import { Container } from 'react-bootstrap';
import HatsCat from '../../../images/hatsCat.jpg';
import BagsCat from '../../../images/bagsCat.jpg';
import ShoesCat from '../../../images/shoesCat.jpg';
import ShoesCatSquare from '../../../images/shoesCatSquare.jpg';
import AccCat from '../../../images/accCat.jpg';
import AccCatSquare from '../../../images/accCatSquare.jpg';

function Index() {
  return (
    <Container id='categories' className='pt-5 pb-5'>
      <div className='hats'>
        <img src={HatsCat} className='categoryImage' alt='Shop Hats' />
        <div className='hoverOverlay'>
          <div className='image__title'>Hats</div>
        </div>
      </div>
      <div className='bags'>
        <img src={BagsCat} className='categoryImage' alt='Shop Bags' />
        <div className='hoverOverlay'>
          <div className='image__title'>Bags</div>
        </div>
      </div>
      <div className='shoes'>
        <img
          src={ShoesCat}
          className='categoryImage responsiveHide'
          alt='Shop Shoes'
        />
        <img
          src={ShoesCatSquare}
          className='categoryImage responsiveShow'
          alt='Shop Shoes'
        />
        <div className='hoverOverlay'>
          <div className='image__title'>Shoes</div>
        </div>
      </div>
      <div className='accessories'>
        <img
          src={AccCat}
          className='categoryImage responsiveHide'
          alt='Shop Accessories'
        />
        <img
          src={AccCatSquare}
          className='categoryImage responsiveShow'
          alt='Shop Accessories'
        />
        <div className='hoverOverlay'>
          <div className='image__title'>Accessories</div>
        </div>
      </div>
    </Container>
  );
}

export default Index;

import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebaseconfig';

function Index() {
  const navigate = useNavigate();
  const [images, setImages] = useState();

  useEffect(() => {
    (async () => {
      const docRef = doc(db, 'layout', 'categories');
      const docSnap = await getDoc(docRef);
      await setImages(docSnap.data());
    })();
  }, []);

  return (
    <Container id='categories' className='pt-5 pb-5'>
      <div
        className='hats'
        onClick={() => navigate('/shop', { state: 'Hats' })}
      >
        <img src={images?.hats} className='categoryImage' alt='Shop Hats' />
        <div className='hoverOverlay'>
          <div className='image__title'>Hats</div>
        </div>
        <p className='responsiveShow'>Hats</p>
      </div>
      <div
        className='bags'
        onClick={() => navigate('/shop', { state: 'Bags' })}
      >
        <img src={images?.bags} className='categoryImage' alt='Shop Bags' />
        <div className='hoverOverlay'>
          <div className='image__title'>Bags</div>
        </div>
        <p className='responsiveShow'>Bags</p>
      </div>
      <div
        className='shoes'
        onClick={() => navigate('/shop', { state: 'Sneakers' })}
      >
        <img
          src={images?.sneakers}
          className='categoryImage responsiveHide'
          alt='Shop Shoes'
        />
        <img
          src={images?.sneakersSquare}
          className='categoryImage responsiveShow'
          alt='Shop Shoes'
        />
        <div className='hoverOverlay'>
          <div className='image__title'>Shoes</div>
        </div>
        <p className='responsiveShow'>Sneakers</p>
      </div>
      <div
        className='accessories'
        onClick={() => navigate('/shop', { state: 'Accessories' })}
      >
        <img
          src={images?.accessories}
          className='categoryImage responsiveHide'
          alt='Shop Accessories'
        />
        <img
          src={images?.accessoriesSquare}
          className='categoryImage responsiveShow'
          alt='Shop Accessories'
        />
        <div className='hoverOverlay'>
          <div className='image__title'>Accessories</div>
        </div>
        <p className='responsiveShow'>Accessories</p>
      </div>
    </Container>
  );
}

export default Index;

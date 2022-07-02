import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { BsArrowDown } from 'react-icons/bs';
import { MdErrorOutline } from 'react-icons/md';
import { writeBatch, doc } from 'firebase/firestore';
import { db } from '../../../../../firebaseconfig';
import { message } from 'antd';

function Index({ docRef, id, title, price, discount, sizes }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [showError, setShowError] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (showError) {
      const timeId = setTimeout(() => {
        setShowError(false);
      }, 3000);

      return () => {
        clearTimeout(timeId);
      };
    }
  }, [showError]);

  const handleAdd = async () => {
    const batch = await writeBatch(db);
    const updatedInfo = JSON.parse(localStorage.getItem('user'));

    if (Array.isArray(sizes) && sizes.length !== 0) {
      if (!selectedSize) return setShowError(true);
      else {
        updatedInfo.basket.push({
          id: docRef,
          size: selectedSize,
        });
      }
    } else {
      updatedInfo.basket.push({ id: docRef });
    }

    const sfRef = await doc(db, 'users', updatedInfo.docRef);
    batch.update(sfRef, updatedInfo);
    await batch
      .commit()
      .then(() => {
        message.success('Item has been added to basket successfully');
        localStorage.setItem('user', JSON.stringify(updatedInfo));
      })
      .catch((err) => message.error('An error has occured'));
  };

  return (
    <div className='productInformation'>
      <p>SKU - {id}</p>
      <h1>{title}</h1>
      <h1>
        {discount !== 0 ? (
          <>
            <span className='originalPrice'>{price} </span>
            <span>{price - (price * parseInt(discount)) / 100} &#8378;</span>
          </>
        ) : (
          <span>{price} &#8378;</span>
        )}
      </h1>
      {discount !== 0 && (
        <h5>
          <span className='discountRate'>{discount}%</span> Discount Applied
        </h5>
      )}
      {Array.isArray(sizes) && sizes.length !== 0 && (
        <Dropdown
          className='sizeDropDown mt-4'
          onSelect={(e) => setSelectedSize(e)}
        >
          <Dropdown.Toggle id='dropdown-autoclose-true'>
            <span className='dropDownText ps-2 pe-2'>
              {selectedSize ? (
                selectedSize
              ) : (
                <>
                  <span>Size</span>
                  <BsArrowDown size={22} color='#ee3364' />
                </>
              )}
            </span>
          </Dropdown.Toggle>

          <Dropdown.Menu flip={false} className='dropDownMenu'>
            {sizes.map((item, i) => (
              <Dropdown.Item key={`size${item}`} eventKey={item}>
                {item}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      )}
      <button
        className='addToCart mb-2'
        onClick={handleAdd}
        disabled={!user && true}
      >
        Add to Cart
      </button>
      {showError && (
        <p>
          <MdErrorOutline size={25} color='#ee3364' className='me-3' />
          <span>Please select a size first</span>
        </p>
      )}
      {!user && (
        <p>
          <MdErrorOutline size={25} color='#ee3364' className='me-3' />
          <span>Please Log-in or Sign-up to add to cart</span>
        </p>
      )}
    </div>
  );
}

export default Index;

import React, { useEffect, useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import Banner from '../Shared/Banner';
import Products from './Products';
import DeliveryAddress from './DeliveryAddress';
import { BsArrowRight } from 'react-icons/bs';
import { USERS } from '../../Data/users';
import { DATA } from '../../Data/products';

function Index() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [basket, setBasket] = useState(USERS[0].basket);
  const [productsToRender, setProductsToRender] = useState([]);
  const [formData, setFormData] = useState({
    name: USERS[0].name,
    surname: USERS[0].surname,
    email: USERS[0].email,
    phone: USERS[0].phone,
    city: USERS[0].activeAddress ? USERS[0].activeAddress.city : '',
    province: USERS[0].activeAddress ? USERS[0].activeAddress.province : '',
    street: USERS[0].activeAddress ? USERS[0].activeAddress.street : '',
    building: USERS[0].activeAddress ? USERS[0].activeAddress.building : '',
    apartment: USERS[0].activeAddress ? USERS[0].activeAddress.apartment : '',
    full: USERS[0].activeAddress ? USERS[0].activeAddress.full : '',
  });
  console.log(USERS[0]);

  useEffect(() => {
    if (basket.length !== 0) {
      const newArr = [];
      basket.map((item) => newArr.push(item.id));
      setProductsToRender(DATA.filter(({ id }) => newArr.includes(id)));
    } else setProductsToRender([]);
  }, [basket]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    // Submit it later baby boy!
    setIsSuccess(true);
    setIsFailure(true);
  };

  useEffect(() => {
    if (isSuccess || isFailure) {
      const timeId = setTimeout(() => {
        setIsSuccess(false);
        setIsFailure(false);
      }, 5000);

      return () => {
        clearTimeout(timeId);
      };
    }
  }, [isSuccess, isFailure]);

  return (
    <div id='cart'>
      <Banner title='Shopping Basket' />
      <Products data={productsToRender} basket={basket} />
      <DeliveryAddress
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
      />
      <Container>
        <span>
          <button onClick={handleClick} className='submitButton'>
            <BsArrowRight size={30} />
          </button>{' '}
          Submit
        </span>
        {isSuccess && (
          <Alert variant='success'>Your message has been received</Alert>
        )}
        {isFailure && (
          <Alert variant='warning'>
            There was a problem sending your message
          </Alert>
        )}
      </Container>
    </div>
  );
}

export default Index;

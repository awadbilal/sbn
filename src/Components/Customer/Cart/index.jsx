import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { message } from 'antd';
import Banner from '../../Shared/Banner';
import Products from './Products';
import DeliveryAddress from './DeliveryAddress';
import { BsArrowRight } from 'react-icons/bs';
import { USERS } from '../../../Data/users';
import { DATA } from '../../../Data/products';

function Index() {
  const [basket, setBasket] = useState(USERS[0].basket);
  const [productsToRender, setProductsToRender] = useState([]);
  const [formData, setFormData] = useState({
    name: USERS[0].name,
    surname: USERS[0].surname,
    email: USERS[0].email,
    phone: parseInt(USERS[0].phone.split(' ').join('')),
    city: USERS[0].activeAddress ? USERS[0].activeAddress.city : '',
    province: USERS[0].activeAddress ? USERS[0].activeAddress.province : '',
    street: USERS[0].activeAddress ? USERS[0].activeAddress.street : '',
    building: USERS[0].activeAddress ? USERS[0].activeAddress.building : '',
    apartment: USERS[0].activeAddress ? USERS[0].activeAddress.apartment : '',
    full: USERS[0].activeAddress ? USERS[0].activeAddress.full : '',
  });

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
    if (Object.values(formData).includes('')) {
      return message.warn('Please fill all fields then try again');
    }
    // Submit it later baby boy!
    message.success('Your order has been received.');
    message.error(
      'There was an error processing your order, please try again.'
    );
  };

  return (
    <div id='cart'>
      <Banner title='Shopping Basket' />
      <Products data={productsToRender} basket={basket} setBasket={setBasket} />
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
      </Container>
    </div>
  );
}

export default Index;

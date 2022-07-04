import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import Banner from '../../Shared/Banner';
import Products from './Products';
import DeliveryAddress from './DeliveryAddress';
import { BsArrowRight } from 'react-icons/bs';
import {
  doc,
  getDoc,
  writeBatch,
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../../firebaseconfig';

function Index() {
  const navigate = useNavigate();
  const [basket, setBasket] = useState();
  const [productsToRender, setProductsToRender] = useState([]);
  const [formData, setFormData] = useState({});
  const [total, setTotal] = useState();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));

    setBasket(userInfo.basket);
    setFormData({
      name: userInfo.name,
      surname: userInfo.surname,
      email: userInfo.email,
      phone: parseInt(userInfo.phone),
      city: userInfo.activeAddress ? userInfo.activeAddress.city : '',
      province: userInfo.activeAddress ? userInfo.activeAddress.province : '',
      street: userInfo.activeAddress ? userInfo.activeAddress.street : '',
      building: userInfo.activeAddress ? userInfo.activeAddress.building : '',
      apartment: userInfo.activeAddress ? userInfo.activeAddress.apartment : '',
      full: userInfo.activeAddress ? userInfo.activeAddress.full : '',
    });

    const products = [];
    (async () => {
      for (let i = 0; i < userInfo.basket?.length; i++) {
        const docRef = doc(db, 'products', userInfo.basket[i].id);
        const docSnap = await getDoc(docRef);
        products.push({ ...docSnap.data(), docRef: docSnap.id });
        if (i === userInfo.basket?.length - 1) setProductsToRender(products);
      }
    })();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    if (Object.values(formData).includes('')) {
      return message.warn('Please fill all fields then try again');
    }
    const q = query(collection(db, 'orders'), orderBy('id', 'desc'));
    const querySnapshot = await getDocs(q);
    const docRef = await addDoc(collection(db, 'orders'), {
      id:
        Array.isArray(querySnapshot?.docs) && querySnapshot?.docs.length !== 0
          ? querySnapshot.docs[0].data().id + 1
          : 0,
      customer: `${formData.name} ${formData.surname}`,
      date: `${new Date()}`,
      deliveryAddress: formData.full,
      email: formData.email,
      phone: formData.phone,
      totalPrice: total,
      products: basket,
    })
      .then((doc) => {
        handleUpdateProfile(doc.id, basket);
      })
      .catch((err) => {
        return message.error(
          'There was an error processing your order, please try again.'
        );
      });
  };

  const handleUpdateProfile = async (docRef, products) => {
    const batch = await writeBatch(db);
    const userInfo = JSON.parse(localStorage.getItem('user'));

    userInfo.basket = [];
    userInfo.orders.push(docRef);
    userInfo.activeAddress = {
      apartment: formData.apartment,
      building: formData.building,
      full: formData.full,
      street: formData.street,
      province: formData.province,
      city: formData.city,
    };

    const sfRef = await doc(db, 'users', userInfo.docRef);
    await batch.update(sfRef, userInfo);
    await batch.commit().then(() => {
      localStorage.setItem('user', JSON.stringify(userInfo));
      setProductsToRender([]);
      setBasket([]);
      message.success('Your order has been received, please wait...');
      updateProducts(docRef, products);
    });
  };

  const updateProducts = async (orderId, products) => {
    const batch = await writeBatch(db);
    for (let i = 0; i < products.length; i++) {
      const docRef = doc(db, 'products', products[i].id);
      const docSnap = await getDoc(docRef);

      const sfRef = await doc(db, 'products', products[i].id);
      await batch.update(sfRef, {
        ...docSnap.data(),
        orderCount: docSnap.data().orderCount + 1,
      });
      await batch.commit().then(() => {
        navigate('/thank-you', { state: orderId });
      });
    }
  };

  return (
    <div id='cart'>
      {Array.isArray(productsToRender) && productsToRender.length !== 0 ? (
        <>
          <Banner title='Shopping Basket' />
          <Products
            data={productsToRender}
            updateData={setProductsToRender}
            basket={basket}
            setBasket={setBasket}
            total={total}
            setTotal={setTotal}
          />
          <DeliveryAddress
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
          />
          <Container className='buttonContainer'>
            <span>
              <button onClick={handleClick} className='submitButton'>
                <BsArrowRight size={30} />
              </button>{' '}
              Submit
            </span>
          </Container>
        </>
      ) : (
        <Container fluid id='noProducts'>
          <h1>
            Splash by <span>Noor.</span>
          </h1>
          <p>😢 No products has been added to basket yet 😢</p>
          <button onClick={() => navigate('/shop')}>Start Shopping Now</button>
        </Container>
      )}
    </div>
  );
}

export default Index;

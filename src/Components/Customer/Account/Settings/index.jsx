import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { BsArrowRight } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { message } from 'antd';
import { doc, writeBatch } from 'firebase/firestore';
import { db } from '../../../../firebaseconfig';

function Index() {
  const [formDisabled, setFormDisabled] = useState(true);
  const [formData, setFormData] = useState(
    JSON.parse(localStorage.getItem('user'))
  );
  const [activeAddress, setActiveAddress] = useState(
    JSON.parse(localStorage.getItem('user'))?.activeAddress
  );

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleActiveAddress = (e) => {
    setActiveAddress({
      ...activeAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    if (Object.values(formData).includes('')) {
      return message.warn('Please fill all fields then try again');
    }

    const batch = await writeBatch(db);
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const valuesToSend = { ...formData, activeAddress: activeAddress };

    const sfRef = await doc(db, 'users', userInfo.docRef);
    batch.update(sfRef, valuesToSend);
    await batch
      .commit()
      .then(() => {
        localStorage.setItem(
          'user',
          JSON.stringify({ ...userInfo, ...valuesToSend })
        );
        message.success('User information has been updated');
        setFormDisabled(true);
      })
      .catch((err) => {
        message.error('An error has occured, please try again!');
      });
  };

  return (
    <Container id='settings' className='mt-2 ps-3 pe-3'>
      <h1 className='mt-3 mb-4'>Edit Profile Information</h1>
      <Row className='row-equal-height m-0 p-0'>
        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
          <Row className='row-equal-height m-0 p-0'>
            <Col xs={12} sm={5} md={4} lg={3} xl={3} className='pt-2'>
              <p>Name</p>
            </Col>
            <Col xs={12} sm={7} md={8} lg={9} xl={9}>
              <input
                disabled={formDisabled}
                type='text'
                placeholder='e.g. John'
                value={formData?.name}
                onChange={(e) => handleFormChange(e)}
                name='name'
              />
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
          <Row className='row-equal-height m-0 p-0'>
            <Col xs={12} sm={5} md={4} lg={3} xl={3} className='pt-2'>
              <p>Surname</p>
            </Col>
            <Col xs={12} sm={7} md={8} lg={9} xl={9}>
              <input
                disabled={formDisabled}
                type='text'
                placeholder='e.g. Doe'
                value={formData?.surname}
                onChange={(e) => handleFormChange(e)}
                name='surname'
              />
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
          <Row className='row-equal-height m-0 p-0'>
            <Col xs={12} sm={5} md={4} lg={3} xl={3} className='pt-2'>
              <p>Email</p>
            </Col>
            <Col xs={12} sm={7} md={8} lg={9} xl={9}>
              <input
                disabled={true}
                type='email'
                placeholder='e.g. John.Doe@gmail.com'
                value={formData?.email}
                onChange={(e) => handleFormChange(e)}
                name='email'
              />
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
          <Row className='row-equal-height m-0 p-0'>
            <Col xs={12} sm={5} md={4} lg={3} xl={3} className='pt-2'>
              <p>Phone</p>
            </Col>
            <Col xs={12} sm={7} md={8} lg={9} xl={9}>
              <input
                disabled={formDisabled}
                type='number'
                placeholder='e.g. Doe'
                value={formData?.phone}
                onChange={(e) => handleFormChange(e)}
                name='phone'
              />
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
          <Row className='row-equal-height m-0 p-0'>
            <Col xs={12} sm={5} md={4} lg={3} xl={3} className='pt-2'>
              <p>City</p>
            </Col>
            <Col xs={12} sm={7} md={8} lg={9} xl={9}>
              <input
                disabled={formDisabled}
                type='text'
                placeholder='e.g. John'
                value={activeAddress?.city}
                onChange={(e) => handleActiveAddress(e)}
                name='city'
              />
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
          <Row className='row-equal-height m-0 p-0'>
            <Col xs={12} sm={5} md={4} lg={3} xl={3} className='pt-2'>
              <p>Province</p>
            </Col>
            <Col xs={12} sm={7} md={8} lg={9} xl={9}>
              <input
                disabled={formDisabled}
                type='text'
                placeholder='e.g. Doe'
                value={activeAddress?.province}
                onChange={(e) => handleActiveAddress(e)}
                name='province'
              />
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
          <Row className='row-equal-height m-0 p-0'>
            <Col xs={12} sm={5} md={4} lg={3} xl={3} className='pt-2'>
              <p>Street</p>
            </Col>
            <Col xs={12} sm={7} md={8} lg={9} xl={9}>
              <input
                disabled={formDisabled}
                type='text'
                placeholder='e.g. Osmanpaşa Mektebi Sokak'
                value={activeAddress?.street}
                onChange={(e) => handleActiveAddress(e)}
                name='street'
              />
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
          <Row className='row-equal-height m-0 p-0'>
            <Col xs={12} sm={5} md={4} lg={3} xl={3} className='pt-2'>
              <p>Building</p>
            </Col>
            <Col xs={12} sm={7} md={8} lg={9} xl={9}>
              <input
                disabled={formDisabled}
                type='text'
                placeholder='e.g. 16'
                value={activeAddress?.building}
                onChange={(e) => handleActiveAddress(e)}
                name='building'
              />
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={6} md={12} lg={12} xl={12}>
          <Row className='row-equal-height m-0 p-0'>
            <Col xs={12} sm={5} md={4} lg={3} xl={3} className='pt-2'>
              <p>Apartment</p>
            </Col>
            <Col xs={12} sm={7} md={8} lg={9} xl={9}>
              <input
                disabled={formDisabled}
                type='text'
                placeholder='e.g. 16'
                value={activeAddress?.apartment}
                onChange={(e) => handleActiveAddress(e)}
                name='apartment'
              />
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={6} md={12} lg={12} xl={12}>
          <Row className='row-equal-height m-0 p-0'>
            <Col xs={12} sm={5} md={4} lg={3} xl={3} className='pt-2'>
              <p>Full Address</p>
            </Col>
            <Col xs={12} sm={7} md={8} lg={9} xl={9}>
              <textarea
                disabled={formDisabled}
                placeholder='İSTANBUL / TÜRKİYE, 34353 Beşiktaş, Çırağan Caddesi, Osmanpaşa Mektebi Sokak, Bina 16, Daire 16'
                value={activeAddress?.full}
                onChange={(e) => handleActiveAddress(e)}
                name='full'
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className='row-equal-height m-0 p-0'>
        <Col xs={12} sm={6} md={6} lg={6} xl={6} className='firstButton'>
          <span>
            <button onClick={() => setFormDisabled(!formDisabled)}>
              <AiOutlineEdit size={30} className='buttonIcon' />
            </button>{' '}
            Edit
          </span>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6} xl={6} className='secondButton'>
          <span>
            <button onClick={handleClick} disabled={formDisabled}>
              <BsArrowRight size={30} className='buttonIcon' />
            </button>{' '}
            Submit
          </span>
        </Col>
      </Row>
    </Container>
  );
}

export default Index;

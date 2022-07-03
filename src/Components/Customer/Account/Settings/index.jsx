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
      <h1 className='mb-5'>Edit Profile Information</h1>
      <Row className='row-equal-height m-0 p-0'>
        <Col md={6} lg={6} xl={6}>
          <Row className='row-equal-height m-0 p-0'>
            <Col md={3} lg={3} xl={3}>
              <p>Name</p>
            </Col>
            <Col md={9} lg={9} xl={9}>
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
        <Col md={6} lg={6} xl={6}>
          <Row className='row-equal-height m-0 p-0'>
            <Col md={3} lg={3} xl={3}>
              <p>Surname</p>
            </Col>
            <Col md={9} lg={9} xl={9}>
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
        <Col md={6} lg={6} xl={6}>
          <Row className='row-equal-height m-0 p-0'>
            <Col md={3} lg={3} xl={3}>
              <p>Email</p>
            </Col>
            <Col md={9} lg={9} xl={9}>
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
        <Col md={6} lg={6} xl={6}>
          <Row className='row-equal-height m-0 p-0'>
            <Col md={3} lg={3} xl={3}>
              <p>Phone</p>
            </Col>
            <Col md={9} lg={9} xl={9}>
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
        <Col md={6} lg={6} xl={6}>
          <Row className='row-equal-height m-0 p-0'>
            <Col md={3} lg={3} xl={3}>
              <p>City</p>
            </Col>
            <Col md={9} lg={9} xl={9}>
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
        <Col md={6} lg={6} xl={6}>
          <Row className='row-equal-height m-0 p-0'>
            <Col md={3} lg={3} xl={3}>
              <p>Province</p>
            </Col>
            <Col md={9} lg={9} xl={9}>
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
        <Col md={6} lg={6} xl={6}>
          <Row className='row-equal-height m-0 p-0'>
            <Col md={3} lg={3} xl={3}>
              <p>Street</p>
            </Col>
            <Col md={9} lg={9} xl={9}>
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
        <Col md={6} lg={6} xl={6}>
          <Row className='row-equal-height m-0 p-0'>
            <Col md={3} lg={3} xl={3}>
              <p>Building</p>
            </Col>
            <Col md={9} lg={9} xl={9}>
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
        <Col md={6} lg={6} xl={6}>
          <Row className='row-equal-height m-0 p-0'>
            <Col md={3} lg={3} xl={3}>
              <p>Apartment</p>
            </Col>
            <Col md={9} lg={9} xl={9}>
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
        <Col md={12} lg={12} xl={12}>
          <Row className='row-equal-height m-0 p-0'>
            <Col md={3} lg={3} xl={3}>
              <p>Full Address</p>
            </Col>
            <Col md={9} lg={9} xl={9}>
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
        <Col md={6} lg={6} xl={6}>
          <span>
            <button onClick={() => setFormDisabled(!formDisabled)}>
              <AiOutlineEdit size={30} />
            </button>{' '}
            Edit
          </span>
        </Col>
        <Col md={6} lg={6} xl={6} className='text-end'>
          <span>
            <button onClick={handleClick} disabled={formDisabled}>
              <BsArrowRight size={30} />
            </button>{' '}
            Submit
          </span>
        </Col>
      </Row>
    </Container>
  );
}

export default Index;

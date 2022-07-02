import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

function Index({ formData, handleChange }) {
  const formInputs = [
    {
      title: 'Email',
      value: formData.email,
      placeHolder: 'e.g. John.Doe@gmail.com',
      name: 'email',
      type: 'email',
    },
    {
      title: 'Phone Number',
      value: formData.phone,
      placeHolder: 'e.g. 545 545 54 54',
      name: 'phone',
      type: 'number',
    },
    {
      title: 'City',
      value: formData.city,
      placeHolder: 'e.g. İstanbul',
      name: 'city',
      type: 'text',
    },
    {
      title: 'Province',
      value: formData.province,
      placeHolder: 'e.g. Beşiktaş',
      name: 'province',
      type: 'text',
    },
    {
      title: 'Street',
      value: formData.street,
      placeHolder: 'e.g. 760 Sokak',
      name: 'street',
      type: 'text',
    },
    {
      title: 'Building No.',
      value: formData.building,
      placeHolder: 'e.g. 25. D Block',
      name: 'building',
      type: 'text',
    },
    {
      title: 'apartment',
      value: formData.apartment,
      placeHolder: 'e.g. 16',
      name: 'apartment',
      type: 'text',
    },
    {
      title: 'Full Address',
      value: formData.full,
      placeHolder:
        'İSTANBUL / TÜRKİYE, 34353 Beşiktaş, Çırağan Caddesi, Osmanpaşa Mektebi Sokak, Bina 16, Daire 16',
      name: 'full',
      type: 'textarea',
    },
  ];

  return (
    <Container className='emailForm mt-5 mb-4'>
      <h1>Delivery Address Information</h1>
      <Row>
        <Col md={5} lg={5} xl={5} className='pe-3 ps-0'>
          <Row className='row-equal-height'>
            <Col md={3} lg={3} xl={3}>
              <p className='mt-2'>Name</p>
            </Col>
            <Col md={8} lg={8} xl={8}>
              <input
                type='text'
                placeholder='e.g. John'
                value={formData.name}
                onChange={(e) => handleChange(e)}
                name='name'
              />
            </Col>
          </Row>
        </Col>
        <Col md={5} lg={5} xl={5} className='pe-3'>
          <Row className='row-equal-height'>
            <Col md={3} lg={3} xl={3}>
              <p className='mt-2'>Surname</p>
            </Col>
            <Col md={8} lg={8} xl={8}>
              <input
                type='text'
                placeholder='e.g. Doe'
                value={formData.surname}
                onChange={(e) => handleChange(e)}
                name='surname'
              />
            </Col>
          </Row>
        </Col>
      </Row>
      {formInputs.map(({ title, value, placeHolder, name, type }, i) => {
        return (
          <Row className='row-equal-height' key={`${title}${i}`}>
            <Col md={3} lg={3} xl={3}>
              <p className='mt-2'>{title}</p>
            </Col>
            <Col md={8} lg={8} xl={8}>
              {type === 'textarea' ? (
                <textarea
                  placeholder={placeHolder}
                  value={value}
                  onChange={(e) => handleChange(e)}
                  name={name}
                />
              ) : (
                <input
                  type={type}
                  placeholder={placeHolder}
                  value={value}
                  onChange={(e) => handleChange(e)}
                  name={name}
                />
              )}
            </Col>
          </Row>
        );
      })}
    </Container>
  );
}

export default Index;

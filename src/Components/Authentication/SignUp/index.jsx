import { message } from 'antd';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Index({ signUpData, setSignUpData }) {
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    const { name, surname, phone, email, password, passwordRepeat } =
      signUpData;
    if (
      name === '' ||
      surname === '' ||
      phone === '' ||
      email === '' ||
      password === '' ||
      passwordRepeat === ''
    )
      return message.warn('Please fill all the fields first');
    if (password !== passwordRepeat)
      return message.warn('password does not match repeated password.');
    // Type here what you want
    // Send the message to backend
    // on Success:
    // localStorage.setItem('user', JSON.stringify(signUpData));
    // navigate("/");
    message.success(`Welcome on board ${name} ${surname}`);
    message.warn('User is already registered');
  };

  return (
    <div className='login'>
      <div>
        <Row className='m-0 p-0 row-equal-height'>
          <Col className='m-0 p-0 pe-2 pb-4' md={6} lg={6} xxl={6}>
            <p className='mb-3'>Name</p>
            <input
              type='text'
              placeholder='e.g. John'
              value={signUpData.name}
              onChange={(e) => handleChange(e)}
              name='name'
            />
          </Col>
          <Col className='m-0 p-0 ps-2 pb-4' md={6} lg={6} xxl={6}>
            <p className='mb-3'>Surname</p>
            <input
              type='text'
              placeholder='e.g. Doe'
              value={signUpData.surname}
              onChange={(e) => handleChange(e)}
              name='surname'
            />
          </Col>
        </Row>
        <p className='mb-3'>Phone Number</p>
        <input
          type='number'
          placeholder='e.g. 545 545 54 54'
          value={signUpData.phone}
          onChange={(e) => handleChange(e)}
          name='phone'
        />
        <p className='mb-3 mt-4'>Email</p>
        <input
          type='email'
          placeholder='e.g. John.Doe@gmail.com'
          value={signUpData.email}
          onChange={(e) => handleChange(e)}
          name='email'
        />
        <Row className='m-0 p-0 row-equal-height'>
          <Col className='m-0 p-0 pe-2 pb-4' md={6} lg={6} xxl={6}>
            <p className='mt-4 mb-3'>Password</p>
            <input
              type='password'
              placeholder='* * * * * * * * *'
              value={signUpData.password}
              onChange={(e) => handleChange(e)}
              name='password'
            />
          </Col>
          <Col className='m-0 p-0 ps-2 pb-4' md={6} lg={6} xxl={6}>
            <p className='mt-4 mb-3'>Password Repeat</p>
            <input
              type='password'
              placeholder='* * * * * * * * *'
              value={signUpData.passwordRepeat}
              onChange={(e) => handleChange(e)}
              name='passwordRepeat'
            />
          </Col>
        </Row>
      </div>
      <button onClick={handleClick}>Log in</button>
    </div>
  );
}

export default Index;

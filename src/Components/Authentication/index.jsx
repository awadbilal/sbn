import React, { useState } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import Login from './Login';
import Signup from './SignUp';

function Index({ setUser }) {
  const [logInData, setLogInData] = useState({
    email: '',
    password: '',
  });

  const [signUpData, setSignUpData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    passwordRepeat: '',
    phone: '',
    role: 'customer',
    status: 'active',
    activeAddress: {
      city: '',
      province: '',
      street: '',
      building: '',
      apartment: '',
      full: '',
    },
    orders: [],
    basket: [],
    custom: [],
  });

  return (
    <Container fluid id='authentication'>
      <Tabs
        defaultActiveKey='Login'
        id='uncontrolled-tab-example'
        className='tabsPane'
        transition={true}
        variant='tabs'
      >
        <Tab eventKey='Login' title='Login' className='singleTab'>
          <Login
            logInData={logInData}
            setLogInData={setLogInData}
            setUser={setUser}
          />
        </Tab>
        <Tab eventKey='Signup' title='Signup' className='singleTab'>
          <Signup
            signUpData={signUpData}
            setSignUpData={setSignUpData}
            setUser={setUser}
          />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default Index;

import { message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Index({ logInData, setLogInData }) {
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLogInData({
      ...logInData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    if (Object.values(logInData).includes('')) {
      return message.warn('Please fill all fields then try again');
    }
    // Type here what you want
    // Send the message to backend
    // on Success:
    // localStorage.setItem('user', JSON.stringify(logInData));
    // navigate("/");
    message.success(`Welcome Back [USERNAME]`);
    message.warn('Credentials are incorrect');
  };

  return (
    <div className='login'>
      <div>
        <p className='mb-3'>Email</p>
        <input
          type='email'
          placeholder='e.g. John.Doe@gmail.com'
          value={logInData.email}
          onChange={(e) => handleChange(e)}
          name='email'
        />
        <p className='mt-4 mb-3'>Password</p>
        <input
          type='password'
          placeholder='* * * * * * * * *'
          value={logInData.password}
          onChange={(e) => handleChange(e)}
          name='password'
        />
      </div>
      <button onClick={handleClick}>Log in</button>
    </div>
  );
}

export default Index;

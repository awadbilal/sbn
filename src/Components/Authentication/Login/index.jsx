import { message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseconfig';

function Index({ logInData, setLogInData, setUser }) {
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLogInData({
      ...logInData,
      [e.target.name]: e.target.value,
    });
  };

  // Validating user then logging in
  const handleClick = async () => {
    if (Object.values(logInData).includes('')) {
      return message.warn('Please fill all fields then try again');
    }

    const q = query(
      collection(db, 'users'),
      where('email', '==', logInData.email.toLowerCase()),
      where('password', '==', logInData.password)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length !== 0) {
      const userInfo = await querySnapshot.docs[0].data();
      message.success(`Welcome Back ${userInfo.name} ${userInfo.surname}`);
      localStorage.setItem(
        'user',
        JSON.stringify({ ...userInfo, docRef: querySnapshot.docs[0].id })
      );
      setUser({ ...userInfo, docRef: querySnapshot.docs[0].id });
      navigate('/');
      if (userInfo.role === 'admin') window.location.reload();
    } else {
      message.warn('Incorrect Credentials');
    }
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

import React from 'react';
import { useNavigate } from 'react-router-dom';
import SadLogout from '../../../../images/sadLogout.gif';

function Index() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div id='userLogout'>
      <img src={SadLogout} alt='sad logout GIF' />
      <div>
        <button onClick={handleLogout}>Confirm Logout</button>
      </div>
    </div>
  );
}

export default Index;

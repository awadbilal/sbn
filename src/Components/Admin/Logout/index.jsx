import React from 'react';
import SadLogout from '../../../images/sadLogout.gif';

function Index() {
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <div id='adminLogout'>
      <img src={SadLogout} alt='sad logout GIF' />
      <div>
        <button onClick={handleLogout}>Confirm Logout</button>
      </div>
    </div>
  );
}

export default Index;

import React from 'react';
import Banner from '../../Shared/Banner';
import Socials from './Socials';
import EmailForm from './EmailForm';

function Index() {
  return (
    <div id='contactUs'>
      <Banner title='Contact Us' />
      <Socials />
      <EmailForm />
    </div>
  );
}

export default Index;

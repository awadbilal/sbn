import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ErrorNotFound from './Components/Shared/ErrorNotFound';
import NavBar from './Components/Shared/Navbar';
import User from './Components/Authentication';
import Home from './Components/Customer/Home';
import Shop from './Components/Customer/Shop';
import SingleProduct from './Components/Customer/Shop/SingleProduct';
import AboutUs from './Components/Customer/About';
import ContactUs from './Components/Customer/ContactUs';
import Cart from './Components/Customer/Cart';
import ThankYou from './Components/Customer/ThankYou';
import Custom from './Components/Customer/Custom';
import Footer from './Components/Shared/Footer';
import Admin from './Components/Admin';

import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/style.scss';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <>
      {(user?.role === 'customer' || !user) && (
        <>
          <NavBar />
          <Routes>
            <Route path='*' element={<ErrorNotFound />} />
            <Route exact path='/' element={<Home />} />
            <Route exact path='/user' element={<User />} />
            <Route exact path='/shop' element={<Shop />} />
            <Route exact path='/about-us' element={<AboutUs />} />
            <Route exact path='/contact-us' element={<ContactUs />} />
            <Route exact path='/shop/:id' element={<SingleProduct />} />
            {user?.role === 'customer' && (
              <>
                <Route exact path='/cart' element={<Cart />} />
                <Route exact path='/customize' element={<Custom />} />
                <Route exact path='/thank-you' element={<ThankYou />} />
              </>
            )}
          </Routes>
          <Footer />
        </>
      )}
      {user?.role === 'admin' && (
        <Routes>
          <Route path='*' element={<ErrorNotFound />} />
          <Route exact path='/' element={<Admin />} />
        </Routes>
      )}
    </>
  );
}

export default App;

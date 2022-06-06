import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './Components/Shared/Navbar';
import User from './Components/User';
import Home from './Components/Home';
import Shop from './Components/Shop';
import AboutUs from './Components/About';
import ContactUs from './Components/ContactUs';
import Cart from './Components/Cart';
import Admin from './Components/Admin';
import Footer from './Components/Shared/Footer';
import './Styles/style.scss';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='*' element={<Home />} />
        <Route exact path='/' element={<Home />} />
        <Route exact path='/user' element={<User />} />
        <Route exact path='/shop' element={<Shop />} />
        <Route exact path='/about-us' element={<AboutUs />} />
        <Route exact path='/contact-us' element={<ContactUs />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/admin' element={<Admin />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

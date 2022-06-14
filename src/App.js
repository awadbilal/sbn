import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ErrorNotFound from './Components/Shared/ErrorNotFound';
import NavBar from './Components/Shared/Navbar';
import User from './Components/User';
import Home from './Components/Home';
import Shop from './Components/Shop';
import SingleProduct from './Components/Shop/SingleProduct';
import AboutUs from './Components/About';
import ContactUs from './Components/ContactUs';
import Cart from './Components/Cart';
import Admin from './Components/Admin';
import Footer from './Components/Shared/Footer';
import { DATA } from './Data/products';
import './Styles/style.scss';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='*' element={<ErrorNotFound />} />
        <Route exact path='/' element={<Home />} />
        <Route exact path='/user' element={<User />} />
        <Route exact path='/shop' element={<Shop />} />
        <Route exact path='/about-us' element={<AboutUs />} />
        <Route exact path='/contact-us' element={<ContactUs />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/admin' element={<Admin />} />
        {DATA.map((item) => {
          return (
            <Route
              exact
              path={`product${item.id}`}
              key={`product${item.id}`}
              element={<SingleProduct product={item} />}
            />
          );
        })}
      </Routes>
      <Footer />
    </>
  );
}

export default App;

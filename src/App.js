import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Containers/NavBar";
import Home from "./Containers/Home";
import Shop from "./Containers/Shop";
import AboutUs from "./Containers/AboutUs";
import ContactUs from "./Containers/ContactUs";
import Basket from "./Containers/Basket";
import Admin from "./Containers/Admin";
import './Styles/style.scss';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;

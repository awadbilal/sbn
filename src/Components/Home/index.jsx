import React from "react";
import Categories from "./Categories";
import Hero from "./Hero";
import Introduction from "./Introduction";
import CustomOrder from '../Shared/CustomOrder';

function Index() {
  return (
    <div id="home">
      <Hero />
      <Introduction />
      <Categories />
      <CustomOrder />
    </div>
  );
}

export default Index;

import React from "react";
import Categories from "../Components/HomeContent/Categories";
import Hero from "../Components/HomeContent/Hero";
import Introduction from "../Components/HomeContent/Introduction";

function Home() {
  return (
    <div id="home">
      <Hero />
      <Introduction />
      <Categories />
    </div>
  );
}

export default Home;

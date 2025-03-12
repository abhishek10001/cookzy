import React from "react";
import Header from "../components/Header";
import SpecialityMenue from "../components/SpecialityMenue";
import TopCooks from "../components/TopCooks";
import Banner from "../components/Banner";


const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenue/>
      <TopCooks/>
      <Banner/>
      
    </div>
  );
};

export default Home;

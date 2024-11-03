import React from "react";

import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
const LandingPage = () => {
    return (
      <div className="landing-page mt-20">
        <Navbar />
        <HeroSection />
      </div>
    );
  };
  
  export default LandingPage;
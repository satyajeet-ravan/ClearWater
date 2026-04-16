import React from "react";
import Navbar from "../components/navbar";
import Hero from "../components/hero";
import WhatWeDo from "../components/whatwedo";
import About from "../components/about";
import HelpCenter from "../components/helpcenter";
import Footer from "../components/footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <WhatWeDo />
      <About />
      <HelpCenter />
      <Footer />
    </>
  );
};

export default LandingPage;
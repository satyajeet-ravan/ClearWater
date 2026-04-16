import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section id="home" className="hero">    
      <div className="hero-overlay"></div>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>Empowering Communities with Clean Water Insights</h1>

        <p>
          Discover real-time water quality data and promote awareness to protect
          our essential resource.
        </p>

        <div className="hero-buttons">
          {/* Go to Login */}
          <button
            className="btn-primary"
            onClick={() => navigate("/login")}
          >
            Explore Water Quality
          </button>

          {/* Scroll to About section */}
          <button
            className="btn-secondary"
            onClick={() => {
              const section = document.getElementById("aboutus");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Learn More
          </button>
        </div>
      </motion.div>

      <motion.div
        className="scroll-text"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        
      </motion.div>
    </section>
  );
};

export default Hero;
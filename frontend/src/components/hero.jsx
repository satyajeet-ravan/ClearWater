import React from "react";
import waterVideo from "../assets/river.mp4";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section id="home" className="hero">
      {/* 🎥 VIDEO BACKGROUND */}
      <video autoPlay loop muted playsInline className="hero-video">
        <source src={waterVideo} type="video/mp4" />
      </video>

      {/* 🌑 OVERLAY */}
      <div className="hero-overlay"></div>

      {/* CONTENT */}
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
          <button
            className="btn-primary"
            onClick={() => navigate(user ? "/home" : "/login")}
          >
            Explore Water Quality
          </button>

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

      {/* OPTIONAL SCROLL TEXT */}
      <motion.div
        className="scroll-text"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
    </section>
  );
};

export default Hero;

import React from "react";
import { motion } from "framer-motion";
import "./about.css";

const About = () => {
  return (
    <section id="aboutus" className="about-section">
      <div className="about-container">
        <motion.div
          className="about-text"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>About JalRakshak</h2>

          <p>
            We are developing a Water Quality Assessment & Decision Support
            System that evaluates river water quality based on CPCB standards.
            Our platform analyzes water quality data and classifies water into
            different usage categories such as Drinking, Bathing, Irrigation,
            and Industrial Use. The system aims to support environmental
            monitoring and decision-making by presenting complex water quality
            data in a clear and understandable way. Through data analysis and
            visualization, we help users, researchers, and authorities make
            informed decisions for sustainable water management.
          </p>


        </motion.div>

        <motion.img
          className="about-image"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          src="/logo.jpeg"
          alt="Clean Water"
        />
      </div>
    </section>
  );
};

export default About;

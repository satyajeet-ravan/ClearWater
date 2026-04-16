import React from "react";
import { motion } from "framer-motion";
import "./FeatureCard.css";

const FeatureCard = ({ icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      className="feature-card"
      whileHover={{ scale: 1.05 }}
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
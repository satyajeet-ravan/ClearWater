import React from "react";
import FeatureCard from "./featurecard";
import "./WhatWeDo.css";
import { FaTint, FaChartLine, FaMapMarkedAlt, FaUsers } from "react-icons/fa";

const WhatWeDo = () => {
  const features = [
    {
      icon: <FaTint />,
      title: "Water Quality Monitoring",
      description: "Track key water quality parameters from multiple sources.",
    },
    {
      icon: <FaChartLine />,
      title: "Real-time Data",
      description: "Get up-to-date insights into water health around you.",
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "Map-based Visualization",
      description: "Visualize data geographically with integrated maps.",
    },
    {
      icon: <FaUsers />,
      title: "Community Awareness",
      description: "Engage and educate communities on water conservation.",
    },
  ];

  return (
    <section id="whatwedo" className="what-section">
      <div className="what-container">
        <h2 className="what-title">What We Do</h2>

        <div className="what-grid">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} delay={i * 0.2} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
import React from "react";
import { motion } from "framer-motion";
import "./HelpCenter.css";

const HelpCenter = () => {
  const faqs = [
    {
      q: "How is water quality measured?",
      a: "We use parameters like pH,and dissolved oxygen gathered from sensors and lab sources.",
    },
    {
      q: "Can I access data for my area?",
      a: "Yes, our platform provides interactive maps with real-time metrics for various regions.",
    },
    {
      q: "How do I report contamination?",
      a: "You can use the ‘Report Issue’ form in your dashboard or contact our support team.",
    },
  ];

  return (
    <section id="helpcenter" className="help-section">
      <div className="help-container">
        <h2 className="help-title">Help Center</h2>

        <div className="faq-list">
          {faqs.map((item, idx) => (
            <motion.div
              key={idx}
              className="faq-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <a href="#contact" className="contact-btn">
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HelpCenter;
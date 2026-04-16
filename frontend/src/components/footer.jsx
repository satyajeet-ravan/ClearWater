import React from "react";
import "./Footer.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div>
          <h3>JalRakshak</h3>
          <p>Empowering communities with clean water insights and awareness.</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#aboutus">About</a></li>
            <li><a href="#whatwedo">What We Do</a></li>
            <li><a href="#helpcenter">Help Center</a></li>
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <p>Email: info@aquasense.org</p>
          <div className="footer-icons">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} JalRakshak. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
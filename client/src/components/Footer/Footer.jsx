import './Footer.css'
import React from 'react';
import { assets } from '../../assets/assets';


const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" className='logo'/>
          <p>At MyOnlineMeals, we believe that great food should be accessible to everyone, anytime, anywhere. Our mission is to bring delicious, freshly prepared meals straight to your doorstep, combining convenience with quality. Whether you're craving comfort food, exploring new cuisines, or simply looking for a quick bite, we've got you covered. Discover a world of flavors with just a few clicks!</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li>rockNroll@myonlinemeals.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © myonlinemeals.com - All Right Reserved</p>
    </div>
  );
}

export default Footer;

import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <h2>FlavorFleet</h2>
            <p>Delivering deliciousness straight to your door! At FlavorFleet, we're passionate about bringing the best culinary experiences to your table. Our chefs craft each dish with love and the finest ingredients.</p>
            <div className="footer-social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <img src={assets.facebook_icon} alt="Facebook" title="Follow us on Facebook" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <img src={assets.twitter_icon} alt="Twitter" title="Follow us on Twitter" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <img src={assets.linkedin_icon} alt="Instagram" title="Follow us on Instagram" />
                </a>
            </div>
        </div>
        <div className="footer-content-center">
            <h2>Quick Links</h2>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/menu">Our Menu</a></li>
                <li><a href="/how-it-works">How It Works</a></li>
                <li><a href="/testimonials">Testimonials</a></li>
                <li><a href="/contact">Contact Us</a></li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>Contact Us</h2>
            <ul>
                <li><i className="fas fa-phone"></i> +1 (555) 123-4567</li>
                <li><i className="fas fa-envelope"></i> hello@flavorfleet.com</li>
                <li><i className="fas fa-map-marker-alt"></i> 123 Foodie Street, Cuisine City, FC 10001</li>
                <li><i className="fas fa-clock"></i> Open: 10:00 AM - 11:00 PM (Mon-Sun)</li>
            </ul>
            <div className="footer-newsletter">
                <h3>Subscribe to Our Newsletter</h3>
                <div className="newsletter-form">
                    <input type="email" placeholder="Your email address" />
                    <button>Subscribe</button>
                </div>
            </div>
        </div>
      </div>
      <hr />
      <div className="footer-bottom">
        <p className="footer-copyright">
          &copy; {currentYear} FlavorFleet. All Rights Reserved. 
          <span className="footer-links">
            <a href="/privacy-policy">Privacy Policy</a> | 
            <a href="/terms">Terms of Service</a> | 
            <a href="/sitemap">Sitemap</a>
          </span>
        </p>
        <div className="payment-methods">
          <span>We accept:</span>
          <div className="payment-icons">
            <i className="fab fa-cc-visa"></i>
            <i className="fab fa-cc-mastercard"></i>
            <i className="fab fa-cc-paypal"></i>
            <i className="fas fa-credit-card"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

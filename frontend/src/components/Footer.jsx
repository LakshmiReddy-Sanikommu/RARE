import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="premium-footer">
            <div className="container">
                <div className="row text-center text-md-left align-items-center mb-4">
                    <div className="col-md-4 mb-4 mb-md-0 d-flex flex-column align-items-center align-items-md-start">
                        <img src="/assets/img/logo.png" className="footer-logo mb-3" alt="RARE Logo" />
                        <p className="footer-description text-muted">
                            Where imagination meets canvas. Premium, hand-crafted art collections curated just for you.
                        </p>
                    </div>
                    
                    <div className="col-md-4 mb-4 mb-md-0 footer-links-section">
                        <h4 className="footer-heading gradient-text mb-3">Quick Links</h4>
                        <ul className="list-unstyled footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/gallery">Gallery</Link></li>
                            <li><Link to="/shop">Shop</Link></li>
                            <li><Link to="/auth">Login / Register</Link></li>
                        </ul>
                    </div>
                    
                    <div className="col-md-4 footer-contact-section">
                        <h4 className="footer-heading gradient-text mb-3">Get in Touch</h4>
                        <div className="contact-info">
                            <p><i className="fas fa-map-marker-alt text-indigo mr-2"></i> 123 Gallery Route, Art District</p>
                            <p><i className="fas fa-envelope text-indigo mr-2"></i> support@rare-art.com</p>
                            <p><i className="fas fa-phone-alt text-indigo mr-2"></i> 1-800-ART-RARE</p>
                        </div>
                    </div>
                </div>
                
                <hr className="footer-divider" />
                
                <div className="row d-flex align-items-center text-center">
                    <div className="col-md-6 text-md-left mb-3 mb-md-0">
                        <p className="copyright-text mb-0">&copy; {new Date().getFullYear()} RARE Art Gallery. All Rights Reserved.</p>
                    </div>
                    <div className="col-md-6 text-md-right">
                        <div className="footer-social-icons">
                            <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

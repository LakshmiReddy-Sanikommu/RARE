import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
    return (
        <div className="landing-container">
            {/* Background Orbs */}
            <div className="ambient-orb orb-1"></div>
            <div className="ambient-orb orb-2"></div>

            {/* Hero Section */}
            <section className="hero-section text-center d-flex align-items-center justify-content-center">
                <div className="container z-index-1">
                    <h1 className="hero-heading gradient-text fade-in mb-4">Where Imagination Meets Canvas</h1>
                    <p className="hero-subtitle text-secondary mx-auto mb-5 fade-in" style={{animationDelay: '0.2s', maxWidth: '600px'}}>
                        Discover the world of unique and premium art, delivered right to your doorstep. 
                        Elevate your space with a canvas of inspiration.
                    </p>
                    <div className="fade-in" style={{animationDelay: '0.4s'}}>
                        <Link to="/gallery" className="btn-premium btn-lg rounded-pill px-5 shadow-lg">
                            Explore Gallery
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="wcuSection" className="features-section py-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="section-title gradient-text">Why Choose Us?</h2>
                        <p className="text-secondary">An unparalleled blend of unique artistry and exceptional service.</p>
                    </div>
                    
                    <div className="row g-4 mt-4">
                        {[
                            { title: 'Premium Creations', icon: 'fa-gem', desc: 'Discover unique premium art, carefully packed for perfection.' },
                            { title: 'Eco-Friendly', icon: 'fa-leaf', desc: 'Committed to minimizing our environmental footprint in every choice.' },
                            { title: 'Affordable Pricing', icon: 'fa-tags', desc: 'Top-notch quality accessible to all, without compromising detail.' }
                        ].map((feature, idx) => (
                            <div className="col-md-4" key={idx}>
                                <div className="glass-panel feature-card h-100 text-center p-4">
                                    <div className="icon-wrapper mx-auto mb-4">
                                        <i className={`fas ${feature.icon} fa-2x feature-icon`}></i>
                                    </div>
                                    <h3 className="h4 font-weight-bold mb-3">{feature.title}</h3>
                                    <p className="text-secondary">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Preview Section */}
            <section id="exploreart" className="preview-section py-5 my-5">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-end mb-4">
                        <div>
                            <h2 className="section-title gradient-text m-0">Curated Collections</h2>
                        </div>
                        <Link to="/shop" className="text-indigo text-decoration-none font-weight-bold d-flex align-items-center">
                            View All <i className="fas fa-arrow-right ml-2"></i>
                        </Link>
                    </div>
                    
                    <div className="row g-4">
                        {[
                            { title: 'Elegant Painting', img: `${import.meta.env.BASE_URL}assets/img/banner1.png` },
                            { title: 'Sculptures & Idols', img: `${import.meta.env.BASE_URL}assets/img/banner2.png` },
                            { title: 'Clay Art', img: `${import.meta.env.BASE_URL}assets/img/banner3.png` }
                        ].map((item, idx) => (
                            <div className="col-md-4" key={idx}>
                                <div className="glass-panel preview-card p-0 overflow-hidden">
                                    <div className="preview-img-wrapper">
                                        <img src={item.img} className="w-100 preview-img" alt={item.title} />
                                    </div>
                                    <div className="p-4 d-flex justify-content-between align-items-center">
                                        <h4 className="h5 font-weight-bold mb-0">{item.title}</h4>
                                        <Link to="/shop" className="btn btn-outline-light rounded-circle preview-btn">
                                            <i className="fas fa-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section id="delivery" className="cta-section py-5 mb-5 text-center">
                <div className="container">
                    <div className="glass-panel p-5">
                        <div className="row align-items-center">
                            <div className="col-lg-6 mb-4 mb-lg-0">
                                <img src={`${import.meta.env.BASE_URL}assets/img/delivery.png`} alt="Delivery" className="img-fluid floating-img" style={{maxHeight: '300px'}} />
                            </div>
                            <div className="col-lg-6 text-lg-left">
                                <h2 className="gradient-text mb-3">Seamless Delivery</h2>
                                <p className="text-secondary mb-4">
                                    Rest assured! With our in-house delivery service, you can leave worries behind. 
                                    We ensure your artwork arrives on time and in perfect condition.
                                </p>
                                <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                                    <button className="btn-premium px-4 py-2"><i className="fas fa-phone mr-2"></i> 123-456-789</button>
                                    <button className="btn-outline-premium px-4 py-2 rounded-pill"><i className="fas fa-comments mr-2"></i> Chat with Us</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;

import React from 'react';
import { Link } from 'react-router-dom';

const Gallery = () => {
    return (
        <div className="shop-container py-5 mt-4">
            <div className="container">
                <div className="text-center mb-5 fade-in">
                    <h1 className="display-4 font-weight-bold gradient-text m-0">Exhibition Gallery</h1>
                    <p className="text-secondary mt-3 mx-auto" style={{maxWidth: '600px'}}>
                        A curated exhibition of our finest categories. Step into the world of elegance and imagination.
                    </p>
                </div>

                <div className="row g-4">
                    {[
                        { title: 'Painting Mastery', img: `${import.meta.env.BASE_URL}assets/img/banner1.png`, desc: 'Stunning canvas creations by world-class artists.' },
                        { title: 'Sculpture & Idols', img: `${import.meta.env.BASE_URL}assets/img/banner2.png`, desc: 'Detailed stone, wood, and metallic figures.' },
                        { title: 'Modern Clay Art', img: `${import.meta.env.BASE_URL}assets/img/banner3.png`, desc: 'Vibrant and delicate clay masterpieces.' }
                    ].map((item, index) => (
                        <div className="col-12 col-lg-4 fade-in" style={{animationDelay: `${index * 0.2}s`}} key={index}>
                            <div className="glass-panel preview-card h-100 p-0 overflow-hidden text-center rounded-lg">
                                <div className="preview-img-wrapper" style={{height: '350px'}}>
                                    <img src={item.img} className="w-100 h-100 preview-img" style={{objectFit: 'cover'}} alt={item.title} />
                                </div>
                                <div className="p-4">
                                    <h3 className="h4 font-weight-bold mb-2">{item.title}</h3>
                                    <p className="text-secondary mb-4">{item.desc}</p>
                                    <Link to="/shop" className="btn-premium w-100">
                                        Explore Collection <i className="fas fa-arrow-right ml-2"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gallery;

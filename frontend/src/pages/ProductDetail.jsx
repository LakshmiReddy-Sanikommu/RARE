import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);

    useEffect(() => {
        // Fetch all products to find the match and similar
        fetch(`${import.meta.env.BASE_URL}products.json`)
            .then(res => res.json())
            .then(data => {
                const found = data.find(p => p.id === parseInt(id));
                if (found) {
                    setProduct(found);
                    setSimilarProducts(data.filter(p => p.id !== parseInt(id)).slice(0, 4));
                } else {
                    navigate('/shop');
                }
            })
            .catch(err => console.error(err));
    }, [id, navigate]);

    if (!product) return (
        <div className="product-detail-container d-flex justify-content-center align-items-center flex-column">
            <div className="spinner mb-3"></div>
            <p className="text-secondary">Loading masterpiece...</p>
        </div>
    );

    return (
        <div className="product-detail-container py-5 mt-5">
            <div className="container pb-5">
                
                {/* Navigation Breadcrumb & Actions */}
                <div className="d-flex justify-content-between align-items-center mb-5 fade-in">
                    <button className="btn btn-outline-light d-flex align-items-center back-btn" onClick={() => navigate(-1)}>
                        <i className="fas fa-arrow-left mr-2"></i> Gallery
                    </button>
                    <h1 className="h5 font-weight-bold mx-auto text-uppercase tracking-wide text-secondary d-none d-md-block m-0">
                        Viewing Exhibition
                    </h1>
                </div>

                {/* Main Product Showcase */}
                <div className="row g-5 align-items-center fade-in">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <div className="glass-panel showcase-panel p-4 d-flex align-items-center justify-content-center">
                            <div className="showcase-img-wrapper">
                                <img src={product.image} className="img-fluid showcase-img" alt={product.name} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-6 pl-lg-5">
                        <div className="product-info-wrapper">
                            <h2 className="display-4 font-weight-bold mb-2">{product.name}</h2>
                            <p className="text-primary font-weight-600 mb-4 h5">Curated Canvas Series</p>
                            
                            <div className="display-5 gradient-text font-weight-bold mb-4">${product.price.toFixed(2)}</div>
                            
                            <div className="description-box glass-panel p-4 mb-5">
                                <p className="text-secondary mb-0" style={{fontSize: '1.05rem', lineHeight: '1.7'}}>
                                    Experience the finest detail in this beautiful piece. Handcrafted carefully to bring life into any space it occupies. 
                                    A wonderful addition to your exclusive collection, treated with an eco-friendly preservation glaze to maintain vibrancy for decades.
                                </p>
                            </div>
                            
                            <div className="d-flex flex-column flex-sm-row gap-3">
                                <Link to="/checkout" className="btn btn-outline-light btn-lg px-4 py-3 font-weight-bold d-flex align-items-center justify-content-center w-100 mb-3 mb-sm-0">
                                    <i className="fas fa-lock mr-2"></i> Secure Checkout
                                </Link>
                                <div style={{width:'15px', display:'none'}} className="d-none d-sm-block"></div>
                                <button 
                                    onClick={() => addToCart(product)} 
                                    className="btn-premium btn-lg w-100 d-flex align-items-center justify-content-center gap-2"
                                >
                                    <i className="fas fa-shopping-cart mr-2"></i> Add to Collection
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Products Tray */}
                <div className="mt-5 pt-5 fade-in" style={{animationDelay: '0.3s'}}>
                    <div className="d-flex align-items-center mb-4">
                        <h3 className="h4 font-weight-bold m-0">Similar Exhibitions</h3>
                        <div className="ml-3 flex-grow-1" style={{height: '1px', background: 'rgba(255,255,255,0.1)'}}></div>
                    </div>
                    
                    <div className="row g-4">
                        {similarProducts.map(sp => (
                            <div className="col-6 col-lg-3" key={sp.id}>
                                <div className="glass-panel similar-product-card p-0 overflow-hidden text-center h-100 d-flex flex-column">
                                    <Link to={`/product/${sp.id}`} className="similar-img-link d-block bg-white p-3">
                                        <img src={sp.image} className="img-fluid similar-img" alt={sp.name} />
                                    </Link>
                                    <div className="p-3 mt-auto">
                                        <h5 className="font-weight-bold mb-1 text-primary text-truncate" title={sp.name}>{sp.name}</h5>
                                        <p className="gradient-text font-weight-600 m-0">${sp.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default ProductDetail;

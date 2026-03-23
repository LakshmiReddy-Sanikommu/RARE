import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetch('/products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err));
    }, []);

    const filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="shop-container py-5 mt-4">
            <div className="container">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 fade-in">
                    <div>
                        <h1 className="display-4 font-weight-bold gradient-text m-0">RARE Collection</h1>
                        <p className="text-secondary mt-2">Explore our premium selection of curated artistry.</p>
                    </div>
                    <div className="search-wrapper mt-4 mt-md-0">
                        <i className="fas fa-search search-icon"></i>
                        <input 
                            type="text" 
                            className="search-input" 
                            placeholder="Search artwork..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="row g-4">
                    {filtered.map((item, idx) => (
                        <div className="col-12 col-md-6 col-lg-4 fade-in" style={{animationDelay: `${idx * 0.1}s`}} key={item.id}>
                            <div className="glass-panel product-card h-100 p-0 overflow-hidden d-flex flex-column">
                                <Link to={`/product/${item.id}`} className="product-img-link overflow-hidden">
                                    <div className="product-badge">Premium</div>
                                    <img src={item.image} className="w-100 product-img" alt={item.name} />
                                </Link>
                                <div className="p-4 d-flex flex-column flex-grow-1">
                                    <h3 className="h5 font-weight-bold mb-2 text-truncate" title={item.name}>{item.name}</h3>
                                    <p className="text-secondary text-truncate mb-4" style={{fontSize: '0.9rem'}}>Curated exclusively for RARE</p>
                                    
                                    <div className="mt-auto d-flex justify-content-between align-items-center">
                                        <div className="price-tag text-success font-weight-bold h4 m-0">${item.price.toFixed(2)}</div>
                                        <button 
                                            className="btn-premium add-cart-btn px-4"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                addToCart(item);
                                            }}
                                        >
                                            <i className="fas fa-shopping-cart mr-2"></i> Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {filtered.length === 0 && (
                        <div className="col-12 text-center py-5 glass-panel">
                            <i className="fas fa-paint-brush fa-3x text-secondary mb-3"></i>
                            <h3 className="text-primary">No masterpiece found.</h3>
                            <p className="text-secondary">Try searching for a different keyword.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;

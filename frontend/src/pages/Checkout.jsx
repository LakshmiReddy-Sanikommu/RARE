import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Checkout.css';

const Checkout = () => {
    const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
    
    // cart items are now { product, quantity }
    const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    const discount = subtotal * 0.05;
    const total = subtotal - discount;

    return (
        <div className="checkout-container py-5 mt-5">
            <div className="container pb-5">
                <div className="text-center mb-5 fade-in">
                    <h1 className="display-4 font-weight-bold gradient-text m-0">Secure Checkout</h1>
                    <p className="text-secondary mt-2">Finalize your premium collection acquisition.</p>
                </div>

                <div className="row g-5">
                    {/* Cart Section */}
                    <div className="col-lg-5 order-lg-2 mb-5 mb-lg-0 fade-in" style={{animationDelay: '0.2s'}}>
                        <div className="glass-panel p-4 h-100 d-flex flex-column">
                            <h4 className="text-primary font-weight-bold mb-4 d-flex justify-content-between align-items-center">
                                Your Collection
                                <span className="badge badge-primary rounded-pill bg-indigo text-white">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
                            </h4>
                            
                            <div className="cart-items-wrapper flex-grow-1 overflow-auto pr-2 mb-4" style={{maxHeight: '400px'}}>
                                {cart.length === 0 ? (
                                    <div className="text-center py-5">
                                        <i className="fas fa-shopping-bag fa-3x text-secondary mb-3"></i>
                                        <p className="text-secondary">Your cart is empty.</p>
                                        <Link to="/shop" className="btn-premium mt-2">Browse Store</Link>
                                    </div>
                                ) : (
                                    <ul className="list-group list-group-flush bg-transparent">
                                        {cart.map((item, index) => (
                                            <li className="list-group-item bg-transparent px-0 py-3 border-bottom-glass" key={index}>
                                                <div className="d-flex justify-content-between align-items-start w-100">
                                                    <div className="d-flex align-items-center flex-grow-1">
                                                        <div className="cart-item-img-wrapper bg-white rounded p-1 mr-3" style={{minWidth: '60px'}}>
                                                            <img src={item.product.image} alt={item.product.name} className="img-fluid rounded" style={{width: '60px', height: '60px', objectFit:'contain'}} />
                                                        </div>
                                                        <div className="pr-2">
                                                            <h6 className="my-0 text-primary font-weight-bold lh-sm mb-1">{item.product.name}</h6>
                                                            <div className="d-flex align-items-center mt-2 cart-controls">
                                                                <button className="qty-btn" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                                                                    <i className="fas fa-minus"></i>
                                                                </button>
                                                                <span className="mx-2 text-primary font-weight-bold">{item.quantity}</span>
                                                                <button className="qty-btn" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                                                                    <i className="fas fa-plus"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right d-flex flex-column align-items-end justify-content-between ml-2">
                                                        <span className="text-primary font-weight-bold">${(item.product.price * item.quantity).toFixed(2)}</span>
                                                        <button className="btn btn-sm text-danger mt-2 p-0 remove-btn" onClick={() => removeFromCart(item.product.id)}>
                                                            <i className="fas fa-trash-alt"></i> Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            
                            {cart.length > 0 && (
                                <div className="cart-summary mt-auto pt-3 border-top-glass">
                                    <div className="d-flex justify-content-between mb-2">
                                        <span className="text-secondary">Subtotal</span>
                                        <span className="text-primary font-weight-bold">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-3 text-success">
                                        <span>5% Online Discount</span>
                                        <span className="font-weight-bold">-${discount.toFixed(2)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between border-top-glass pt-3">
                                        <strong className="text-primary h5 m-0">Total</strong>
                                        <strong className="gradient-text h4 m-0">${total.toFixed(2)}</strong>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="col-lg-7 order-lg-1 fade-in" style={{animationDelay: '0.4s'}}>
                        <div className="glass-panel p-4 p-md-5">
                            <h4 className="text-primary font-weight-bold mb-4">Billing Information</h4>
                            <form className="needs-validation">
                                <div className="row g-3">
                                    <div className="col-sm-6 mb-3">
                                        <label htmlFor="firstName" className="text-secondary mb-2">First name</label>
                                        <input type="text" className="form-control auth-input" id="firstName" placeholder="John" required />
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                        <label htmlFor="lastName" className="text-secondary mb-2">Last name</label>
                                        <input type="text" className="form-control auth-input" id="lastName" placeholder="Doe" required />
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label htmlFor="email" className="text-secondary mb-2">Email</label>
                                        <input type="email" className="form-control auth-input" id="email" placeholder="you@example.com" />
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label htmlFor="address" className="text-secondary mb-2">Address</label>
                                        <input type="text" className="form-control auth-input" id="address" placeholder="1234 Main St" required />
                                    </div>

                                    <div className="col-md-5 mb-3">
                                        <label htmlFor="country" className="text-secondary mb-2">Country</label>
                                        <select className="form-control custom-select auth-input" id="country" required>
                                            <option value="">Choose...</option>
                                            <option value="US">United States</option>
                                            <option value="CA">Canada</option>
                                            <option value="UK">United Kingdom</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="state" className="text-secondary mb-2">State</label>
                                        <select className="form-control custom-select auth-input" id="state" required>
                                            <option value="">Choose...</option>
                                            <option value="CA">California</option>
                                            <option value="NY">New York</option>
                                            <option value="TX">Texas</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3 mb-4">
                                        <label htmlFor="zip" className="text-secondary mb-2">Zip</label>
                                        <input type="text" className="form-control auth-input" id="zip" placeholder="" required />
                                    </div>
                                </div>

                                <hr className="border-top-glass my-4" />
                                <h4 className="text-primary font-weight-bold mb-4">Payment</h4>

                                <div className="payment-methods mb-4 d-flex flex-wrap gap-3">
                                    <div className="custom-control custom-radio">
                                        <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" required defaultChecked />
                                        <label className="custom-control-label text-primary" htmlFor="credit">Credit card</label>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required />
                                        <label className="custom-control-label text-primary" htmlFor="debit">Debit card</label>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" required />
                                        <label className="custom-control-label text-primary" htmlFor="paypal">PayPal</label>
                                    </div>
                                </div>

                                <div className="row g-3">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="cc-name" className="text-secondary mb-2">Name on card</label>
                                        <input type="text" className="form-control auth-input" id="cc-name" placeholder="" required />
                                        <small className="text-secondary d-block mt-1">Full name as displayed on card</small>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="cc-number" className="text-secondary mb-2">Credit card number</label>
                                        <input type="text" className="form-control auth-input" id="cc-number" placeholder="" required />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="cc-expiration" className="text-secondary mb-2">Expiration</label>
                                        <input type="text" className="form-control auth-input" id="cc-expiration" placeholder="MM/YY" required />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="cc-cvv" className="text-secondary mb-2">CVV</label>
                                        <input type="text" className="form-control auth-input" id="cc-cvv" placeholder="123" required />
                                    </div>
                                </div>

                                <hr className="border-top-glass my-4" />
                                <button className="btn-premium btn-lg w-100 py-3 d-flex justify-content-center align-items-center" type="submit" onClick={(e) => { e.preventDefault(); alert('Order Placed Successfully!'); }}>
                                    Confirm Payment & Place Order <i className="fas fa-check-circle ml-2"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

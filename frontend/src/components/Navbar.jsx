import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isLanding = location.pathname === '/';
    const isAuth = location.pathname === '/auth';
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // Force solid navbar background on Auth page
    const navClass = scrolled || isAuth ? 'scrolled' : '';
    
    const { cart } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        // Close menu on navigation
        setIsMenuOpen(false);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        navigate('/');
    };

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className={`navbar navbar-expand-lg fixed-top premium-nav ${navClass}`}>
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src="/assets/img/logo.png" className="premium-logo" alt="RARE" />
                </Link>
                <div className="d-flex align-items-center d-lg-none">
                    <button className="theme-toggle-btn mr-3" onClick={toggleTheme}>
                        <i className={`fas ${theme === 'dark-theme' ? 'fa-sun' : 'fa-moon'}`}></i>
                    </button>
                    <Link to="/checkout" className="nav-link text-primary position-relative pr-3">
                        <i className="fas fa-shopping-cart fa-lg"></i>
                        {cartCount > 0 && <span className="cart-badge badge badge-pill badge-primary position-absolute" style={{top: '0', right: '5px', fontSize: '0.65rem', background: 'var(--accent-gradient)'}}>{cartCount}</span>}
                    </Link>
                    <button 
                        className={`navbar-toggler custom-toggler ml-2 ${theme === 'dark-theme' ? 'navbar-dark' : 'navbar-light'}`} 
                        type="button" 
                        onClick={toggleMenu}
                        aria-expanded={isMenuOpen}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                
                <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNavAltMarkup">
                    <div className="navbar-nav ml-auto align-items-center gap-4">
                        {isLanding ? (
                            <>
                                <a className="nav-link premium-link" href="#wcuSection" onClick={closeMenu}>Features</a>
                                <a className="nav-link premium-link" href="#exploreart" onClick={closeMenu}>Explore</a>
                                <a className="nav-link premium-link" href="#delivery" onClick={closeMenu}>Logistics</a>
                                <Link className="nav-link premium-link" to="/shop" onClick={closeMenu}>Shop</Link>
                            </>
                        ) : (
                            <>
                                <Link className="nav-link premium-link" to="/" onClick={closeMenu}>Home</Link>
                                <Link className="nav-link premium-link" to="/gallery" onClick={closeMenu}>Gallery</Link>
                                <Link className="nav-link premium-link" to="/shop" onClick={closeMenu}>Shop</Link>
                            </>
                        )}
                        
                        <div className="d-none d-lg-block mr-2 ml-2" style={{width: '1px', height: '24px', background: 'var(--glass-border)'}}></div>
                        
                        {/* Theme Toggle */}
                        <button className="theme-toggle-btn d-none d-lg-flex align-items-center justify-content-center mx-2" onClick={toggleTheme} title="Toggle Dark/Light Mode">
                            <i className={`fas ${theme === 'dark-theme' ? 'fa-sun text-warning' : 'fa-moon text-indigo'}`}></i>
                        </button>

                        {/* Cart Icon */}
                        <Link to="/checkout" className="nav-link text-primary position-relative d-none d-lg-flex align-items-center premium-link mx-2" title="Cart">
                            <i className="fas fa-shopping-cart fa-lg"></i>
                            {cartCount > 0 && (
                                <span className="position-absolute d-inline-block rounded-circle text-center" style={{top: '-4px', right: '-8px', width: '20px', height: '20px', lineHeight: '20px', fontSize: '0.7rem', background: 'var(--accent-gradient)', color: 'white', fontWeight: 'bold'}}>
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="nav-item dropdown custom-dropdown ml-lg-2">
                                <a className="nav-link dropdown-toggle text-primary font-weight-bold d-flex align-items-center profile-trigger" href="#" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                    <div className="user-avatar mr-2 rounded-circle text-center d-flex align-items-center justify-content-center shadow-sm" style={{width: '36px', height: '36px', background: 'var(--accent-gradient)', color: 'white'}}>
                                        {user.Email ? user.Email.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <span className="d-lg-none d-xl-inline">Profile</span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right shadow-lg border-0 glass-dropdown p-0" aria-labelledby="navbarDropdown">
                                    <div className="px-4 py-3 border-bottom-glass" style={{background: 'rgba(0,0,0,0.03)'}}>
                                        <p className="mb-1 text-primary font-weight-bold">{user.FirstName ? `${user.FirstName} ${user.LastName}` : 'Art Collector'}</p>
                                        <p className="mb-0 text-secondary" style={{fontSize: '0.85rem'}}>{user.Email}</p>
                                    </div>
                                    <div className="p-2">
                                        <Link className="dropdown-item rounded" to="/checkout">
                                            <i className="fas fa-box-open mr-2 text-primary"></i> My Collection
                                        </Link>
                                        <Link className="dropdown-item rounded" to="/settings">
                                            <i className="fas fa-cog mr-2 text-primary"></i> Settings
                                        </Link>
                                    </div>
                                    <div className="p-2 border-top-glass">
                                        <button className="dropdown-item text-danger rounded" onClick={handleLogout}>
                                            <i className="fas fa-sign-out-alt mr-2"></i> Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link className="nav-link btn-premium ml-lg-3 px-4 py-2 mt-2 mt-lg-0" to="/auth">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

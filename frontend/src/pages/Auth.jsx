import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    
    // States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setErrorMsg('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        if (!email || !password) return setErrorMsg('Please enter email and password.');

        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Email: email, Password: password })
            });
            const data = await response.json();
            if (data.success) {
                login(data.user);
                navigate('/shop');
            } else {
                setErrorMsg(data.error || "Invalid Credentials");
            }
        } catch (err) {
            console.error(err);
            setErrorMsg("Connection to server failed. Is the backend running on port 3000?");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        if (!firstName || !lastName || !email || !password) return setErrorMsg("Required fields missing");

        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    FirstName: firstName,
                    LastName: lastName,
                    Password: password,
                    Email: email
                })
            });
            const data = await response.json();
            if (data.success) {
                setIsLogin(true);
                alert("Account created! Please log in.");
            } else {
                setErrorMsg(data.error || "Registration failed");
            }
        } catch (err) {
            console.error(err);
            setErrorMsg("Connection to server failed. Is the backend running on port 3000?");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-wrapper split-layout">
            {/* Visual Side */}
            <div className="auth-visual-side">
                <div className="visual-overlay"></div>
                <div className="visual-content fade-in">
                    <div className="brand-badge mb-4">RARE Art Gallery</div>
                    <h1 className="display-3 font-weight-bold mb-3">Immerse Your Soul in <span className="gradient-text">Art</span></h1>
                    <p className="lead opacity-80">Discover imagination painted on canvas with our exclusively curated premium collections.</p>
                </div>
                <div className="visual-footer d-flex justify-content-between align-items-center">
                    <span className="text-sm">© {new Date().getFullYear()} RARE ART GALLERY</span>
                    <div className="social-mini">
                        <i className="fab fa-instagram mr-3"></i>
                        <i className="fab fa-twitter"></i>
                    </div>
                </div>
            </div>

            {/* Form Side */}
            <div className="auth-form-side">
                <div className="form-container fade-in">
                    <div className="form-header">
                        <Link to="/" className="back-link mb-4 d-inline-block">
                            <i className="fas fa-arrow-left mr-2"></i> Back to Gallery
                        </Link>
                        <h2 className="display-5 font-weight-bold mb-2">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className="text-secondary mb-4">
                            {isLogin 
                                ? 'Sign in to access your private collection.' 
                                : 'Join our community of art enthusiasts today.'}
                        </p>
                    </div>

                    {errorMsg && <div className="auth-error-chip py-2 mb-4">{errorMsg}</div>}

                    <div className="form-body">
                        {isLogin ? (
                            <form className="auth-form" onSubmit={handleLogin}>
                                <div className="input-group-modern">
                                    <label>Email Address</label>
                                    <div className="input-with-icon">
                                        <i className="fas fa-envelope icon"></i>
                                        <input type="email" placeholder="name@example.com" value={email} onChange={e=>setEmail(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="input-group-modern">
                                    <label>Password</label>
                                    <div className="input-with-icon">
                                        <i className="fas fa-lock icon"></i>
                                        <input 
                                            type={showPassword ? "text" : "password"} 
                                            placeholder="••••••••" 
                                            value={password} 
                                            onChange={e=>setPassword(e.target.value)} 
                                            required 
                                        />
                                        <button 
                                            type="button" 
                                            className="password-toggle-eye"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="d-flex justify-content-end mb-4">
                                    <a href="#" className="text-sm font-weight-500 text-indigo">Forgot Password?</a>
                                </div>

                                <button type="submit" className="btn-premium w-100 py-3" disabled={isLoading}>
                                    {isLoading ? <span className="spinner"></span> : 'Sign In to Account'}
                                </button>
                            </form>
                        ) : (
                            <form className="auth-form" onSubmit={handleSignup}>
                                <div className="row g-3">
                                    <div className="col-6">
                                        <div className="input-group-modern">
                                            <label>First Name</label>
                                            <input type="text" placeholder="John" value={firstName} onChange={e=>setFirstName(e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="input-group-modern">
                                            <label>Last Name</label>
                                            <input type="text" placeholder="Doe" value={lastName} onChange={e=>setLastName(e.target.value)} required />
                                        </div>
                                    </div>
                                </div>

                                <div className="input-group-modern">
                                    <label>Email Address</label>
                                    <input type="email" placeholder="john@example.com" value={email} onChange={e=>setEmail(e.target.value)} required />
                                </div>
                                <div className="input-group-modern">
                                    <label>Password</label>
                                    <div className="input-with-icon">
                                        <i className="fas fa-lock icon"></i>
                                        <input 
                                            type={showPassword ? "text" : "password"} 
                                            placeholder="Create a strong password" 
                                            value={password} 
                                            onChange={e=>setPassword(e.target.value)} 
                                            required 
                                        />
                                        <button 
                                            type="button" 
                                            className="password-toggle-eye"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                        </button>
                                    </div>
                                </div>
                                
                                <button type="submit" className="btn-premium w-100 py-3 mt-4" disabled={isLoading}>
                                    {isLoading ? <span className="spinner"></span> : 'Create Your Account'}
                                </button>
                            </form>
                        )}
                    </div>

                    <div className="form-footer mt-5 text-center">
                        <p className="text-secondary">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button className="btn-link ml-2 font-weight-bold text-indigo p-0" onClick={toggleMode} type="button">
                                {isLogin ? 'Register now' : 'Sign in here'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
